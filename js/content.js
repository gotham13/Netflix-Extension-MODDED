chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "getCookie"){
            sendResponse({data: document.getElementById("cookie_container").innerText, method: "getCookie"}); 
        }
    }
);





