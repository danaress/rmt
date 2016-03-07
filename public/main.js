angular.module('myApp', [])

angular.module('myApp')
	.controller('mainController', ['$scope', '$http', function($scope, $http){



        $scope.signup = function(){
            $http({ 
                method : 'POST',
                url    : '/signup',
                data   : $scope.signupForm
            }).then(function(returnData){
                console.log(returnData)
                if ( returnData.data.success ) { window.location.href="/dashboard.html" }
            })
        }

        $scope.timeSettings = function(){
        	$http({ 
                method : 'POST',
                url    : '/settings',
                data   : $scope.settings
            }).then(function(returnData){
            	console.log("main.js")
            	})
            }

        $scope.habitSetting = function(){
        	$http({ 
                method : 'POST',
                url    : '/habits',
                data   : $scope.settings
            }).then(function(returnData){
            	console.log("main.js")
            	})
        }

        $scope.login = function(){
            $http({
                method : 'POST',
                url    : '/login',
                data   : $scope.loginForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/dashboard" } 
                else { console.log(returnData)}
            })
        }

        function tick()
			{
			    //get the mins of the current time
			    var mins = new Date().getMinutes();
			    var hour = new Date().getHours();
			    if(mins == 00){
			        console.log('mins = ' + mins + ". and hours = " + hour);
			     }
			}
			tick();

setInterval(function() { tick(); }, 1000);

	}]);