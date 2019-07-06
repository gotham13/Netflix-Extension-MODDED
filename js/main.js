document.addEventListener("DOMContentLoaded", function () {
    chrome.runtime.sendMessage({
        method: "checkVersion"
    }, function (_0x409ax1) {});
    if (localStorage.extVersion < localStorage.latest_version) {
        showError("Please Update the extension : https://accountspool.com")
    } else {
        $("#how-to-use").click(function () {
            chrome.tabs.create({
                url: "http://accountspool.com"
            })
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
        })
    }
});
function pickUpCookieFromPage() {
    chrome.tabs.query({
        currentWindow: true,
        active: true
    }, function (_0x409ax3) {
        try {
            chrome.tabs.sendRequest(_0x409ax3[0].id, {
                method: "getCookie"
            }, function (_0x409ax1) {
                try {
                    bodyText = _0x409ax1.data;
                    if (isJson(bodyText)) {
                        var _0x409ax4 = JSON.parse(bodyText);
                        verifyAndSetCookie(_0x409ax4)
                    } else {
                        showError("Error: Not a Valid Cookie.")
                    }
                } catch (e) {
                    console.log(e);
                    showError("Error: Refresh the page to continue.")
                }
            })
        } catch (e) {
            showError("Error: Refresh the page to continue.")
        }
    })
}
function verifyAndSetCookie(_0x409ax6) {
    try {
        var _0x409ax4 = _0x409ax6.cookie;
        if (_0x409ax4.SecureData1 != undefined && _0x409ax4.SecureData2 != undefined && _0x409ax4.SecureData3 != undefined && _0x409ax4.SecureData4 != undefined) {
            var _0x409ax7 = _0x409ax4.SecureData1;
            var _0x409ax8 = _0x409ax4.SecureData2;
            var _0x409ax9 = _0x409ax4.SecureData3;
            var _0x409axa = _0x409ax4.SecureData4;
            var _0x409axb = _0x409ax9;
            var _0x409axc = atob(_0x409axb);
            var _0x409axd = _0x409axc.substr(3, 3);
            var _0x409axe = _0x409axc.substr(7, 3);
            var _0x409axf = _0x409axc.substr(0, 3);
            var _0x409ax10 = _0x409axc.substr(6, 1);
            var _0x409ax11 = parseInt(_0x409axd + _0x409axe + _0x409axf + _0x409ax10, 10);
            var _0x409ax12 = Math.floor(Date.now() / 1000);
                chrome.runtime.sendMessage({
                    method: "setNewCookies",
                    "SecureData1": _0x409ax7,
                    "SecureData2": _0x409ax8,
                    "SecureData4": _0x409axa
                }, function (_0x409ax1) {})
        } else {
            showError("Not a valid cookie")
        }
    } catch (e) {
        showError("Not a valid cookie")
    }
}
function isJson(_0x409ax14) {
    try {
        JSON.parse(_0x409ax14)
    } catch (e) {
        return false
    };
    return true
}
function showError(_0x409ax16) {
    $(".notify-box").addClass("error");
    $(".notify-box").text(_0x409ax16)
}
function logJson(_0x409ax18) {
    chrome.tabs.executeScript({
        code: "console.log(" + JSON.stringify(_0x409ax18) + ")"
    })
}
function logString(_0x409ax16) {
    chrome.tabs.executeScript({
        code: "console.log(String(\"" + _0x409ax16 + "\"));"
    })
}