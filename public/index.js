const LOGIN_BUTTON = ".js-login-button";
const LOGIN_MODAL = "#modal-1";
const CLOSE_MODAL = ".js-close";
const LOGIN_SUBMIT = "#login-submit";
const FORM_USERNAME = "#form-username";
const FORM_PASSWORD = "#form-password";

$(function(){
	$(LOGIN_BUTTON).click(function(){
		$(LOGIN_MODAL).css("display","block");
	})
	$(CLOSE_MODAL).click(function(){
		$(LOGIN_MODAL).css("display","none");
	})
	$(LOGIN_SUBMIT).click(function(e){
		e.preventDefault();
		let userData = {
			username: $(FORM_USERNAME).val(),
			password: $(FORM_PASSWORD).val()
		};

		$.ajax({
			url: `/api/auth/login`,
			type: "POST",
			data: JSON.stringify(userData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data){
				console.log("yay! authenticated");
				localStorage.setItem('token', data.authToken);
				window.location.href = "/all-students.html";
		},
		error: function(errorData){
			console.log("we couldn't authenticate");
		},
	});

	})

})

