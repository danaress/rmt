angular.module('myApp', [])

angular.module('myApp')
	.controller('mainController', ['$scope', '$http', function($scope, $http){


        // var y = 1457729724651
        // var x = Date.now()
        // var diff = (x-y);
        // console.log(diff);


        // Functions for Signing up, selecting preferred time, setting habits, and logging in.

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



        $scope.modalInfo = function(req, res){
            $http.post('/metrics')
            .then(function(returndata){
                $scope.allUserInfo = returndata.data
                console.log("info that came back to angular")
                console.log($scope.allUserInfo)
                $scope.modalUsername = $scope.allUserInfo[0].username
                if ($scope.allUserInfo[0].time == null){
                $scope.modalTime = "It looks like you haven't selected a time yet - head over to Settings in the top right!"
                console.log($scope.modalTime)
            } else {
                $scope.modalTime == $scope.allUserInfo[0].time
            }
                if ($scope.allUserInfo[0].number == 0){
                    $scope.modal2Number = "You don't have a number saved. Add one below."
                    $scope.modalNumber = "It looks like you haven't selected a number yet - head over to Settings in the top right!"
                } else {
                    $scope.modal2Number == $scope.allUserInfo[0].number
                    $scope.modalNumber == $scope.allUserInfo[0].number
                }
                if ($scope.allUserInfo[0].habit1 == ''){
                    $scope.modalHabit = "It looks like you haven't specified any habits yet - head over to Settings in the top right!"
                } else if ($scope.allUserInfo[0].habit1 == ''){
                    $scope.modalHabit == ("Habit 1: " + $scope.allUserInfo[0].habit1 + ". Habit 2: " + $scope.allUserInfo[0].habit2 + ". Habit 3: " + $scope.allUserInfo[0].habit3)
                }
                })
        }


        $scope.numberClick = function(){
            $scope.numberHide = true;
            $scope.numHide = true;
        }



        $scope.testing = function(){
            console.log("hideBox")
            $scope.hideBox = true;
        }

        $scope.cancelBox = function(){
            console.log("hideBox")
            $scope.hideBox = false;
        }





        // Functions for Login screen

        $scope.loginClick = function(){
            $scope.loginHide = true;
        }

        $scope.cancelClick = function(){
            $scope.loginHide = false;
        }

        $scope.signupClick = function(){
            $scope.signupHide = true;
        }

        $scope.cancelClick2 = function(){
            $scope.signupHide = false;
        }

	}]);