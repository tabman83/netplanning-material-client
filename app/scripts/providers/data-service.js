angular.module('NetPlanningApp').factory('SignInterceptor', function($localStorage, settings, CryptoJS) {
    'use strict';
    return {
        request: function (config) {
            if(config.url.indexOf(settings.apiUrl) > -1) {
                var signature = CryptoJS.HmacMD5(JSON.stringify(config.data || {}), settings.secret);
                config.headers.Signature = signature.toString();
            }
            return config;
        }
    };
});
angular.module('NetPlanningApp').factory('AuthInterceptor', function($localStorage, settings) {
    'use strict';
    return {
        request: function(config) {
            if(config.url.indexOf(settings.apiUrl) > -1) {
                config.headers.Authorization = 'Bearer ' + $localStorage.authToken;
            }
            return config;
        }
    };
});
angular.module('NetPlanningApp').config(function($httpProvider) {
    'use strict';
    $httpProvider.interceptors.push('SignInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
});
angular.module('NetPlanningApp').provider('DataService', function () {
    'use strict';

    this.$get = function($http, $window, $timeout, $localStorage, $q, $log, $rootScope, $cordovaDevice, $cordovaPush, settings, moment) {

        $localStorage.$default({
            language: settings.defaultLanguage,
            items: [],
            changes: [],
            lastUpdate: 0
        });

        /*
        case 'dispo' : // available
        case 'indispo' : // not available at all
        case 'indispoPonctuelle': // made unavailable by you
        case 'reserve' : // One-Off reservation
        case 'recurrente' : // Automatic Rebooking
        case 'training' :
        case 'dispo_stag2' : // Slots made available by you
        case 's_indispo2' : // no more bookable beacause time passed
        case 'training' : // training lesson
        case 'reserveRemplacement' // substitution
        case 'instantHelp' : // instant help
        case 'special1' : // tutorial lesson
        case 'special2' : // special lesson
        */
        function Item(data) {
            angular.extend(this, data);
            var now = moment();
            var tomorrow = moment().add(1, 'days');
            this.date = new Date(this.begin);
            this.isLesson = !!this.name;
            this.isToday = now.isSame(this.date, 'day');
            this.isTomorrow = tomorrow.isSame(this.date, 'day');
            this.isSpecialLesson = this.kind === 'special2';
            this.isTutorialLesson = this.kind === 'special1';
            this.isInstantHelp = this.kind === 'instantHelp';
            this.isSubstitution = this.kind === 'reserveRemplacement';
            this.isUnbookableAsTimeElapsed = this.kind === 's_indispo2';
            this.isUserAvailability = this.kind === 'dispo_stag2';
            this.isTrainingLesson = this.kind === 'training';
            this.isAutoRebooking = this.kind === 'recurrente';
            this.isOneOff = this.kind === 'reserve';
            this.isUserCancelled = this.kind === 'indispoPonctuelle';
            this.isUnavailable = this.kind === 'indispo';
            this.isSystemAvailability = this.kind === 'dispo';
            this.dayOfYear = moment(this.begin).dayOfYear();
            if(this.isLesson) {
                this.name = this.name.toLowerCase();
            }
        }

        function DataService() {
            var self = this;
            this.isLoading = false;
            this.isLoggedIn = false;

            var toItems = function(rawItem) {
                return new Item(rawItem);
            };

            var sendDeviceInfos = function(token) {
                var device = $cordovaDevice.getDevice();
                return $http.post(settings.apiUrl + '/Tokens', {
                    token: token,
                    device: device.platform,
                    uuid: device.uuid,
                    model: device.model,
                    version: device.version
                });
            };

            var registerForPushNotifications = function() {
                var deferred = $q.defer();
                var platform = $cordovaDevice.getPlatform();
                if(platform === 'iOS') {
                    $cordovaPush.register({
                        badge: true,
                        sound: true,
                        alert: true,
                    }).then(function(deviceToken) {
                        deferred.resolve(deviceToken);
                    }).catch(function(reason) {
                        deferred.reject(reason);
                    });
                } else if(platform === 'Android') {
                    $cordovaPush.register({
                        senderID: settings.androidSenderId,
                    }).then(function() {
                        var deregFn = $rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
                            if (notification.regid.length > 0 ) {
                                deregFn();
                                deferred.resolve(notification.regid);
                            }
                        });
                    }).catch(function(reason) {
                        deferred.reject(reason);
                    });
                } else {
                    deferred.resolve(null);
                }
                return deferred.promise.then(sendDeviceInfos);
            };

            var getItems = function(force) {
                return $http.get(settings.apiUrl + '/items?force=' + force).then(function(result) {
                    $localStorage.items.length = 0;
                    Array.prototype.push.apply($localStorage.items, result.data.map(toItems));
                    $localStorage.lastUpdate = +new Date(result.headers('last-check'));
                    return result;
                }).catch(function(reason) {
                    $log.log('Error in getItems()', reason.status, reason.statusText);
                    return $q.reject(reason);
                });
            };

            var getChanges = function() {
                return $http.get(settings.apiUrl + '/changes').then(function(result) {
                    $localStorage.changes.length = 0;
                    Array.prototype.push.apply($localStorage.changes, result.data.map(toItems));
                    return result;
                }).catch(function(reason) {
                    $log.log('Error in getChanges()', reason.status, reason.statusText);
                    return $q.reject(reason);
                });
            };

            this.loadData = function(force) {
                this.isLoading = true;
                var getItemsPromise = getItems(force);
                var loadPromise = null;
                if(force) {
                    // execute serially
                    loadPromise = getItemsPromise.then(getChanges);
                } else {
                    // execute in parallel
                    loadPromise = $q.all([getItemsPromise, getChanges()]);
                }
                return loadPromise.catch(function(reason) {
                    if(reason.status > 0 && reason.status < 500) {
                        self.logout();
                    }
                    return $q.reject(reason);
                }).finally(function() {
                    self.isLoading = false;
                });
            };

            this.logout = function() {
                return $timeout(0).then(function() {
                    self.isLoggedIn = false;
                    $localStorage.language = settings.defaultLanguage;
                    $localStorage.items.length = 0;
                    $localStorage.changes.length = 0;
                    $localStorage.lastUpdate = 0;
                });
            };

            this.login = function(username, password) {
                this.isLoading = true;
                return $http.post(settings.apiUrl + '/login', {
                    username: username,
                    password: password
                }).then(function(result) {
                    $localStorage.authToken = result.data.authToken;
                    $localStorage.profile = {
                        name: result.data.name.toLowerCase()
                    };
                    self.isLoggedIn = true;
                    if(!!$window.cordova) {
                        registerForPushNotifications();
                    }
                    return result;
                }).catch(function(reason) {
                    delete $localStorage.authToken;
                    return $q.reject(reason);
                }).finally(function() {
                    self.isLoading = false;
                });
            };

            if ($localStorage.authToken) {
                this.isLoggedIn = true;
                this.loadData(false);
                if(!!$window.cordova) {
                    registerForPushNotifications();
                }
            }
        }

        return new DataService();
    };
});
