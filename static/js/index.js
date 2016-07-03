// @St. 2016-07-02-17.41
"use strict";
$(function() {
    var $app = $("#app");
    var $text = $("#text");
    var myChart = echarts.init(document.getElementById('app'));
    var option = {
        title: {
            text: 'slive vote'
        },
        tooltip: {},
        legend: {
            data: ['vote']
        },
        xAxis: {
            data: ["悦悦", "小郝", "木木", "John", "lxvc"]
        },
        yAxis: {},
        series: [{
            name: 'vote',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
        }]
    };
    myChart.setOption(option);
    // onLoadData
    function onLoadData() {
        var dev = false;
        var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
        var socket = io.connect(sever);
        socket.on('slack', function(data) {
            option.series[0].data[$.inArray(data.name, option.xAxis.data)] += 1;
            // console.log(data.name + ':' + option.series[0].data[$.inArray(data.name, option.xAxis.data)]);
            myChart.setOption(option);
        });
    }
    onLoadData();
});
