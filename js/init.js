(function () {
    var _0xf5c9x1 = '1.2';
    var _0xf5c9x2 = '1.2';
    var _0xf5c9x3 = '1.2';
    var _0xf5c9x4 = 'http://accountspool.com/';
    chrome['management']['getSelf'](function (_0xf5c9x5) {
        _0xf5c9x7(_0xf5c9x5['version']);
        _0xf5c9x21(_0xf5c9x5['version'])
    });
    chrome['runtime']['setUninstallURL']('https://www.netflix.com/clearcookies', function () {});
    //_0xf5c9x3e();
    //_0xf5c9x45();
    var _0xf5c9x6;
    function _0xf5c9x7(_0xf5c9x8) {
        _0xf5c9x1 = _0xf5c9x8;
        localStorage['extVersion'] = _0xf5c9x8
    }
    function _0xf5c9x9() {
        return _0xf5c9x1
    }
    function _0xf5c9xa(_0xf5c9x8) {
        _0xf5c9x2 = _0xf5c9x8;
        localStorage['latest_version'] = _0xf5c9x8
    }
    function _0xf5c9xb() {
        return _0xf5c9x2
    }
    var _0xf5c9xc = '';
    var _0xf5c9xd = '';
    function _0xf5c9xe() {
        var _0xf5c9xf = {
            "c1": _0xf5c9xc,
            "c2": _0xf5c9xd
        };
        return _0xf5c9xf
    }
    function _0xf5c9x10(_0xf5c9x11) {
        _0xf5c9xc = _0xf5c9x11
    }
    function _0xf5c9x12(_0xf5c9x13) {
        _0xf5c9xd = _0xf5c9x13
    }
    var _0xf5c9x14 = '';
    function _0xf5c9x15(_0xf5c9xf) {
        _0xf5c9x14 = _0xf5c9xf
    }
    function _0xf5c9x16() {
        return _0xf5c9x14
    }
    var _0xf5c9x17 = '';
    function _0xf5c9x18(_0xf5c9xf) {
        _0xf5c9x17 = _0xf5c9xf
    }
    function _0xf5c9x19() {
        return _0xf5c9x17
    }
    var _0xf5c9x1a = '';
    function _0xf5c9x1b(_0xf5c9xf) {
        _0xf5c9x1a = _0xf5c9xf
    }
    function _0xf5c9x1c() {
        return _0xf5c9x1a
    }
    var _0xf5c9x1d = 'false';
    function _0xf5c9x1e(_0xf5c9xf) {
        _0xf5c9x1d = _0xf5c9xf
    }
    function _0xf5c9x1f() {
        return _0xf5c9x1d
    }
    function _0xf5c9x20() {
        return _0xf5c9x3
    }
    function _0xf5c9x21(_0xf5c9xf) {
        _0xf5c9x3 = _0xf5c9xf
    }
    var _0xf5c9x22 = '';
    function _0xf5c9x23() {
        return _0xf5c9x22
    }
    function _0xf5c9x24(_0xf5c9xf) {
        _0xf5c9x22 = _0xf5c9xf
    }
    var _0xf5c9x25;
    function _0xf5c9x26() {
        return _0xf5c9x25
    }
    function _0xf5c9x27(_0xf5c9xf) {
        _0xf5c9x25 = _0xf5c9xf
    }
    chrome['runtime']['onMessage']['addListener'](function (_0xf5c9x28, _0xf5c9x29, _0xf5c9x2a) {
        if (_0xf5c9x28['method'] == 'logout') {
            delete_everything();
            _0xf5c9x2a({
                result: 'Done'
            })
        } else {
            if (_0xf5c9x28['method'] == 'getProxyStatus') {
                _0xf5c9x2a({
                    proxyStatus: 'false'
                })
            } else {
                if (_0xf5c9x28['method'] == 'setNewCookies') {
                    set_new_cookies(_0xf5c9x28.SecureData1, _0xf5c9x28.SecureData2, _0xf5c9x28.SecureData4);
                    _0xf5c9x2a({
                        result: 'Done'
                    })
                } else {
                    if (_0xf5c9x28['method'] == 'checkVersion') {
                        chrome['management']['getSelf'](function (_0xf5c9x5) {
                            _0xf5c9x7(_0xf5c9x5['version']);
                            _0xf5c9x21(_0xf5c9x5['version'])
                        });
                        _0xf5c9x2a({
                            result: 'Done'
                        })
                    }
                }
            }
        };
        return true
    });
    function set_new_cookies(_0xf5c9x2c, _0xf5c9x2d, _0xf5c9x14) {
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
            })
        } else {}
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
        url = _0xf5c9x35['url'];
        if (_0xf5c9x23() == url) {
            if (Date['now']() - _0xf5c9x26() > 5 * 60 * 1000) {
               // _0xf5c9x3a(url)
            } else {}
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
        var _0xf5c9x36 = _0xf5c9x33[0]['id'];
        chrome['tabs']['onUpdated']['addListener'](function (_0xf5c9x36, _0xf5c9x37, _0xf5c9x34) {
            var _0xf5c9x38 = _0xf5c9x34['url'];
            var _0xf5c9x39 = new RegExp('(?:.*)://(?:.*).netflix.com/watch/(?:.*)');
            if (_0xf5c9x39['test'](_0xf5c9x38)) {
                if (_0xf5c9x23() == _0xf5c9x38) {
                    if (Date['now']() - _0xf5c9x26() > 5 * 60 * 1000) {
                        //_0xf5c9x3a(_0xf5c9x38)
                    } else {}
                } else {
                    _0xf5c9x3a(_0xf5c9x38)
                }
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
    } catch (e) {};
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
    chrome['webRequest']['onBeforeRequest']['addListener'](function (_0xf5c9x35) {
        t_url = _0xf5c9x35['url'];
        if (t_url['indexOf']('api') != -1) {} else {
            if (_0xf5c9x35['url'] == _0xf5c9x35['url']['toLowerCase']()) {} else {
                return {
                    redirectUrl: _0xf5c9x35['url']['toLowerCase']()
                }
            }
        }
    }, {
        urls: ['*://*.netflix.com/*']
    }, ['blocking']);
    chrome['webRequest']['onBeforeRequest']['addListener'](function () {
        return {
            redirectUrl: 'https://www.netflix.com'
        }
    }, {
        urls: ['https://help.netflix.com/*', 'https://www.netflix.com/managedevices*', 'https://www.netflix.com/signout*', 'https://www.netflix.com/logout*', 'https://www.netflix.com/youraccount*', 'https://www.netflix.com/cancelplan*', 'https://www.netflix.com/youraccountpayment*', 'https://www.netflix.com/billingactivity*', 'https://www.netflix.com/changeplan*', 'https://www.netflix.com/simplemember/editcredit*', 'https://www.netflix.com/simplemember/accountpayment*', 'https://www.netflix.com/manageprofiles*', 'https://www.netflix.com/profiles/manage*', 'https://www.netflix.com/languagepreferences*']
    }, ['blocking'])
})()