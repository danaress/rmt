
angular.module('myApp')

angular.module('myApp').factory('userInfo', function(){
    return {}
    })

    .controller('dashController', ['$scope', '$http', 'userInfo', function($scope, $http, $userInfo){        

        $scope.H1Show = function(){
            $scope.H1Month = true;
            $scope.H2Month = false;
            $scope.H3Month = false;
            $scope.H1Week = true;
            $scope.H2Week = false;
            $scope.H3Week = false;
            $scope.container = true;
            $scope.container2 = false;
            $scope.container3 = false;
        }
        $scope.H2Show = function(){
            $scope.H1Month = false;
            $scope.H2Month = true;
            $scope.H3Month = false;
            $scope.H1Week = false;
            $scope.H2Week = true;
            $scope.H3Week = false;
            $scope.container = false;
            $scope.container2 = true;
            $scope.container3 = false;
        }
        $scope.H3Show = function(){
            $scope.H1Month = false;
            $scope.H2Month = false;
            $scope.H3Month = true;
            $scope.H1Week = false;
            $scope.H2Week = false;
            $scope.H3Week = true;
            $scope.container = false;
            $scope.container2 = false;
            $scope.container3 = true;
        }

        $scope.WeekShow = function(){
            $scope.H1Month = false;
            $scope.H2Month = false;
            $scope.H3Month = false;
            $scope.H1Week = true;
            $scope.H2Week = true;
            $scope.H3Week = true;
            $scope.container = false;
            $scope.container2 = false;
            $scope.container3 = false;
        }
        $scope.MonthShow = function(){
            $scope.H1Month = true;
            $scope.H2Month = true;
            $scope.H3Month = true;
            $scope.H1Week = false;
            $scope.H2Week = false;
            $scope.H3Week = false;
            $scope.container = false;
            $scope.container2 = false;
            $scope.container3 = false;
        }
        $scope.AllTimeShow = function(){
            $scope.H1Month = false;
            $scope.H2Month = false;
            $scope.H3Month = false;
            $scope.H1Week = false;
            $scope.H2Week = false;
            $scope.H3Week = false;
            $scope.container = true;
            $scope.container2 = true;
            $scope.container3 = true;
        }




        $scope.getMetrics = function(req, res){
            console.log('this far')
            $http.post('/metrics')
            .then(function(returninfo){
                userInfo = returninfo.data
                console.log("user info = ", userInfo)
                $scope.mili = 86399999
                $scope.week = 604800000
                $scope.month = 2629746000
                $scope.datenow = Date.now()
                $scope.numdays = Math.round(($scope.datenow - userInfo[0].start)/$scope.mili)
                $scope.array1Metrics();
                $scope.array2Metrics();
                $scope.array3Metrics();
                $scope.array1Week();
                $scope.array2Week();
                $scope.array3Week();
                $scope.array1Month();
                $scope.array2Month();
                $scope.array3Month();
            })
        }
        $scope.getMetrics()


        $scope.loadH1 = function(){
            $scope.loadChartH1Month();
        }
        // $scope.loadH2 = function(){
        //     $scope.loadChartH2Month();
        // }

        $scope.FinalH1N = 0
        $scope.FinalH1Y = 0
        $scope.FinalH10 = 0
        $scope.FinalH2N = 0
        $scope.FinalH2Y = 0
        $scope.FinalH20 = 0
        $scope.FinalH3N = 0
        $scope.FinalH3Y = 0
        $scope.FinalH30 = 0
        $scope.FinalH1WeekY = 0
        $scope.FinalH1WeekN = 0
        $scope.FinalH1Week0 = 0
        $scope.FinalH2WeekY = 0
        $scope.FinalH2WeekN = 0
        $scope.FinalH2Week0 = 0
        $scope.FinalH3WeekY = 0
        $scope.FinalH3WeekN = 0
        $scope.FinalH3Week0 = 0
        $scope.FinalH1MonthY = 0
        $scope.FinalH1MonthN = 0
        $scope.FinalH1Month0 = 0
        $scope.FinalH2MonthY = 0
        $scope.FinalH2MonthN = 0
        $scope.FinalH2Month0 = 0
        $scope.FinalH3MonthY = 0
        $scope.FinalH3MonthN = 0
        $scope.FinalH3Month0 = 0


$scope.test= "H1Month"


        //Habit 1 LAST MONTH
        $scope.array1Month= function(){
            console.log(userInfo[0]);
            console.log("length = " + userInfo[0].array1.length)
            $scope.month1Array = []
            $scope.H1MonthY = 0
            $scope.H1MonthN = 0
            for (var i=0; i< userInfo[0].array1.length; i++){
                if (($scope.datenow - userInfo[0].array1[i][1]) < $scope.month){
            $scope.month1Array.push(userInfo[0].array1[i][0])
    }
            }
            for (var i=0; i < $scope.month1Array.length; i++){
                if ($scope.month1Array[i] == "y" || $scope.month1Array[i] == "Y"){
                    $scope.H1MonthY = ($scope.H1MonthY + 1)
                    
                } else if ($scope.month1Array[i] == "n" || $scope.month1Array[i] == "N"){
                    $scope.H1MonthN = ($scope.H1MonthN + 1)
                }
            }
            $scope.FinalH1MonthY = Math.round(100*($scope.H1MonthY/7))
            $scope.FinalH1MonthN = Math.round(100*($scope.H1MonthN/7))
            $scope.FinalH1Month0 = Math.round(10*(7-($scope.H1MonthN + $scope.H1MonthY)))
            $scope.loadChartH1Month();
        }

        //Habit 2 LAST MONTH
        $scope.array2Month= function(){
            console.log(userInfo[0]);
            console.log("length = " + userInfo[0].array2.length)
            $scope.month2Array = []
            $scope.H2MonthY = 0
            $scope.H2MonthN = 0
            for (var i=0; i<userInfo[0].array2.length; i++){
                if (($scope.datenow - userInfo[0].array2[i][1]) < $scope.month){
            $scope.month2Array.push(userInfo[0].array2[i][0])
    }
            }
            for (var i=0; i < $scope.month2Array.length; i++){
                if ($scope.month2Array[i] == "y" || $scope.month2Array[i] == "Y"){
                    $scope.H2MonthY = ($scope.H2MonthY + 1)
                    
                } else if ($scope.month2Array[i] == "n" || $scope.month1Array[i] == "N"){
                    $scope.H2MonthN = ($scope.H2MonthN + 1)
                }
            }
            $scope.FinalH2MonthY = Math.round(100*($scope.H2MonthY/7))
            $scope.FinalH2MonthN = Math.round(100*($scope.H2MonthN/7))
            $scope.FinalH2Month0 = Math.round(10*(7-($scope.H2MonthN + $scope.H2MonthY)))
            $scope.loadChartH2Month();
        }

        //Habit 3 LAST MONTH
        $scope.array3Month= function(){
            console.log(userInfo[0]);
            console.log("length = " + userInfo[0].array3.length)
            $scope.month3Array = []
            $scope.H3MonthY = 0
            $scope.H3MonthN = 0
            for (var i=0; i<userInfo[0].array3.length; i++){
                if (($scope.datenow - userInfo[0].array3[i][1]) < $scope.month){
            $scope.month3Array.push(userInfo[0].array3[i][0])
    }
            }
            for (var i=0; i < $scope.month3Array.length; i++){
                if ($scope.month3Array[i] == "y" || $scope.month3Array[i] == "Y"){
                    $scope.H3MonthY = ($scope.H3MonthY + 1)
                    
                } else if ($scope.month2Array[i] == "n" || $scope.month1Array[i] == "N"){
                    $scope.H3MonthN = ($scope.H3MonthN + 1)
                }
            }
            $scope.FinalH3MonthY = Math.round(100*($scope.H3MonthY/7))
            $scope.FinalH3MonthN = Math.round(100*($scope.H3MonthN/7))
            $scope.FinalH3Month0 = Math.round(10*(7-($scope.H3MonthN + $scope.H3MonthY)))
            $scope.loadChartH3Month();
        }


        //Habit 1 LAST WEEK
        $scope.array1Week = function(){
            console.log(userInfo[0]);
            console.log("length = " + userInfo[0].array1.length)
            $scope.week1Array = []
            $scope.H1WeekY = 0
            $scope.H1WeekN = 0
            $scope.H1Week0 = 0
            for (var i=0; i<userInfo[0].array1.length; i++){
                if (($scope.datenow - userInfo[0].array1[i][1]) < $scope.week){
            $scope.week1Array.push(userInfo[0].array1[i][0])
    }
            }
            for (var i=0; i < $scope.week1Array.length; i++){
                if ($scope.week1Array[i] == "y" || $scope.week1Array[i] == "Y"){
                    $scope.H1WeekY = ($scope.H1WeekY + 1)
                    
                } else if ($scope.week1Array[i] == "n" || $scope.week1Array[i] == "N"){
                    $scope.H1WeekN = ($scope.H1WeekN + 1)
                }
            }
            $scope.FinalH1WeekY = Math.round(100*($scope.H1WeekY/7))
            $scope.FinalH1WeekN = Math.round(100*($scope.H1WeekN/7))
            $scope.FinalH1Week0 = Math.round(10*(7-($scope.H1WeekN + $scope.H1WeekY)))
            $scope.loadChartH1Week();
        }

        //Habit 2 LAST WEEK
        $scope.array2Week = function(){
            $scope.week2Array = []
            $scope.H2WeekY = 0
            $scope.H2WeekN = 0
            $scope.H2Week0 = 0
            for (var i=0; i<userInfo[0].array2.length; i++){
                if (($scope.datenow - userInfo[0].array2[i][1]) < $scope.week){
            $scope.week2Array.push(userInfo[0].array2[i][0])
    }
            }
            console.log($scope.week2Array);
            for (var i=0; i < $scope.week2Array.length; i++){
                if ($scope.week2Array[i] == "y" || $scope.week2Array[i] == "Y"){
                    $scope.H2WeekY = ($scope.H2WeekY + 1)
                    
                } else if ($scope.week2Array[i] == "n" || $scope.week2Array[i] == "N"){
                    $scope.H2WeekN = ($scope.H2WeekN + 1)
                }
            }
            $scope.FinalH2WeekY = Math.round(100*($scope.H2WeekY/7))
            $scope.FinalH2WeekN = Math.round(100*($scope.H2WeekN/7))
            $scope.FinalH2Week0 = Math.round(10*(7-($scope.H2WeekN + $scope.H2WeekY)))
            console.log($scope.FinalH2WeekY)
            console.log($scope.FinalH2WeekN)
            console.log($scope.FinalH2Week0)
            $scope.loadChartH2Week();
        }

        //Habit 3 LAST WEEK
        $scope.array3Week = function(){
            $scope.week3Array = []
            $scope.H3WeekY = 0
            $scope.H3WeekN = 0
            $scope.H3Week0 = 0
            for (var i=0; i<userInfo[0].array3.length; i++){
                if (($scope.datenow - userInfo[0].array3[i][1]) < $scope.week){
            $scope.week3Array.push(userInfo[0].array3[i][0])
    }
            }
            for (var i=0; i < $scope.week3Array.length; i++){
                if ($scope.week3Array[i] == "y" || $scope.week3Array[i] == "Y"){
                    $scope.H3WeekY = ($scope.H3WeekY + 1)
                    
                } else if ($scope.week3Array[i] == "n" || $scope.week3Array[i] == "N"){
                    $scope.H3WeekN = ($scope.H3WeekN + 1)
                }
            }
            $scope.FinalH3WeekY = Math.round(100*($scope.H3WeekY/7))
            $scope.FinalH3WeekN = Math.round(100*($scope.H3WeekN/7))
            $scope.FinalH3Week0 = Math.round(10*(7-($scope.H3WeekN + $scope.H3WeekY)))
            $scope.loadChartH3Week();
        }

        // Habit 1 ALL TIME
        $scope.array1Metrics = function(){
            $scope.H1Y = 0
            $scope.H1N = 0
            for (var i=0; i < userInfo[0].array1.length; i++){
                if (userInfo[0].array1[i][0] == "y" || userInfo[0].array1[i][0] == "Y"){
                    $scope.H1Y = ($scope.H1Y + 1)
                    
                } else if (userInfo[0].array1[i][0] == "n" || userInfo[0].array1[i][0] == "N"){
                    $scope.H1N = ($scope.H1N + 1)
                }

            }
            $scope.FinalH1Y = Math.round(100*($scope.H1Y/$scope.numdays))
            $scope.FinalH1N = Math.round(100*($scope.H1N/$scope.numdays))
            $scope.FinalH10 = Math.round(100-($scope.FinalH1N+$scope.FinalH1Y))
            $scope.loadChart1();
        }

        //Habit 2 ALL TIME
        $scope.array2Metrics = function(){
            console.log("length = " + userInfo[0].array2.length)
            $scope.H2Y = 0
            $scope.H2N = 0
            for (var i=0; i < userInfo[0].array2.length; i++){
                if (userInfo[0].array2[i][0] == "y" || userInfo[0].array2[i][0] == "Y"){
                    $scope.H2Y = ($scope.H2Y + 1)
                    
                } else if (userInfo[0].array2[i][0] == "n" || userInfo[0].array2[i][0] == "N"){
                    $scope.H2N = ($scope.H2N + 1)
                }

            }
            $scope.FinalH2Y = Math.round(100*($scope.H2Y/$scope.numdays))
            $scope.FinalH2N = Math.round(100*($scope.H2N/$scope.numdays))
            $scope.FinalH20 = Math.round(100-($scope.FinalH2N+$scope.FinalH2Y))
            $scope.loadChart2();
        }

        //Habit 3 ALL TIME
        $scope.array3Metrics = function(){
            $scope.H3Y = 0
            $scope.H3N = 0
            for (var i=0; i < userInfo[0].array3.length; i++){
                if (userInfo[0].array3[i][0] == "y" || userInfo[0].array3[i][0] == "Y"){
                    $scope.H3Y = ($scope.H3Y + 1)
                    
                } else if (userInfo[0].array3[i][0] == "n" || userInfo[0].array3[i][0] == "N"){
                    $scope.H3N = ($scope.H3N + 1)
                }
            }
            $scope.FinalH3Y = Math.round(100*($scope.H3Y/$scope.numdays))
            $scope.FinalH3N = Math.round(100*($scope.H3N/$scope.numdays))
            $scope.FinalH30 = Math.round(100-($scope.FinalH3N+$scope.FinalH3Y))
            $scope.loadChart3();
        }
        ///////End   


// /////////////////////////////////////// HighCharts Activity Gauge for Array 1  in LAST 30 DAYS ///////////////////////////////
$scope.loadChartH1Month = function(){
        $(function () {

    Highcharts.chart('H1Month', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit1,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH1MonthY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH1MonthN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH1Month0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}



// /////////////////////////////////////// HighCharts Activity Gauge for Array 2  in LAST 30 DAYS ///////////////////////////////
$scope.loadChartH2Month = function(){
        $(function () {

    Highcharts.chart('H2Month', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit2,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH2MonthY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH2MonthN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH2Month0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}



// /////////////////////////////////////// HighCharts Activity Gauge for Array 3  in LAST 30 DAYS ///////////////////////////////
$scope.loadChartH3Month = function(){
        $(function () {

    Highcharts.chart('H3Month', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit3,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH3MonthY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH3MonthN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH3Month0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}


// /////////////////////////////////////// HighCharts Activity Gauge for Array 3  in LAST 7 DAYS ///////////////////////////////
$scope.loadChartH3Week = function(){
        $(function () {

    Highcharts.chart('H3Week', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit3,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH3WeekY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH3WeekN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH3Week0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}




// /////////////////////////////////////// HighCharts Activity Gauge for Array 2  in LAST 7 DAYS ///////////////////////////////
$scope.loadChartH2Week = function(){
        $(function () {

    Highcharts.chart('H2Week', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit2,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH2WeekY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH2WeekN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH2Week0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}




// /////////////////////////////////////// HighCharts Activity Gauge for Array 1  in LAST 7 DAYS ///////////////////////////////
$scope.loadChartH1Week = function(){
        $(function () {

    Highcharts.chart('H1Week', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit1,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH1WeekY
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH1WeekN
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH1Week0
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}




// /////////////////////////////////////// HighCharts Activity Gauge for Array 1 of ALL TIME ///////////////////////////////
$scope.loadChart1 = function(){
        $(function () {

    Highcharts.chart('container', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit1,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor:'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor:'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH1Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH1N
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH10
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}

// /////////////////////////////////////// HighCharts Activity Gauge for Array 2 ///////////////////////////////

$scope.loadChart2 = function(){
        $(function () {

    Highcharts.chart('container2', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit2,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: 'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: 'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH2Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH2N
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH20
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}


// /////////////////////////////////////// HighCharts Activity Gauge for Array 3 ///////////////////////////////
$scope.loadChart3 = function(){
        $(function () {

    Highcharts.chart('container3', {

        chart: {
            type: 'solidgauge',
            marginTop: 50
        },

        credits: {
            enabled: false
        },

        title: {
            text: userInfo[0].habit3,
            style: {
                fontSize: '24px'
            }
        },

        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            style: {
                fontSize: '16px'
            },
            pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
            positioner: function (labelWidth, labelHeight) {
                return {
                    x: 200 - labelWidth / 2,
                    y: 180
                };
            }
        },

        pane: {
            startAngle: 0,
            endAngle: 360,
            background: [{ // Track for Move
                outerRadius: '112%',
                innerRadius: '88%',
                backgroundColor: 'rgba(46, 204, 113, .1)',
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: 'rgba(231, 76, 60, .1)',
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: 'rgba(149, 165, 166, .1)',
                borderWidth: 0
            }]
        },

        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: []
        },

        plotOptions: {
            solidgauge: {
                borderWidth: '34px',
                dataLabels: {
                    enabled: false
                },
                linecap: 'round',
                stickyTracking: false
            }
        },

        series: [{
            name: 'Goal Met',
            borderColor: 'rgb(46, 204, 113)',
            data: [{
                color: 'rgb(46, 204, 113)',
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH3Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: 'rgb(231, 76, 60)',
            data: [{
                color: 'rgb(231, 76, 60)',
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH3N
            }]
        }, {
            name: 'Not recorded',
            borderColor: 'rgb(149, 165, 166)',
            data: [{
                color: 'rgb(149, 165, 166)',
                radius: '50%',
                innerRadius: '50%',
                y: $scope.FinalH30
            }]
        }]
    },

    /**
     * In the chart load callback, add icons on top of the circular shapes
     */
    function callback() {

        // Move icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 26)
            .add(this.series[2].group);

        // Exercise icon
        this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8, 'M', 8, -8, 'L', 16, 0, 8, 8])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 61)
            .add(this.series[2].group);

        // Stand icon
        this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
            .attr({
                'stroke': '#303030',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
                'stroke-width': 2,
                'zIndex': 10
            })
            .translate(190, 96)
            .add(this.series[2].group);
    });
});
}
}]);