const LOGIN_BUTTON = ".js-login-button";
const LOGIN_MODAL = "#modal-1";
const CLOSE_MODAL = ".js-close";

$(function(){
	$(LOGIN_BUTTON).click(function(){
		$(LOGIN_MODAL).css("display","block");
	})
	$(CLOSE_MODAL).click(function(){
		$(LOGIN_MODAL).css("display","none");
	})
})