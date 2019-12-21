
function load_and_display() {
    var cookies = localStorage.getItem('cookies');
    var loaded_cookies = JSON.parse(cookies);
    var table = `<h3 style="font-size: 36px">Click To Select Cookie</h3>
<div id="tbscrl"><table class="table table-hover" style="max-height: 200px;overflow-y: auto;" id="myTable">
<tbody>`;
    var i=1;
    for (var cookie in loaded_cookies) {
        table = table + `
            <tr>
            <td>${i}</td>
            <td>${cookie}</td>
            </tr>
            `;
        i = i+1;
    }
    table = table + `</tbody></table></div>`;
    $('div[class="container logo-container"]').html(table);

    $('#myTable tbody tr').click(function() {
        $(this).addClass('bg-success').siblings().removeClass('bg-success');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if(localStorage.getItem('cookies') === null) {
        getCookies();
    } else {
       load_and_display();
    }

    chrome.runtime.sendMessage({
        method: "checkVersion"
    }, function (_0x409ax1) {});
    if (localStorage.extVersion < localStorage.latest_version) {
        showError("Please Update the extension : https://accountspool.com")
    } else {
        $("#refresh_cookies").click(function () {
            getCookies();
        });

        $("#use-cookie").click(function () {
            pickUpCookieFromPage()
        });

        $("#logout").click(function () {
            try {
                chrome.runtime.sendMessage({
                    method: "logout"
                }, function (_0x409ax1) {})
            } catch (e) {
                showError("Some Error has Occured!!")
            }
        });


        $('#check').click(function () {
            try_all($("#cid").val());
        });
    }
});

function getCookies() {

    $('div[class="container logo-container"]').html(
        `<div class="spinner-border" role="status">
								<span >Loading...</span>
							</div>
							<div>Fetching cookies please wait..</div>`
    );

    chrome.runtime.sendMessage({
        msg: "scrape_cookies"
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.msg === "cookies_scraped") {
            load_and_display();
        }
    }
);



function pickUpCookieFromPage() {
    var tr = $('tr.bg-success').get();
    var cookie_name = tr[0].children[1].innerText;
    var cookies = localStorage.getItem('cookies');
    var loaded_cookies = JSON.parse(cookies);
    verifyAndSetCookie(loaded_cookies[cookie_name]);
}

function verifyAndSetCookie(_0x409ax6,cb) {
    try {
        var _0x409ax4 = _0x409ax6.cookie;
        if (_0x409ax4.SecureData1 != undefined && _0x409ax4.SecureData2 != undefined && _0x409ax4.SecureData3 != undefined && _0x409ax4.SecureData4 != undefined) {
            var _0x409ax7 = _0x409ax4.SecureData1;
            var _0x409ax8 = _0x409ax4.SecureData2;
            var _0x409axa = _0x409ax4.SecureData4;
                chrome.runtime.sendMessage({
                    method: "setNewCookies",
                    "SecureData1": _0x409ax7,
                    "SecureData2": _0x409ax8,
                    "SecureData4": _0x409axa
                }, function (_0x409ax1) {
                    if(typeof cb!=="undefined")
                    cb(_0x409ax1);
                })
        } else {
            showError("Not a valid cookie")
        }
    } catch (e) {
        showError("Not a valid cookie")
    }
}

function try_all(id) {

    var cookies = localStorage.getItem('cookies');
    var l_cookies = JSON.parse(cookies);
    var keys = Object.keys(l_cookies);
    keys = keys.map(key=>l_cookies[key]);

    function iterate(keys) {
        verifyAndSetCookie(keys[0],(tab)=>{
            function getLink() {
                var a = document.getElementsByClassName("profile-link");
                return a[a.length-1].href ;
            }

            chrome.tabs.executeScript(tab.tab.id,{
                code: '(' + getLink + ')();'
            }, (results) => {
                chrome.tabs.update(tab.tab.id, {url: results[0]},function (kk) {
                    chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                        if (info.status === 'complete' && tabId === tab.tab.id) {
                            chrome.tabs.onUpdated.removeListener(listener);
                            chrome.tabs.update(tab.tab.id, {url: "https://www.netflix.com/watch/"+id},function (kk) {
                                chrome.tabs.onUpdated.addListener(function listener (tabId, info) {
                                    if (info.status === 'complete' && tabId === tab.tab.id) {
                                        chrome.tabs.onUpdated.removeListener(listener);

                                        function checker(trial) {
                                            function check() {
                                                var a = document.getElementsByClassName("information");
                                                return a.length>0 ;
                                            }
                                            if(trial>0) {
                                                chrome.tabs.executeScript(tab.tab.id,{
                                                    code: '(' + check + ')();'
                                                }, (results) => {
                                                    if(results[0]) {
                                                        chrome.tabs.remove(tab.tab.id, function() {
                                                            keys.shift();
                                                            iterate(keys);
                                                        });
                                                    } else {
                                                        trial--;
                                                        setTimeout(function () {
                                                            checker(trial);
                                                        }, 15000);
                                                    }
                                                });
                                            }
                                        }
                                        checker(5);

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

function showError(_0x409ax16) {
    console.log(_0x409ax16);
}