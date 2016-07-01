/**
 * Copyright (c) Xinhuanet Inc. All rights reserved.
 *
 * @project Xinhua News Agency Homepage 2016
 * @file    lib/jquery.browser.js
 * @author  St. <st_sister@icloud.com>
 * @times   2016-06-17-16.35
 */

// jQuery 浏览器兼容模块
jQuery.browser =
    // {
    // UA: function() {
    //     return navigator.userAgent.toLowerCase();
    // },
    // version: (UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
    // msie: /msie/.test(UA) && !/opera/.test(UA),
    // safari: /webkit/.test(UA),
    // opera: /opera/.test(UA),
    // msie11: /trident/.test(UA),
    // mozilla: /mozilla/.test(UA) && !/(compatible|webkit)/.test(UA),
    // ieVersion: function(){
    //     var UA = this.UA();
    //     if (/msie/.test(UA) && !/opera/.test(UA)) {
    //         return ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]);
    //     }
    // },
    // iPad: function($html, UA) {
    //     if (!UA) {
    //         UA = this.UA();
    //     }
    //     var isIPad = UA.indexOf('ipad') > 0;
    //     if (!$html) {
    //         $html = $('html');
    //     }
    //     if (isIPad) {
    //         $html.addClass('iPad');
    //     } else {
    //         $html.removeClass('iPad');
    //     }
    //     return isIPad;
    // },
    // ie8: function(UA) {
    //     if (!UA) {
    //         UA = this.UA();
    //     }
    //     return (/msie/.test(UA) && !/opera/.test(UA) && ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]) < 9.0);
    // },
    function(options) {
        var $html, UA;
        if (!options.tag) {
            $html = $('html');
        } else {
            $html = options.tag;
        }
        // 声明 UA
        if (!options.UA) {
            UA = navigator.userAgent.toLowerCase();
        } else {
            UA = options.UA;
        }

        // 浏览器识别
        var browser;
        var opera = UA.indexOf('opera') > 0;
        var trident = UA.indexOf('trident') > 0;
        var chrome = UA.indexOf('chrome') > 0;
        var safari = UA.indexOf('safari') > 0;
        var msie = UA.indexOf('msie') > 0;
        var version = ((UA.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1]);
        var ie8 = (msie && !opera && version < 9.0);

        // 是否为 ie
        if (msie && !opera) {
            $html.addClass('ie');
            // 是否为低版本ie
            if (ie8) {
                $html.addClass('oldie');
                $html.removeClass('ie11');
                browser = 'oldie';
            } else {
                $html.removeClass('oldie');
            }
            browser = 'ie';
        } else {
            $html.removeClass('ie');
        }

        // 是否为 ie11 (ie11删除了UA中的msie )
        if (trident && !msie) {
            $html.addClass('ie ie11');
            browser = 'ie11';
        } else {
            $html.removeClass('ie11');
        }

        // 是否为 chrome
        if (chrome) {
            $html.addClass('chrome');
            browser = 'chrome';
        } else {
            $html.removeClass('chrome');
        }

        // 是否为 safari
        if (safari && !chrome) {
            $html.addClass('safari');
            browser = 'safari';
        } else {
            $html.removeClass('safari');
        }

        // 设备
        var device;
        var ipad = UA.indexOf('ipad') > 0;
        var iphone = UA.indexOf('iphone') > 0;
        var macintosh = UA.indexOf('macintosh') > 0;
        var windows = UA.indexOf('windows') > 0;

        if (ipad) {
            $html.addClass('ipad');
            device = 'ipad';
        } else {
            $html.removeClass('ipad');
        }

        if (iphone) {
            $html.addClass('iphone');
            device = 'iphone';
        } else {
            $html.removeClass('iphone');
        }

        if (macintosh) {
            $html.addClass('mac');
            device = 'mac';
        } else {
            $html.removeClass('mac');
        }

        if (windows) {
            $html.addClass('windows');
            device = 'windows';
        } else {
            $html.removeClass('windows');
        }

        var obj = {
            browser: browser,
            version: version,
            device: device
            // UA: navigator
        }

        return obj;
    }
    // };
