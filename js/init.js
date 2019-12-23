(function () {
    var _0xf5c9x1 = '1.2';
    var _0xf5c9x2 = '1.2';
    var _0xf5c9x3 = '1.2';
    chrome['management']['getSelf'](function (_0xf5c9x5) {
        _0xf5c9x7(_0xf5c9x5['version']);
        _0xf5c9x21(_0xf5c9x5['version']);
    });
    chrome['runtime']['setUninstallURL']('https://www.netflix.com/clearcookies', function () {});

    function _0xf5c9x7(_0xf5c9x8) {
        _0xf5c9x1 = _0xf5c9x8;
        localStorage['extVersion'] = _0xf5c9x8;
    }
    function _0xf5c9x9() {
        return _0xf5c9x1;
    }

    function _0xf5c9xb() {
        return _0xf5c9x2;
    }
    var _0xf5c9xc = '';
    var _0xf5c9xd = '';
    function _0xf5c9xe() {
        var _0xf5c9xf = {
            "c1": _0xf5c9xc,
            "c2": _0xf5c9xd
        };
        return _0xf5c9xf;
    }
    function _0xf5c9x10(_0xf5c9x11) {
        _0xf5c9xc = _0xf5c9x11;
    }
    function _0xf5c9x12(_0xf5c9x13) {
        _0xf5c9xd = _0xf5c9x13;
    }
    var _0xf5c9x14 = '';
    function _0xf5c9x15(_0xf5c9xf) {
        _0xf5c9x14 = _0xf5c9xf;
    }
    var _0xf5c9x1d = 'false';
    function _0xf5c9x1f() {
        return _0xf5c9x1d;
    }
    function _0xf5c9x20() {
        return _0xf5c9x3;
    }
    function _0xf5c9x21(_0xf5c9xf) {
        _0xf5c9x3 = _0xf5c9xf;
    }
    var _0xf5c9x22 = '';
    function _0xf5c9x23() {
        return _0xf5c9x22;
    }
    function _0xf5c9x24(_0xf5c9xf) {
        _0xf5c9x22 = _0xf5c9xf;
    }
    var _0xf5c9x25;
    function _0xf5c9x26() {
        return _0xf5c9x25;
    }
    function _0xf5c9x27(_0xf5c9xf) {
        _0xf5c9x25 = _0xf5c9xf;
    }

    chrome['runtime']['onMessage']['addListener'](function (_0xf5c9x28, _0xf5c9x29, _0xf5c9x2a) {
        if (_0xf5c9x28['method'] == 'logout') {
            delete_everything();
            _0xf5c9x2a({
                result: 'Done'
            });
        } else {
            if (_0xf5c9x28['method'] == 'getProxyStatus') {
                _0xf5c9x2a({
                    proxyStatus: 'false'
                });
            } else {
                if (_0xf5c9x28['method'] == 'setNewCookies') {
                    set_new_cookies(_0xf5c9x28.SecureData1, _0xf5c9x28.SecureData2, _0xf5c9x28.SecureData4,
                        _0xf5c9x2a);
                } else if(_0xf5c9x28['method']  == 'tryAll'){
                    try_all(_0xf5c9x28.id);
                } else {
                    if (_0xf5c9x28['method'] == 'checkVersion') {
                        chrome['management']['getSelf'](function (_0xf5c9x5) {
                            _0xf5c9x7(_0xf5c9x5['version']);
                            _0xf5c9x21(_0xf5c9x5['version']);
                        });
                        _0xf5c9x2a({
                            result: 'Done'
                        });
                    }
                }
            }
        };
        return true
    });

    function set_new_cookies(_0xf5c9x2c, _0xf5c9x2d, _0xf5c9x14, cb) {
        if (_0xf5c9x1f() == 'false') {
            chrome['cookies']['getAll']({
                "domain": '.netflix.com',
                "path": '/'
            }, function (_0xf5c9x2e) {
                $['each'](_0xf5c9x2e, function (_0xf5c9x2f, _0xf5c9x30) {
                    chrome['cookies']['remove']({
                        "url": 'https://www.netflix.com',
                        "name": 'profilesNewSession'
                    })
                })
            });
            _0xf5c9x10(_0xf5c9x2c);
            _0xf5c9x12(_0xf5c9x2d);
            _0xf5c9x15(_0xf5c9x14);
            chrome['tabs']['create']({
                url: 'https://www.netflix.com/'
            },tab => {
                if(typeof cb!=="undefined") {
                    chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                        if (info.status === 'complete' && tabId === tab.id) {
                            chrome.tabs.onUpdated.removeListener(listener);
                            cb({
                                tab:tab
                            });
                        }
                    });
                }
            })
        } else {}
    }

    function try_all(id) {
        var cookies = localStorage.getItem('cookies');
        var l_cookies = JSON.parse(cookies);
        var keys = Object.keys(l_cookies);
        keys = keys.map(key=>l_cookies[key]);

        function iterate(keys) {
            set_new_cookies(keys[0].cookie.SecureData1,keys[0].cookie.SecureData2,keys[0].cookie.SecureData4,(tab)=>{
                console.log(tab);
                function getLink() {
                    var a = document.getElementsByClassName("profile-link");
                    return a[a.length-1].href ;
                }

                chrome.tabs.executeScript(tab.tab.id,{
                    code: '(' + getLink + ')();'
                }, (results) => {
                    console.log(results);
                    chrome.tabs.update(tab.tab.id, {url: results[0]},function (kk) {
                        chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                            if (info.status === 'loading' && tabId === tab.tab.id) {
                                chrome.tabs.onUpdated.removeListener(listener);
                                chrome.tabs.update(tab.tab.id, {url: "https://www.netflix.com/watch/"+id},function (kk) {
                                    chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                                        if (info.status === 'complete' && tabId === tab.tab.id) {
                                            chrome.tabs.onUpdated.removeListener(listener);

                                            var startT = new Date().getMilliseconds();
                                            function checker(trial) {

                                                function check() {
                                                    var a = document.getElementsByClassName("information");
                                                    return a.length>0 ;
                                                }

                                                var curT = new Date().getMilliseconds();
                                                if((curT - startT) < trial) {
                                                    chrome.tabs.executeScript(tab.tab.id,{
                                                        code: '(' + check + ')();'
                                                    }, (results) => {
                                                        if(results[0]) {
                                                            chrome.tabs.remove(tab.tab.id, function() {
                                                                keys.shift();
                                                                iterate(keys);
                                                            });
                                                        } else {
                                                            setTimeout(function () {
                                                                checker(trial);
                                                            },1000);
                                                        }
                                                    });
                                                }
                                            }
                                            checker(120000);
                                        }
                                    });
                                });
                            }
                        });
                    });
                });
            })
        }
        iterate(keys);
    }

    function delete_everything() {
        try {
            _0xf5c9x10('');
            _0xf5c9x12('');
            _0xf5c9x15('');
            chrome['cookies']['getAll']({
                "domain": '.netflix.com',
                "path": '/'
            }, function (_0xf5c9x2e) {
                $['each'](_0xf5c9x2e, function (_0xf5c9x2f, _0xf5c9x30) {
                    chrome['cookies']['remove']({
                        "url": 'https://www.netflix.com',
                        "name": _0xf5c9x30['name']
                    })
                })
            });
            chrome['tabs']['query']({
                url: 'https://www.netflix.com/*'
            }, function (_0xf5c9x33) {
                $['each'](_0xf5c9x33, function (_0xf5c9x2f, _0xf5c9x34) {
                    chrome['tabs']['update'](_0xf5c9x34['id'], {
                        url: 'https://www.netflix.com'
                    })
                })
            })
        } catch (e) {}
    }
    chrome['webRequest']['onBeforeSendHeaders']['addListener'](function (_0xf5c9x35) {
        chrome.extension.getBackgroundPage().console.log(_0xf5c9x35);
        url = _0xf5c9x35['url'];
        if (_0xf5c9x23() == url) {
        } else {
            _0xf5c9x3a(url)
        };
        return {
            requestHeaders: _0xf5c9x35['requestHeaders']
        }
    }, {
        urls: ['*://*.netflix.com/watch/*']
    }, ['blocking', 'requestHeaders', 'extraHeaders']);
    chrome['tabs']['query']({
        currentWindow: true,
        active: true
    }, function (_0xf5c9x33) {
        chrome['tabs']['onUpdated']['addListener'](function (_0xf5c9x36, _0xf5c9x37, _0xf5c9x34) {
            var _0xf5c9x38 = _0xf5c9x34['url'];
            var _0xf5c9x39 = new RegExp('(?:.*)://(?:.*).netflix.com/watch/(?:.*)');
            if (_0xf5c9x39['test'](_0xf5c9x38)) {
                    _0xf5c9x3a(_0xf5c9x38)
            }
        })
    });
    function _0xf5c9x3a(_0xf5c9x38) {
        _0xf5c9x24(_0xf5c9x38);
        _0xf5c9x27(Date['now']());
    }

    try {
        chrome['webRequest']['onBeforeSendHeaders']['addListener'](function (_0xf5c9x35) {
            var _0xf5c9x46 = _0xf5c9x9();
            var _0xf5c9x47 = _0xf5c9xb();
            if (_0xf5c9x46 < _0xf5c9x47) {} else {
                _0xf5c9x35['requestHeaders']['forEach'](function (_0xf5c9x48) {
                    if (_0xf5c9x48['name']['toLowerCase']() === 'cookie') {
                        _0xf5c9x48['value'] = _0xf5c9x4a(_0xf5c9x48['value'])
                    }
                });
                return {
                    requestHeaders: _0xf5c9x35['requestHeaders']
                }
            }
        }, {
            urls: ['*://*.netflix.com/*']
        }, ['blocking', 'requestHeaders', 'extraHeaders']);
        chrome['webRequest']['onHeadersReceived']['addListener'](function (_0xf5c9x35) {
            var _0xf5c9x46 = _0xf5c9x9();
            var _0xf5c9x47 = _0xf5c9xb();
            if (_0xf5c9x46 < _0xf5c9x47) {} else {
                _0xf5c9x35['responseHeaders']['forEach'](function (_0xf5c9x49) {
                    if (_0xf5c9x49['name']['toLowerCase']() === 'set-cookie') {
                        _0xf5c9x49['value'] = _0xf5c9x4f(_0xf5c9x49['value'])
                    }
                });
                return {
                    responseHeaders: _0xf5c9x35['responseHeaders']
                }
            }
        }, {
            urls: ['*://*.netflix.com/*']
        }, ['blocking', 'responseHeaders', 'extraHeaders'])
    } catch (e) {}
    function _0xf5c9x4a(_0xf5c9x4b) {
        var _0xf5c9x4c = _0xf5c9x4b['split']('; ');
        var _0xf5c9x4d = [];
        var _0xf5c9x3 = _0xf5c9x20();
        var _0xf5c9xf = _0xf5c9xe();
        var _0xf5c9xc = _0xf5c9xf['c1'];
        _0xf5c9xc = _0xf5c9xc['replace'](btoa(_0xf5c9x3), '');
        _0xf5c9xc = atob(_0xf5c9xc);
        _0xf5c9xc = decodeURI(_0xf5c9xc);
        var _0xf5c9xd = _0xf5c9xf['c2'];
        _0xf5c9xd = _0xf5c9xd['replace'](btoa(_0xf5c9x3), '');
        _0xf5c9xd = atob(_0xf5c9xd);
        _0xf5c9xd = decodeURI(_0xf5c9xd);
        _0xf5c9x4d['push'](_0xf5c9xc, _0xf5c9xd);
        _0xf5c9x4c['forEach'](function (_0xf5c9x4e) {
            if (_0xf5c9x4e['indexOf']('SecureNetflixId') == 0 || _0xf5c9x4e['indexOf']('NetflixId') == 0) {} else {
                _0xf5c9x4d['push'](_0xf5c9x4e)
            }
        });
        return _0xf5c9x4d['join']('; ')
    }
    function _0xf5c9x4f(_0xf5c9x4b) {
        var _0xf5c9x4c = _0xf5c9x4b['split']('; ');
        var _0xf5c9x4d = [];
        _0xf5c9x4c['forEach'](function (_0xf5c9x4e) {
            if (_0xf5c9x4e['indexOf']('NetflixId') == 0 || _0xf5c9x4e['indexOf']('SecureNetflixId') == 0) {
                if (_0xf5c9x4e['indexOf']('NetflixId') == 0) {
                    var _0xf5c9x3 = _0xf5c9x20();
                    cookie = btoa(_0xf5c9x3) + btoa(_0xf5c9x4e);
                    _0xf5c9x10(cookie)
                } else {
                    if (_0xf5c9x4e['indexOf']('SecureNetflixId') == 0) {
                        var _0xf5c9x3 = _0xf5c9x20();
                        cookie = btoa(_0xf5c9x3) + btoa(_0xf5c9x4e);
                        _0xf5c9x12(cookie)
                    }
                }
            } else {
                _0xf5c9x4d['push'](_0xf5c9x4e)
            }
        });
        return _0xf5c9x4d['join']('; ')
    }
})();

