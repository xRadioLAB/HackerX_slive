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

// goToSlideByIndex(status) status: string['goToPrevious' | 'goToNext']
function goToSlideByIndex(status) {
    var active;
    if (status === 'goToPrevious') {
        active = Office.Index.Previous;
    }
    if (status === 'goToNext') {
        active = Office.Index.Next;
        $.get('http://123.206.42.148:5000/flag/?action=next', function(result) {
            console.log('get:', result);
        });
    }
    // Office.context.document.goToByIdAsync(active, Office.GoToType.Index, callback(asyncResult));
    Office.context.document.goToByIdAsync(active, Office.GoToType.Index);
}

// callback() just for dev console logs
// function callback(asyncResult) {
//     if (asyncResult.status == "failed") {
//         $('#text').append("Action failed with error: " + asyncResult.error.message + "<br>");
//     } else {
//         $('#text').append("Navigation successful<br>");
//     }
// }

// Office initialize
(function() {
    Office.initialize = function(reason) {
        // $('#text').append("Office.initialize" + reason);
        goToSlideByIndex('goToPrevious');
        goToSlideByIndex('goToNext');
    };
})();


$(function() {
    // onLoadData
    var dev = false;
    var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
    var socket = io.connect(sever);
    socket.on('previous', function(data) {
        goToSlideByIndex('goToPrevious');
    });
    socket.on('next', function(data) {
        goToSlideByIndex('goToNext');
    });
    // socket.on('goToFirst', function(data) {
    //     goToSlideByIndex('goToFirst');
    // });
    // socket.on('goToLast', function(data) {
    //     goToSlideByIndex('goToLast');
    // });
});
