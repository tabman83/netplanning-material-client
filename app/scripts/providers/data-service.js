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
                /*

                $http.post(settings.apiUrl + '/login', {
                    username: 't',
                    password: 'a'
                });*/
                // 0 available
                // 1 available by me
                // 2 recurrent lesson
                // 3 1-time lesson
                data.items.push({
                    name: 'Jubon Aurelie',
                    type: 2,
                    date: new Date(2015, 10, 2, 10, 30),
                    isSelected: false
                }, {
                    type: 0,
                    date: new Date(2015, 10, 2, 11, 0),
                    isSelected: false
                }, {
                    name: 'Castro Maurice',
                    type: 2,
                    date: new Date(2015, 10, 2, 11, 30),
                    isSelected: false
                }, {
                    name: 'Lijion Miriam',
                    type: 3,
                    date: new Date(2015, 10, 2, 12, 0),
                    isSelected: false
                }, {
                    type: 0,
                    date: new Date(2015, 10, 2, 12, 30),
                    isSelected: false
                }, {
                    name: 'Oboez Marc',
                    type: 3,
                    date: new Date(2015, 10, 2, 13, 0),
                    isSelected: false
                }, {
                    name: 'Ducette Ivette',
                    type: 2,
                    date: new Date(2015, 10, 2, 13, 30),
                    isSelected: false
                }, {
                    name: 'Devrais Aloise',
                    type: 3,
                    date: new Date(2015, 10, 2, 15, 0),
                    isSelected: false
                }, {
                    type: 1,
                    date: new Date(2015, 10, 2, 16, 0),
                    isSelected: false
                }, {
                    type: 1,
                    date: new Date(2015, 10, 2, 16, 30),
                    isSelected: false
                });
                data.lastUpdate = new Date();
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

            //if ($window.sessionStorage.userInfo) {
                //userInfo = JSON.parse($window.sessionStorage.userInfo);
                //$http.defaults.headers.common.Authorization = 'Basic ' + userInfo.SessionId;
                //this.loadData();
            //}
        };

        return new DataService();
    };
});