function scrapeCookies() {
    console.log("here");
    function en_url_new(url_key,type) {
        var ts = Math.round((new Date()).getTime() / 1000);
        ts = ts.toString();
        var ps1 = url_key.substr( 0, 2);
        var ps2 = url_key.substr( 2, 2);
        var ps3 = url_key.substr( 4, 2);
        var pt1 = ts.substr( 0, 3);
        var pt2 = ts.substr( 3, 3);
        var pt3 = ts.substr( 6, 3);
        var pt4 = ts.substr( -1);
        return data = pt3+ps1+pt2+ps2+pt4+type+ps3+pt1;
    }

    $.get('https://tecknity.com/free-netflix-account-cookies/', (response) => {
        var page = $(response);
        var all_a = page.find("a[class='maxbutton-19 maxbutton maxbutton-new-netflix-cookie goToCookien']").get();
        var ids = all_a.map((item) => {
            return item.pathname.replace("en_url_new('",'').replace("')",'')
        });
        var types = response.match(/var type = (.*?);/g);
        var urls = response.match(/var url = (.*?);/g);
        var type = types[1].replace('var type = \"','').replace('\";','');
        var url = urls[1].replace('var url = \'','').replace('\';','');
        var countries = ['US', 'KP'];
        var defs =[];

        for(id of ids) {
            defs.push($.post("https://tecknity.com" + url,
                {"data": en_url_new(id,type)},
                (response)=>{}));
        }

        if (typeof jQuery.when.all === 'undefined') {
            jQuery.when.all = function (deferreds) {
                return $.Deferred(function (def) {
                    $.when.apply(jQuery, deferreds).then(
                        function () {
                            def.resolveWith(this, [Array.prototype.slice.call(arguments)]);
                        },
                        function () {
                            def.rejectWith(this, [Array.prototype.slice.call(arguments)]);
                        });
                });
            }
        }

        $.when.all(defs).then(function (objects) {
            var cookie_reqs = [];
            for(var object of objects){
                if(object[1] === 'success') {
                    var data = object[0].match(/var data = (.*?);/g)[0]
                        .replace('var data = \"','')
                        .replace('\";','');
                    for (var country of countries) {
                        cookie_reqs.push($.post("https://tecknity.com/top-10-wordpress-hosting-services/",
                            {cc:btoa(country),data:data},
                            (response)=>{}));
                    }
                }
            }

            $.when.all(cookie_reqs).then(function (objects) {
                var cookies = {};
                for(object of objects) {
                    if(object[1] == 'success') {
                        var page = $(object[0]).find('div[id="cookie_container"]').get();
                        var cookie_json = JSON.parse(page[0].innerText);
                        var secure_data4 = cookie_json['cookie']['SecureData4'];
                        var acc_id = atob(secure_data4);
                        var cookie_name = acc_id.split('@')[0];
                        if (acc_id != 'nulled@thetechstuff.in') {
                            cookies[cookie_name] = cookie_json;
                        }
                    }
                }
                localStorage.setItem('cookies',JSON.stringify(cookies));
                chrome.runtime.sendMessage({
                    msg: "cookies_scraped"
                });

            });
        });
    });
}


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "scrape_cookies") {
            console.log("recieved");
            scrapeCookies();
        }
    }
);