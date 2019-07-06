
document.addEventListener('DOMContentLoaded', function() {
	
	$("#accept-terms-and-conditions").click(function(){
		window.location.href="main.html";
		chrome.browserAction.setPopup({popup: "html/main.html"});
	})

})
