// @St. 2016-07-02-17.41
"use strict";
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

// var messageBanner;
var Globals = {
    activeViewHandler: null,
};
var $text = $("#text");

// // The initialize function must be run each time a new page is loaded
// Office.initialize = function (reason) {
//     $(document).ready(function () {
//         var element = document.querySelector('.ms-MessageBanner');
//         messageBanner = new fabric.MessageBanner(element);
//         messageBanner.hideBanner();
//
//         registerActiveViewChanged();
//
//         $('#get-data-from-selection').click(getDataFromSelection);
//         $('#get-file-view').click(getCurrentSlide);
//     });
// };

// function getFileView() {
//     //Gets whether the current view is edit or read.
//     Office.context.document.getActiveViewAsync(function (asyncResult) {
//         if (asyncResult.status == "failed") {
//             showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
//         }
//         else {
//             showNotification('Current View is:', asyncResult.value);
//         }
//     });
// }
//
// function getFileView() {
//     //Gets whether the current view is edit or read.
//     Office.context.document.getActiveViewAsync(function (asyncResult) {
//         if (asyncResult.status == "failed") {
//             showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
//         }
//         else {
//             showNotification('Current View is:', asyncResult.value);
//         }
//     });
// }
//
function getCurrentSlide() {
    Office.context.document.getSelectedDataAsync(Office.CoercionType.SlideRange, function(asyncResult) {
        if (asyncResult.status == "failed") {
            showNotification('Error:', "Action failed with error: " + asyncResult.error.message);
        } else {
            var firstSlideId = asyncResult.value.slides[0].id;
            showNotification('<br>ID:', JSON.stringify(asyncResult.value));
        }
    });
}
//
// // Reads data from current document selection and displays a notification
// function getDataFromSelection() {
//     if (Office.context.document.getSelectedDataAsync) {
//         Office.context.document.getSelectedDataAsync(Office.CoercionType.Text,
//             function (result) {
//                 if (result.status === Office.AsyncResultStatus.Succeeded) {
//                     showNotification('The selected text is:', '"' + result.value + '"');
//                 } else {
//                     showNotification('Error:', result.error.message);
//                 }
//             }
//         );
//     } else {
//         app.showNotification('Error:', 'Reading selection data is not supported by this host application.');
//     }
// }
//

// Helper function for displaying notifications
function showNotification(text, content) {
    $text.append(text);
    // $("#notificationBody").text(content);
    // messageBanner.showBanner();
    // messageBanner.toggleExpansion();
}


function registerActiveViewChanged() {

    Globals.activeViewHandler = function(args) {
        showNotification('1: ' + JSON.stringify(args))
    };

    Office.context.document.addHandlerAsync(Office.EventType.ActiveViewChanged, Globals.activeViewHandler,
        function(asyncResult) {
            if (asyncResult.status == "failed") {
                showNotification('2:' + asyncResult.error.message);
            } else {
                showNotification('3:' + asyncResult.status);
            }
        });
}

function addEventHandlerToDocument() {
    Office.context.document.addHandlerAsync(Office.EventType.DocumentSelectionChanged, getCurrentSlide);
}

// function MyHandler(eventArgs) {
//     showNotification(eventArgs.document);
//     getCurrentSlide()
// }

// OfficeInit();
// function OfficeInit() {
//     Office.initialize = function(reason) {
//         // $('#app').after(reason);
//         console.log(reason);
//         $(function() {
//             registerActiveViewChanged();
//             addEventHandlerToDocument();
//         });
//     };
// }

// data
(function data() {
    var dev = false;
    var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
    var socket = io.connect(sever);
    socket.on('slack', function(data) {
        dataCallback(data);
    })
})();

function dataCallback(data) {
    showNotification(data.ok);
    console.log(data);
}


$(function() {
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

});
