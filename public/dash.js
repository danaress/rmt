angular.module('myApp')

angular.module('myApp')
    .controller('dashController', ['$scope', '$http', function($scope, $http){        

        $scope.FinalH1N = 0
        $scope.FinalH1Y = 0
        $scope.FinalH2N = 0
        $scope.FinalH2Y = 0
        $scope.FinalH3N = 0
        $scope.FinalH3Y = 0

            //Function for Chart 1
        $scope.array1Metrics = function(){
            console.log($scope.userInfo[0]);
            console.log("length = " + $scope.userInfo[0].array1.length)
            $scope.H1Y = 0
            $scope.H1N = 0
            for (var i=0; i < $scope.userInfo[0].array1.length; i++){
                if ($scope.userInfo[0].array1[i] == "y" || $scope.userInfo[0].array1[i] == "Y"){
                    $scope.H1Y = ($scope.H1Y + 1)
                    
                } else if ($scope.userInfo[0].array1[i] == "n" || $scope.userInfo[0].array1[i] == "N"){
                    $scope.H1N = ($scope.H1N + 1)
                }

            }
            var d = new Date()
            var x = $scope.userInfo[0].start
            console.log(d)
            console.log(x)
            console.log(d.getDay())
            $scope.FinalH1Y = (100*($scope.H1Y/($scope.H1N+$scope.H1Y)))
            $scope.FinalH1N = (100*($scope.H1N/($scope.H1N+$scope.H1Y)))
            $scope.loadChart1();
        }
        ///////End

            // Function for Chart 2
        $scope.array2Metrics = function(){
            console.log("length = " + $scope.userInfo[0].array2.length)
            $scope.H2Y = 0
            $scope.H2N = 0
            for (var i=0; i < $scope.userInfo[0].array2.length; i++){
                if ($scope.userInfo[0].array2[i] == "y" || $scope.userInfo[0].array2[i] == "Y"){
                    $scope.H2Y = ($scope.H2Y + 1)
                    
                } else if ($scope.userInfo[0].array2[i] == "n" || $scope.userInfo[0].array2[i] == "N"){
                    $scope.H2N = ($scope.H2N + 1)
                }

            }
            $scope.FinalH2Y = (100*($scope.H2Y/($scope.H2N+$scope.H2Y)))
            $scope.FinalH2N = (100*($scope.H2N/($scope.H2N+$scope.H2Y)))
            $scope.loadChart2();
        }


                //Function for Chart 3
        $scope.array3Metrics = function(){
            console.log("length = " + $scope.userInfo[0].array3.length)
            $scope.H3Y = 0
            $scope.H3N = 0
            for (var i=0; i < $scope.userInfo[0].array3.length; i++){
                if ($scope.userInfo[0].array3[i] == "y" || $scope.userInfo[0].array3[i] == "Y"){
                    $scope.H3Y = ($scope.H3Y + 1)
                    
                } else if ($scope.userInfo[0].array3[i] == "n" || $scope.userInfo[0].array3[i] == "N"){
                    $scope.H3N = ($scope.H3N + 1)
                }

            }
            $scope.FinalH3Y = (100*($scope.H3Y/($scope.H3N+$scope.H3Y)))
            $scope.FinalH3N = (100*($scope.H3N/($scope.H3N+$scope.H3Y)))
            $scope.loadChart3();
        }
        ///////End



        $scope.getMetrics = function(req, res){
            console.log('this far')
            $http.post('/metrics')
            .then(function(returninfo){
                $scope.userInfo = returninfo.data
                console.log($scope.userInfo[0].array1.length)
                $scope.name = $scope.userInfo[0].username
                $scope.array1Metrics();
                $scope.array2Metrics();
                $scope.array3Metrics();
            })
        }
        $scope.getMetrics()

// /////////////////////////////////////// HighCharts Activity Gauge for Array 1 ///////////////////////////////
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
            text: $scope.userInfo[0].habit2,
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
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.1).get(),
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
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH1Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH1N
            }]
        }, {
            name: 'Not recorded',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '50%',
                innerRadius: '50%',
                y: 33
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
            text: $scope.userInfo[0].habit1,
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
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.1).get(),
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
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH2Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH2N
            }]
        }, {
            name: 'Not recorded',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '50%',
                innerRadius: '50%',
                y: 33
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
            text: $scope.userInfo[0].habit3,
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
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Exercise
                outerRadius: '87%',
                innerRadius: '63%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1]).setOpacity(0.1).get(),
                borderWidth: 0
            }, { // Track for Stand
                outerRadius: '62%',
                innerRadius: '38%',
                backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[2]).setOpacity(0.1).get(),
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
            borderColor: Highcharts.getOptions().colors[0],
            data: [{
                color: Highcharts.getOptions().colors[0],
                radius: '100%',
                innerRadius: '100%',
                y: $scope.FinalH3Y
            }]
        }, {
            name: 'Goal Not Met',
            borderColor: Highcharts.getOptions().colors[1],
            data: [{
                color: Highcharts.getOptions().colors[1],
                radius: '75%',
                innerRadius: '75%',
                y: $scope.FinalH3N
            }]
        }, {
            name: 'Not recorded',
            borderColor: Highcharts.getOptions().colors[2],
            data: [{
                color: Highcharts.getOptions().colors[2],
                radius: '50%',
                innerRadius: '50%',
                y: 33
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