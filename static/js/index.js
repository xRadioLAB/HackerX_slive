/**
 * @project Slive
 * @authour "HackerX" Tsinghua Team Quincopter
 *          - John Lee
 *          - LXVC
 *          - Super Woods <st_sister@icloud.com>
 *
 * @time    2016-07-02-17.41
 *          2016-07-05-15.15 cleanup
 */
"use strict";
$(function() {
    var myChart = echarts.init(document.getElementById('app'));
    var option = {
        title: {
            text: '谁长得最帅'
        },
        tooltip: {},
        legend: {
            data: ['颜值数']
        },
        xAxis: {
            data: ["悦悦", "小郝", "木木", "John", "lxvc"]
        },
        yAxis: {},
        series: [{
            name: '颜值数',
            type: 'bar',
            data: [0, 0, 0, 0, 0]
        }]
    };
    myChart.setOption(option);

    // onLoadData
    var dev = false;
    var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
    var socket = io.connect(sever);
    socket.on('slack', function(data) {
        option.series[0].data[$.inArray(data.name, option.xAxis.data)] += 1;
        // console.log(data.name + ':' + option.series[0].data[$.inArray(data.name, option.xAxis.data)]);
        myChart.setOption(option);
    });

});
