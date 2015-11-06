angular.module('NetPlanningApp').provider('DataService', function () {
    'use strict';
    //var apiEndpoint = location.protocol + '//' + (settings.WEBSERVICES_HOSTNAME) + ':' + settings.WEBSERVICES_PORT + '/api';

    this.$get = function($http, $timeout, $localStorage) {

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
                return !!$localStorage.sessionId;
            };

            this.loadData = function() {
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
                    delete $localStorage.sessionId;
                });
                /*
                return $http.post(apiEndpoint + '/Users/Logout').success(function() {
                    delete $localStorage;
                });*/
            };

            this.login = function(email, password) {
				var that = this;
                return $timeout(2000).then(function() {
                    $localStorage.sessionId = 'asd91jkl2';
                    that.loadData();
                });
                /*
                return $http.post(apiEndpoint + '/Users/Login', {
                    email: email,
                    password: password
                }).success(function(result) {
					that.loadData();
                }).error(function() {
                });
                */
                //$timeout(1000)
            };

            //if ($window.sessionStorage.userInfo) {
                //userInfo = JSON.parse($window.sessionStorage.userInfo);
                //$http.defaults.headers.common.Authorization = 'Basic ' + userInfo.SessionId;
				this.loadData();
            //}
        }

        return new DataService();
    };
});
