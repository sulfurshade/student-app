function pageIndex () {
	var html = document.getElementById('tpl-index').innerHTML
	render(html)
	const LOGIN_BUTTON = ".js-login-button";
	const LOGIN_MODAL = "#modal-1";
	const CLOSE_MODAL = ".js-close";
	const LOGIN_SUBMIT = "#login-submit";
	const FORM_USERNAME = "#form-username";
	const FORM_PASSWORD = "#form-password";
	const WRONG_INPUT = "#wrong-user-or-pwd";

	$(function(){
		$(LOGIN_BUTTON).click(function(){
			$(LOGIN_MODAL).css("display","block");
			$(WRONG_INPUT).addClass("hidden");
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
					$(WRONG_INPUT).addClass("hidden");
					console.log("yay! authenticated");
					localStorage.setItem('token', data.authToken);
					window.location.href = "/all-students.html";
				},
				error: function(errorData){
					console.log("we couldn't authenticate");
					$(WRONG_INPUT).removeClass("hidden");
				},
			});

		})

	})
}

function pageCreateUser () {
	var html = document.getElementById('tpl-create-user').innerHTML
	render(html)
}

function pageAllStudents () {
	var html = document.getElementById('tpl-all-students').innerHTML
	render(html)
}

function pageCreateStudent () {
	var html = document.getElementById('tpl-create-student').innerHTML
	render(html)
}

function pageStudentPage () {
	var html = document.getElementById('tpl-student-page').innerHTML
	render(html)
}

function render (payload) {
	var $view = document.getElementById('view')
	$view.innerHTML = payload
}

page('/index', function () {
	pageIndex();
})
page('/create-user', function () {
	pageCreateUser();
})
page('/all-students', function () {
	pageAllStudents();
})
page('/create-student', function () {
	pageCreateStudent();
})
page('/student-page', function () {
	pageStudentPage();
})

page({ hashbang: true })