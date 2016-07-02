// @St. 2016-07-02-17.41
var myChart = echarts.init(document.getElementById('app'));
var option = {
    title: {
        text: 'slive'
    },
    tooltip: {},
    legend: {
        data: ['票票']
    },
    xAxis: {
        data: ["悦悦", "小郝", "木木", "John", "LVC"]
    },
    yAxis: {},
    series: [{
        name: '票票',
        type: 'bar',
        data: [55, 20, 36, 88, 20]
    }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
