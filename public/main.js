angular.module('myApp', ['ngRoute'])

angular.module('myApp').factory('userData', function(){
    return {}
    })

angular.module('myApp')
	.controller('mainController', ['$scope', '$http', 'userInfo', function($scope, $http, $userInfo){


    //     $scope.checkInfo = function(req, res){
    //         $http({ 
    //             method : 'POST',
    //             url    : '/checkinfo',
    //         }).then(function(Returndata){
    //         $scope.currentSettings = Returndata.data
    //         $scope.currentTime = $scope.currentSettings[0].time
    //         $scope.currentNumber = $scope.currentSettings[0].number
    //         $scope.currentHabit1 = $scope.currentSettings[0].habit1
    //         $scope.currentHabit2 = $scope.currentSettings[0].habit2
    //         $scope.currentHabit3 = $scope.currentSettings[0].habit3
    //     })
    // }


    $scope.parse = function(req, res){

var testMessage = "Remind me to call mom// next monday at 9:30am"
var dayTime = testMessage.toLowerCase().slice(testMessage.indexOf("//")+2)

var dayVal;
var nextWeek;
var dayName;
var numDays;
var ampmCheck;
var meridian;
var today = new Date;
var todayNum = today.getDay()


if (dayTime.includes('sunday')){
    dayName = 'sunday'
    dayVal = 0
} else if (dayTime.includes('monday')){
    dayName = 'monday'
    dayVal = 1
} else if (dayTime.includes('tuesday')){
    dayName = 'tuesday'
    dayVal = 2
} else if (dayTime.includes('wednesday')){
    dayName = 'wednesday'
    dayVal = 3
} else if (dayTime.includes('thursday')){
    dayName = 'thursday'
    dayVal = 4
} else if (dayTime.includes('friday')){
    dayName = 'friday'
    dayVal = 5
} else if (dayTime.includes('saturday')){
    dayName = 'saturday'
    dayVal = 6
}


if (dayTime.includes("next") && dayTime.indexOf("next") < dayTime.indexOf(dayName)){
    nextWeek = true
    numDays = ((dayVal - todayNum) + 7)
    console.log("send in days = " + numDays)
} else if((dayVal - todayNum) <= -1){
    nextWeek = true
    numDays = ((dayVal - todayNum) + 7)
    console.log("send in days = " + numDays)
} else {
    nextWeek = false
    numDays = (dayVal - todayNum)
    console.log("send in days = " + numDays)
}

if(dayTime.toLowerCase().includes('am')){
    meridian = 'am'
} else if(dayTime.toLowerCase().includes('pm')) {
    meridian = 'pm'
} else {
    ampmCheck = false;
}

var messageDate = today.addDays(numDays)

var time = dayTime.substring(dayTime.indexOf(meridian)-5)

if(!isNaN(time.substring(0,1))){
    time = dayTime.substring(dayTime.indexOf(meridian)-4)
    console.log(time)
    console.log(messageDate.at(time))
} else {
    time = dayTime.substring(dayTime.indexOf(meridian)-5)
    console.log(time)
    console.log(messageDate.at(time))
}



}

        $scope.signup = function(){
            console.log($scope.signupForm)
            $http({ 
                method : 'POST',
                url    : '/signup1',
                data   : $scope.signupForm
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/" }
            })
        }

        $scope.test = function(){
            console.log("test")
            $http({ 
                method : 'POST',
                url    : '/test'
            }).then(function(returnData){
                if ( returnData.data.success ) { window.location.href="/" }
            })
        }

        $scope.checkTime = function(){
            console.log("import")
            $http({ 
                method : 'POST',
                url    : '/checkTime'
            }).then(function(returnData){
                console.log("here's return data:")
                console.log(returnData)
                console.log(returnData.data)
                if ( returnData.data.success ) { window.location.href="/" }
            })
        }

        setTimeout($scope.checkTime,10000)

        $scope.importData = function(){
            console.log("import")
            $http({ 
                method : 'POST',
                url    : '/importData'
            }).then(function(returnData){
                console.log("here's return data:")
                console.log(returnData)
                console.log(returnData.data)
                if ( returnData.data.success ) { window.location.href="/" }
            })
        }


//         $scope.timeSetting = function(){
//             $http({ 
//                 method : 'POST',
//                 url    : '/time',
//                 data   : $scope.setTime
//             }).then(function(returntime){
//                 $scope.checkInfo()
//             })
//         }

//         $scope.numberSetting = function(){
//             $http({ 
//                 method : 'POST',
//                 url    : '/number',
//                 data   : $scope.setNumber
//             }).then(function(returnNumber){
//                 $scope.checkInfo()
//             })
//         }

//         $scope.habit1Setting = function(){
//             $http({ 
//                 method : 'POST',
//                 url    : '/habit1Set',
//                 data   : $scope.SetHabit1
//             }).then(function(returnHabit1){
//                 $scope.checkInfo()
//             })
//         }

//         $scope.habit3Setting = function(){
//             $http({ 
//                 method : 'POST',
//                 url    : '/habit3Set',
//                 data   : $scope.SetHabit3
//             }).then(function(returnHabit3){
//                 $scope.checkInfo()
//             })
//         }


//         $scope.text = function(){
//             $scope.timeSetting()
//         }        

//         $scope.number = function(){
//             $scope.numberSetting()
//         } 

//         $scope.habit1 = function(){
//             $scope.habit1Setting()
//         } 

//         $scope.habit2 = function(){
//             $scope.habit2Setting()
//         } 

//         $scope.habit3 = function(){
//             $scope.habit3Setting()
//         } 


//         $scope.login = function(){
//             $http({
//                 method : 'POST',
//                 url    : '/login',
//                 data   : $scope.loginForm
//             }).then(function(returnData){
//                 if ( returnData.data.success ) { window.location.href="/dashboard" } 
//                 else { console.log(returnData)}
//             })
//         }

//         $scope.testing = function(){
//             $scope.hideBox = true;
//         }

//         $scope.cancelBox = function(){
//             $scope.hideBox = false;
//         }

//         // Functions for Login screen

//         $scope.loginClick = function(){
//             $scope.loginHide = true;
//         }

//         $scope.cancelClick = function(){
//             $scope.loginHide = false;
//         }

//         $scope.signupClick = function(){
//             $scope.signupHide = true;
//         }

//         $scope.cancelClick2 = function(){
//             $scope.signupHide = false;
//         }

// 	}]);

// angular.module('myApp')
//     .controller('welcomeController', ['$scope', '$http', function($scope, $http){

//            $scope.times = {
//             '0': '12:00',
//             '1': '1:00 AM',
//             '2': '2:00 AM',
//             '3': '3:00 AM',
//             '4': '4:00 AM',
//             '5': '5:00 AM',
//             '6': '6:00 AM',
//             '7': '7:00 AM',
//             '8': '8:00 AM',
//             '9': '9:00 AM',
//             '10': '10:00 AM',
//             '11': '11:00 AM',
//             '12': '12:00 PM',
//             '13': '1:00 PM',
//             '14': '2:00 PM',
//             '15': '3:00 PM',
//             '16': '4:00 PM',
//             '17': '5:00 PM',
//             '18': '6:00 PM',
//             '19': '7:00 PM',
//             '20': '8:00 PM',
//             '21': '9:00 PM',
//             '22': '10:00 PM',
//             '23': '11:00 PM'
//         }

//             $scope.modalInfo = function(){
//                 //username
//                 $scope.modalUsername = userData[0].username
//                 if (userData[0].time == null){
//                 //text time
//                 $scope.modalTime = "It looks like you haven't selected a time yet - head over to Settings in the top right!"
//                 $scope.modal2Time = "Please choose a time to receive texts."
//                 } else {
//                 $scope.modalTime = $scope.times[userData[0].time]
//                 }
//                 //phone number
//                 if (userData[0].number == 0){
//                     $scope.modal2Number = "You don't have a number saved. Add one below."
//                     $scope.modalNumber = "It looks like you haven't added a number yet - head over to Settings in the top right!"
//                 } else {
//                     $scope.modal2Number = ("Current number: " + userData[0].number)
//                     $scope.modalNumber = userData[0].number
//                 }
//                 //habits
//                 if (userData[0].habit1 == ''){
//                     $scope.modalHabit = "It looks like you haven't specified any habits yet - head over to Settings in the top right!"
//                 } else if (userData[0].habit1 != ''){
//                     $scope.modalHabit1 = "Habit 1: " + userData[0].habit1 
//                     $scope.modalHabit2 = "Habit 2: " + userData[0].habit2
//                     $scope.modalHabit3 = "Habit 3: " + userData[0].habit3
//                 }
//                 }

//             $scope.welcomeBox = function(req, res){
//             $http({ 
//                 method : 'POST',
//                 url    : '/welcomebox'
//             }).then(function(ReturnData){
//             userData = ReturnData.data
//             $scope.modalInfo();
//             if(userData[0].time == null && userData[0].number == 0 && userData[0].habit1 == ''){
//             // $scope.welcomeTime = true;
//             introJs().start();


//         }})}
  // $scope.welcomeBox();
          


        }])