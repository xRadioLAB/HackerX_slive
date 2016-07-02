/**
 * @file   js/index.js
 * @author St. <st_sister@icloud.com>
 * @time   2015-12-16-13.37
 *         2015-01-04-09.55
 *         2015-02-07-16.34
 *         2016-04-12-16.12 add device
 *         2016-06-03-10.49 update
 */

var $mainContainer = $('#mainContainer'); // 主容器
var $caseContainer = $('#caseContainer'); // 项目容器
var $prev = $caseContainer.find('.swiper-button-prev'); // 项目容器上一桢按钮
var $next = $caseContainer.find('.swiper-button-next'); // 项目容器下一桢按钮
var $casePagination = $('#casePagination'); // 项目分页容器

//jq浏览器版本判断插件
var device = {
    $html: $('#device'),
    $p6: $('#superwoods_businessCard'),
    $p7: $('#superwoods_businessCard_en'),
    // $myWechat: $('#myWechat'),
    // $p8: $('#sectionContent'),
    UA: navigator.userAgent.toLowerCase(),
    location: window.location,
    // userAgent: function() {
    //     // console.log('u: ', navigator.userAgent.toLowerCase());
    //     return navigator.userAgent.toLowerCase();
    // },
    html: function(p) {
        var _this = this;
        if (p) {
            if (p === 'web' || p === 'pad') {
                _this.$html.removeClass()
                _this.$html.addClass('pc');
                // 如果是pc和pad移除p7
                // var $p8 = $('#sectionContent');
                _this.$p6.append(_this.$p7.html()).addClass('hasP7Img');
                _this.$p6.find('img:last').attr('id', '7'); // 如果为pc 那么将data-hash="7" 直接指向第二张被复制的img，使用id="7"
                _this.$p7.remove();
                // _this.$p8.attr('data-hash', 'p7');
                // $p8.attr('data-hash', 'p7');

                $prev.show();
                $next.show();




            } else {
                _this.$html.removeClass();
                _this.$html.addClass('mobile');
                $('.hasP7Img').removeClass('hasP7Img');


                $prev.hide();
                $next.hide();
            }
        }

        if (!_this.$myWechat) {
            _this.$myWechat = $('#myWechat');
            _this.bodyHeight = $('body').height();
        }

        _this.$myWechat
            .find('.wechatImg')
            .css({
                'height': Math.round(_this.bodyHeight * 0.6),
                'width': 'auto'
                // 'display': 'block',
                // 'margin': '0 auto'
            });


        // console.log('p: ', p);
        // console.log('html ', $html.attr('class'));
        // alert(p);
    },
    set: function() {
        var _this = this;
        // var userAgent = this.userAgent();
        // var location = window.location;
        var type = 'web';
        // console.log(userAgent);
        // alert(u)
        if (_this.UA === null || _this.UA === '' || (_this.location.href.indexOf('f=pad') !== -1)) {
            // p = 'web';
            // this.html(p);
        } else {
            // this.html(p);
            if (_this.UA.indexOf('mi pad') !== -1 || _this.UA.indexOf('xiaomi/miuibrowser') !== -1 || _this.UA.indexOf('ipad') !== -1) {
                type = 'pad';
                // console.log(p);
                // this.html(p);
            } else {
                if (_this.UA.match(/iphone/i) || _this.UA.match(/iphone os/i) || _this.UA.match(/android/i) || _this.UA.match(/windows mobile/i) || _this.UA.match(/ucweb/i)) {
                    type = 'phone';
                    //  _this.location.href = m;
                    // this.html(p);

                } else {
                    if (_this.UA.indexOf('gecko') > -1 && _this.UA.indexOf('khtml') === -1 && _this.UA.indexOf('firefox') === -1 && _this.UA.indexOf('11.0') === -1) {
                        type = 'other mobile';
                        //  _this.location.href = m;
                        // this.html(p);
                        // $prev.hide();
                        // $next.hide();
                    }
                }
            }
        }
        // console.log(type);
        _this.html(type);
    }
};

var caseSwiper;

