angular.module('NetPlanningApp').factory('SignInterceptor', function($localStorage, settings) {
    return {
        request: function (config) {
            if(config.url.indexOf(settings.apiUrl) > -1) {
                var signature = CryptoJS.HmacMD5(JSON.stringify(config.data || {}), settings.secret);
                config.headers['Signature'] = signature.toString();
            }
            return config;
        }
    };
});
angular.module('NetPlanningApp').factory('AuthInterceptor', function($localStorage, settings){
    return {
        request: function(config) {
            if(config.url.indexOf(settings.apiUrl) > -1) {
                config.headers['Authorization'] = 'Bearer ' + $localStorage.authToken;
            }
            return config;
        }
    };
});
angular.module('NetPlanningApp').config(function($httpProvider) {
    $httpProvider.interceptors.push('SignInterceptor');
    $httpProvider.interceptors.push('AuthInterceptor');
});
angular.module('NetPlanningApp').provider('DataService', function (settings) {
    'use strict';

    this.$get = function($http, $timeout, $localStorage, settings) {
        /*
        switch( className ) {
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
        }
        */
        function Item(data) {
            angular.extend(this, data);
            var now = moment();
            var tomorrow = moment().add(1, 'days');
            this.date = new Date(data.begin);
            this.isLesson = !!data.name;
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
            this.dayOfYear = moment(data.begin).dayOfYear();
        }

        function DataService() {
            var data = {
                items: [],
                lastUpdate: new Date(0)
            };

            Object.defineProperties(this, {
                items: {
                    enumerable: false,
                    configurable: false,
                    get: function() { return data.items; }
                },
                lastUpdate: {
                    enumerable: false,
                    configurable: false,
                    get: function() { return data.lastUpdate; }
                }
            });

            this.isLoggedIn = function() {
                return !!$localStorage.authToken;
            };

            this.loadData = function() {
                $http.get(settings.apiUrl + '/lessons').success(function(result) {
                    result.lessons.forEach(function(item) {
                        data.items.push(new Item(item));
                    });
                    console.log(data.items);
                    data.lastUpdate = new Date(result.lastCheck);
                }).error(function(error) {
                    console.log(error);
                });
            };

            this.logout = function() {
                $timeout(1000).then(function() {
                    delete $localStorage.authToken;
                });
                /*
                return $http.post(apiEndpoint + '/Users/Logout').success(function() {
                delete $localStorage;*/
            };

            this.login = function(username, password) {
                var that = this;
                return $http.post(settings.apiUrl + '/login', {
                    username: username,
                    password: password
                }).success(function(result) {
                    $localStorage.authToken = result.authToken;
                    that.loadData();
                }).error(function() {
                    delete $localStorage.authToken;
                });
            };

            if ($localStorage.authToken) {
                this.loadData();
            }
        };

        return new DataService();
    };
});
