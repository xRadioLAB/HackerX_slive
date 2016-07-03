// @St. goto.js
function goToSlideByIndex(status) {
    var goToFirst = Office.Index.First;
    var goToLast = Office.Index.Last;
    var goToPrevious = Office.Index.Previous;
    var goToNext = Office.Index.Next;
    var active;
    if (status === 'goToFirst') {
        active = goToFirst;
    }
    if (status === 'goToLast') {
        active = goToLast;
    }
    if (status === 'goToPrevious') {
        active = goToPrevious;
    }
    if (status === 'goToNext') {
        active = goToNext;
    }
    // Office.context.document.goToByIdAsync(active, Office.GoToType.Index, callback(asyncResult));
    Office.context.document.goToByIdAsync(active, Office.GoToType.Index);
}
function callback(asyncResult) {
    if (asyncResult.status == "failed") {
        $('#text').append("Action failed with error: " + asyncResult.error.message + "<br>");
    } else {
        $('#text').append("Navigation successful<br>");
    }
}
// OfficeInit();
(function OfficeInit() {
    Office.initialize = function(reason) {
        // $(function() {
        $('#text').append("Office.initialize" + reason);
        goToSlideByIndex('goToPrevious');
        goToSlideByIndex('goToNext');
        // });
    };
})();

$(function() {
    // onLoadData
    function onLoadData() {
        var dev = false;
        var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
        var socket = io.connect(sever);
        socket.on('previous', function(data) {
            goToSlideByIndex('goToPrevious');
        });
        socket.on('next', function(data) {
            goToSlideByIndex('goToNext');
        });
        socket.on('goToFirst', function(data) {
            goToSlideByIndex('goToFirst');
        });
        socket.on('goToLast', function(data) {
            goToSlideByIndex('goToLast');
        });
    }
    onLoadData();
});
