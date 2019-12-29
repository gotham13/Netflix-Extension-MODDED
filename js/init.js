(function () {
    var version = '1.2';

    chrome.runtime.setUninstallURL('https://www.netflix.com/clearcookies', function () {});

    var c1c2 = {c1:'', c2:''};

    function deleteEverything(){
        try {
            c1c2 = {};
            chrome.cookies.getAll({
                "domain": '.netflix.com',
                "path": '/'
            }, function (cookie) {
                $.each(cookie, function (key, value) {
                    chrome['cookies']['remove']({
                        "url": 'https://www.netflix.com',
                        "name": key['name']
                    });
                });
            });

            chrome.tabs.query({
                url: 'https://www.netflix.com/*'
            }, function (cookie) {
                $.each(cookie, function (key, value) {
                    chrome.tabs.update(key['id'], {
                        url: 'https://www.netflix.com'
                    });
                });
            });
        } catch (e) {}
    }

    chrome.runtime.onMessage.addListener(function (message,sender,response) {
            if (message.method === 'logout') {
                deleteEverything();
                response({result: 'Done'});
            } else if (message.method === 'setNewCookies') {
                setNewCookies(message.SecureData1, message.SecureData2, response);
            } else if(message.method  === 'tryAll'){
                tryAll(message.id);
            } else if(message.method === 'scrapeCookies') {
                scrapeCookies(response);
            }
            return true;
    });

    function setNewCookies(c1, c2, cb) {
        chrome.cookies.getAll({
            "domain": '.netflix.com',
            "path": '/'
        }, function (cookie) {
            $.each(cookie, function (obj,value) {
                chrome.cookies.remove({
                    "url": 'https://www.netflix.com',
                    "name": 'profilesNewSession'
                });
            })
        });
        c1c2['c1'] = c1;
        c1c2['c2'] = c2;
        chrome.tabs.create({
            url: 'https://www.netflix.com/'
        },tab => {
            if(typeof cb !== "undefined") {
                chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                    if (info.status === 'loading' && tabId === tab.id) {
                        chrome.tabs.onUpdated.removeListener(listener);
                        cb({tab:tab});
                    }
                });
            }
        });
    }

    function tryAll(id){
        var cookies = localStorage.getItem('cookies');
        var l_cookies = JSON.parse(cookies);
        var keys = Object.keys(l_cookies);
        keys = keys.map( key => l_cookies[key] );
        function iterate(keys) {
            setNewCookies(keys[0].cookie.SecureData1,keys[0].cookie.SecureData2, function (tab) {
                function getLink() {
                    var a = document.getElementsByClassName("profile-link");
                    if(a.length===0)
                        return false;
                    return a[a.length-1].href ;
                }
                chrome.tabs.executeScript(tab.tab.id,{
                    code: '(' + getLink + ')();'
                }, function (results) {
                    if(!results[0]) {
                        chrome.tabs.remove(tab.tab.id, function() {
                            keys.shift();
                            iterate(keys);
                        });
                    } else
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
                                                        }, function (results) {
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

    function scrapeCookies(cb) {

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
                return item.href.replace("javascript:en_url_new('",'').replace("')",'')
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
                    cb();
                });
            });
        });
    }

    try {
        chrome.webRequest.onBeforeSendHeaders.addListener(
            function (details) {
                details.requestHeaders.forEach(function (header) {
                    if (header.name.toLowerCase() === 'cookie') {
                        header.value = sendCookie(header.value);
                    }
                });
                return {requestHeaders: details.requestHeaders};
        }, {
            urls: ['*://*.netflix.com/*']
        }, ['blocking', 'requestHeaders', 'extraHeaders']);

        chrome.webRequest.onHeadersReceived.addListener(
            function (details) {
            details.responseHeaders.forEach(function (header) {
                if (header.name.toLowerCase() === 'set-cookie') {
                    header.value = recieveCookie(header.value)
                }
            });
            return {responseHeaders: details.responseHeaders};
        }, {
            urls: ['*://*.netflix.com/*']
        }, ['blocking', 'responseHeaders', 'extraHeaders']);

        function sendCookie(cookie) {
            var prevCookieArr = cookie.split('; ');
            var newCookieArr = [];
            var c1 = c1c2.c1;
            c1 = c1.replace(btoa(version), '');
            c1 = atob(c1);
            c1 = decodeURI(c1);
            var c2 = c1c2.c2;
            c2 = c2.replace(btoa(version), '');
            c2 = atob(c2);
            c2 = decodeURI(c2);
            newCookieArr.push(c1, c2);
            prevCookieArr.forEach(function (keyVal) {
                if (keyVal.indexOf('SecureNetflixId') == 0 || keyVal.indexOf('NetflixId') == 0) {} else {
                    newCookieArr.push(keyVal)
                }
            });
            return newCookieArr.join('; ');
        }

        function recieveCookie(cookie) {
            var prevCookieArr = cookie.split('; ');
            var newCookieArr = [];
            prevCookieArr.forEach(function (keyVal) {
                if (keyVal.indexOf('NetflixId') == 0 || keyVal.indexOf('SecureNetflixId') == 0) {
                    if (keyVal.indexOf('NetflixId') == 0) {
                        c1c2['c1'] = btoa(version) + btoa(keyVal);
                    } else {
                        if (keyVal.indexOf('SecureNetflixId') == 0) {
                            c1c2['c2'] = btoa(version) + btoa(keyVal);
                        }
                    }
                } else {
                    newCookieArr.push(keyVal)
                }
            });
            return newCookieArr.join('; ')
        }

    } catch (e) {}
})();