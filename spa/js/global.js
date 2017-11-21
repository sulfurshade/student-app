const LOGOUT_BUTTON = "#logout-button";

$(function() {
	$(LOGOUT_BUTTON).click(function(e) {
		e.preventDefault();
		localStorage.removeItem("token");
		window.location = "/index.html";
	});
});