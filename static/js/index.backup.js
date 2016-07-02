// @St. 2016-07-02-17.41
"use strict";
var $app = $("#app");
var $text = $("#text");
var option = [{
    name: "悦悦",
    vote: 0
}, {
    name: "小郝",
    vote: 0
}, {
    name: "John",
    vote: 0
}, {
    name: "LVC",
    vote: 0
}, {
    name: "木木",
    vote: 0
}];

// onLoadData
function onLoadData() {
    var dev = false;
    var sever = dev ? 'http://127.0.0.1:5000/socket/' : 'http://123.206.42.148:5000/socket/';
    var socket = io.connect(sever);
    socket.on('slack', function(data) {
        if (data.name === option[0].name) {
            $('.name_0').text(option[0].vote += 1);
        }
        if (data.name === option[1].name) {
            $('.name_1').text(option[1].vote += 1);
        }
        if (data.name === option[2].name) {
            $('.name_2').text(option[2].vote += 1);
        }
        if (data.name === option[3].name) {
            $('.name_3').text(option[3].vote += 1);
        }
        if (data.name === option[4].name) {
            $('.name_4').text(option[4].vote += 1);
        }
    });
}

function renderDOM() {
    var DOM = '';
    for (var i = 0; i < option.length; i++) {
        DOM += '<div class="line">' + option[i].name + ': <span class="name_' + i + '">' + option[i].vote + '</span></div>';
    }
    $app.html(DOM);
}

$(function() {
    renderDOM();
    onLoadData();
});