function mainRender() {
    var $caseRender = $('#caseRender');
    var caseData = [{
            url: null, //cases
            title: '',
            device: '',
            compatibility: '',
            others: '<div class="cases">' +
                '<div>项目展示</div>' +
                '<div class="tip"></div>' +
                '<div class="tip2"></div>' +
                '<div class="tip3Box">' +
                '<div class="tip3">' +
                '<div class="iconBlueArrowUp"></div>' +
                '<div class="iconBlueArrowUp iconBlueArrowUp2"></div>' +
                '</div>' +
                '</div>' +
                '</div>'
        }, {
            url: 'https://github.com/xinhuaRadioLAB',
            pic: 'img/xinhuaRadioLabs.tinySq280.png',
            title: '新华网创意设计实验室 <br> 新华广播实验室',
            device: null,
            compatibility: null,
            others: '<p><span>新华通讯社 新华网股份有限公司</span></p>'
        }, {
            url: 'http://superfec.github.io',
            pic: 'img/superfec.jpg',
            title: '木木前端教室',
            device: null,
            compatibility: null,
            others: '<p><span>hype3课程和前端开发个人经验分享</span></p>'
        }, {
            url: 'http://wwlocation.xinhuanet.com/fortune/wap.htm',
            pic: 'img/mcp.jpg',
            title: '新华财经',
            device: 'Mobile',
            compatibility: 'webkit',
            others: '<p><span>依赖xinhuanetMCP系统</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/video/xinhuaradio/',
            pic: 'img/xinhuaradio.jpg',
            title: '新华广播',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            others: '<p><span>RIA（富互联网应用）</span></p>'
        }, {
            url: 'http://www.xinhuanet.com/politics/kzsl70/ybzbsj/index.htm',
            pic: 'img/93.jpg',
            title: '新华全媒直播胜利日大阅兵<br>(9.3阅兵)',
            device: 'PC + Mobile',
            compatibility: 'webkit, IE8+',
            others: null
        }, {
            url: 'case/demo20/index.html',
            title: '伦敦生活方式',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo11/index.html',
            title: 'VOGUE MINI',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        },
        /*, {
                    url: 'case/demo19/index.html',
                    title:  'GQ 年度人物2015',
                    device: 'Mobile',
                    compatibility: 'webkit',
                    others: null
                }*/
        {
            url: 'case/demo18/index.html',
            title: 'It Bag',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo17/index.html',
            title: '银网',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo16/index.html',
            title: '男装周2016SS',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo15/index.html',
            title: '时髦一夏2016',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo14/index.html',
            title: '读者之选',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }, {
            url: 'case/demo13/index.html',
            title: '蜜月婚礼',
            device: 'PC',
            compatibility: 'IE6+ , 主流',
            others: null
        }, {
            url: 'case/demo12/index.html',
            title: 'HOW GQ RU',
            device: 'Mobile',
            compatibility: 'webkit',
            others: null
        }
    ];

    var arrayLen = caseData.length;

    // console.log(arrayLen);

    var tmp = '';
    for (var i = 0, j = arrayLen; i < j; i++) {
        //    <div class="swiper-slide">
        //        <a href="case/demo20/index.html" title="专题(伦敦生活方式)"><img src="case/demo20/view.png" alt="" /></a>
        //        <h3>专题(伦敦生活方式)</h3>
        //        <p>设备：
        //            <span>
        //                Mobile
        //            </span>
        //        </p>
        //        <p>兼容：
        //            <span>
        //                webkit
        //            </span>
        //        </p>
        //    </div>
        var array = caseData[i];
        //var n;
        //         if (i<9) {
        //             n = '0' + (i + 1);
        //         }
        //         else {
        //             n = i + 1;
        //         }

        var url = array.url;
        var pic;
        var title;
        var device;
        var compatibility;
        var others = array.others === null ? '' : array.others;
        var newUrl;

        if (url !== null) {

            //console.log(array.pic=== undefined );

            if (array.pic === undefined) {
                pic = url.replace('index.html', 'view.jpg');
            } else {
                pic = array.pic;
            }



            var cons = url.indexOf('case/demo') === 0;

            if (cons) {
                newUrl = 'http://www.dyliang.com/' + url;
                url = newUrl;
            }

            //console.log(url);

            title = array.title;

            if (array.device === null) {
                device = '';
            } else {
                device = '<p>设备：<span>' +
                    array.device +
                    '</span></p>';
            }

            if (array.compatibility === null) {
                compatibility = '';
            } else {
                compatibility = '<p>兼容：<span>' +
                    array.compatibility +
                    '</span></p>';
            }


            // url: 'http://superfec.github.io',
            // pic: 'img/superfec.jpg',
            // title: '木木前端教室',
            // device: null,
            // compatibility: null,
            // others: '<p><span>hype3和一些前端开发个人经验汇总</span></p>'





            tmp += '<div class="swiper-slide">' +
                //'<a href="' + url + '" title="' + title + '" target="_blank">' +
                '<a href="' + url + '" title="' + title + '">' +
                '<img src="' + pic + '" alt="' + title + '" /></a>' +
                '<h3>' + title + '</h3>' +
                device +
                compatibility +
                others +
                //'   </a>' +
                '</div>';
        } else {
            tmp += '<div class="swiper-slide">' +
                '<div class=boxIn>' +
                others +
                '</div>' +
                '</div>';
        }


    }

    $caseRender[0].innerHTML = tmp;

    //var swiper = new Swiper('.swiper-container', {
    //        pagination: '.swiper-pagination',
    //        nextButton: '.swiper-button-next',
    //        prevButton: '.swiper-button-prev',
    //        slidesPerView: 1,
    //        paginationClickable: true,
    //        spaceBetween: 30,
    //        loop: true
    //    });

    caseSwiper = new Swiper($caseContainer.selector, {
        pagination: $casePagination.selector,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        // effect: 'coverflow',
        // coverflow: {
        //     rotate: 50,
        //     stretch: 0,
        //     depth: 100,
        //     modifier: 1,
        //     slideShadows: true
        // },
        //hashnav: true
        //paginationClickable: true,
        loop: true,
        spaceBetween: 50,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        paginationType: 'bullets'
            // paginationCustomRender: function (swiper, current, total) {
            //     return current + ' / ' + total;
            // }
    });


    // $casePagination
    //     .prepend('<div class="swiper-button-prev"></div>')
    //     .append('<div class="swiper-button-next"></div>');

    // $('.btnNext').click(function() {
    //     caseSwiper.slideNext();
    // });
};

// // echarts init
// var myChart = echarts.init(document.getElementById('main'));
// var option = {
//     title: {
//         text: '分布视图',
//         subtext: '2015/12'
//     },
//     tooltip: {
//         trigger: 'axis'
//     },
//     legend: {
//         orient: 'vertical',
//         x: 'right',
//         y: 'bottom',
//         data: ['预估占比（％）']
//     },
//     toolbox: {
//         show: false,
//         feature: {
//             mark: {
//                 show: true
//             },
//             dataView: {
//                 show: true,
//                 readOnly: false
//             },
//             restore: {
//                 show: true
//             },
//             saveAsImage: {
//                 show: true
//             }
//         }
//     },
//     polar: [{
//         indicator: [{
//             text: 'JavaSrcipt ／ jQuery',
//             max: 100
//         }, {
//             text: '表现层',
//             max: 100
//         }, {
//             text: '设计',
//             max: 100
//         }, {
//             text: '需求',
//             max: 100
//         }, {
//             text: '交互',
//             max: 100
//         }, {
//             text: '后端',
//             max: 100
//         }, {
//             text: '服务器',
//             max: 100
//         }]
//     }],
//     calculable: true,
//     series: [{
//         name: '',
//         type: 'radar',
//         data: [{
//             value: [85, 90, 90, 80, 85, 40, 55],
//             name: '预估占比（％）'
//         }]
//     }]
// };

function set_data_hash() {
    var li = $mainContainer.find('.data-hash');
    // console.log(li);
    for (var i = 0, j = li.length; i < j; i++) {
        li.eq(i).attr('data-hash', i + 1);
        // console.log(li.eq(i));
    }
}

$(function() {
    set_data_hash();
    // 初始化设备识别模块
    device.set();
    // console.log($mainContainer);
    // 初始化swiper
    var swiper = new Swiper($mainContainer.selector, {
        pagination: '.mainPagination',
        paginationType: 'bullets',
        direction: 'vertical',
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 30,
        mousewheelControl: true,
        hashnav: true,

    });
    // 渲染项目
    mainRender();
    // 初始化echats
    // myChart.setOption(option);
});
