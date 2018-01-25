
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
				page('/students');
			},
			error: function(errorData){
				console.log("we couldn't authenticate");
				$(WRONG_INPUT).removeClass("hidden");
			},
		});
	});
}

function pageCreateUser () {
	var html = document.getElementById('tpl-create-user').innerHTML
	render(html)
	const CREATE_BUTTON = "#user-submit";
	const USER_FIRST = "#user-first-name";
	const USER_LAST = "#user-last-name";
	const USER_USERNAME = "#user-username";
	const USER_PASSWORD = "#user-password";

	$(function(){
		$(CREATE_BUTTON).click(function(e){
			e.preventDefault();
			let newUser = {
				firstName: $(USER_FIRST).val(),
				lastName: $(USER_LAST).val(),
				username: $(USER_USERNAME).val(),
				password: $(USER_PASSWORD).val(),
			}

			$.ajax({
				url: `/api/users`,
				type: "POST",
				data: JSON.stringify(newUser),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(data){
					console.log("yay! data");
					console.log(data);
				},
				error: function(errorData){
					console.log("err");
					console.log(errorData);
				},
			});
		})
	})

}

function pageAllStudents () {
	var html = document.getElementById('tpl-all-students').innerHTML
	render(html)
	const TEST_STUDENT = "#example-student";
	const STUDENT_LIST = "#student-list";
	const STUDENT_IMAGE = ".student-image";
	const STUDENT_IMAGE_LINK = "#student-image";
	const STUDENT_NAME = ".student-name";
	const STUDENT_INFO = ".student-info";

	var token = localStorage.getItem("token");

	$(function(){

		// send auth header with the token.
		var token = localStorage.getItem("token");

		$.ajax({
			url: `/api/students`,
			type: "GET",
			// data: JSON.stringify(newStudent),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: { 'Authorization': `Bearer ${token}` },
			success: function(data){
				console.log("yay! data");
				console.log(data);
				renderStudents(data);
			},
			error: function(errorData){
				window.location = "/#redirected";
				console.log("err");
				console.log(errorData);
			},
		});
		function renderStudents(studentsArray){
			for (let student of studentsArray){
				var clonedStudent = $(TEST_STUDENT).clone();
				clonedStudent.find(STUDENT_IMAGE).attr('src', student.image);
				clonedStudent.find(STUDENT_IMAGE_LINK).attr('href', "/student-page.html#" + (student.username));
				clonedStudent.find(STUDENT_NAME).text(student.name);
				clonedStudent.find(STUDENT_NAME).attr('href', "/student-page.html#" + (student.username));
				clonedStudent.find(STUDENT_INFO).text(student.bio);
				clonedStudent.removeClass("hidden");
				$(STUDENT_LIST).append(clonedStudent);
			}
		}
	})

}

function pageCreateStudent () {
	var html = document.getElementById('tpl-create-student').innerHTML
	render(html)
	const CREATE_BUTTON = "#student-submit";
	const STUDENT_FIRST = "#first-name";
	const STUDENT_LAST = "#last-name";
	const STUDENT_USERNAME = "#student-username";
	const STUDENT_INSTRUMENT = "#student-instrument";
	const STUDENT_LEVEL = "#student-level";
	const STUDENT_BIO = "#student-bio";
	const STUDENT_IMAGE = "#student-image";

	$(function(){
		var token = localStorage.getItem("token");
		$(CREATE_BUTTON).click(function(e){
			e.preventDefault();
			var levelRadio = $('input[name=student-level]');
			let newStudent = {
				name: {
					firstName: $(STUDENT_FIRST).val(),
					lastName: $(STUDENT_LAST).val()
				},
				instrument: $(STUDENT_INSTRUMENT).val(),
				level: levelRadio.filter(':checked').val(),
				username: $(STUDENT_USERNAME).val(),
				bio: $(STUDENT_BIO).val(),
				image: $(STUDENT_IMAGE).val()
			}
			console.log(newStudent);
			$.ajax({
				url: `/api/students`,
				type: "POST",
				data: JSON.stringify(newStudent),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: { 'Authorization': `Bearer ${token}` },
				success: function(data){
					console.log("yay! data");
					console.log(data);
				},
				error: function(errorData){
					// window.location = "/students#redirected";
					console.log("err");
					console.log(errorData);
				},
			});
		})
	})

}

function pageStudentPage (context) {
	var html = document.getElementById('tpl-student-page').innerHTML
	render(html)
	const STUDENT_BOX = ".student-box";
	const STUDENT_NAME = "#sp-name";
	const STUDENT_INSTRUMENT = "#sp-instrument";
	const STUDENT_LEVEL = "#sp-level";
	const STUDENT_BIO = "#sp-bio";
	const STUDENT_LOGS = "#sp-logs";
	const STUDENT_IMAGE = ".student-img";
	const LOG_DATE = "#log-date";
	const LOG_TIME = "#log-time";
	const LOG_NOTES = "#log-notes";
	const LOG_GOALS = "#log-goals";

		var token = localStorage.getItem("token");
		var id = context.params.id;
		console.log(username);

		$.ajax({
			url: `/api/students/${id}`,
			type: "GET",
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			headers: { 'Authorization': `Bearer ${token}` },
			success: function(data){
				console.log("yay! data");
				console.log(data);
				renderStudent(data);
			},
			error: function(errorData){
				window.location = "/index.html#redirected";
				console.log("err");
				console.log(errorData);
			},
		});
		function renderStudent(studentInfo){
			console.log(studentInfo);
			var student = $(STUDENT_BOX);
			student.find(STUDENT_NAME).text(studentInfo.name);
			student.find(STUDENT_INSTRUMENT).text(studentInfo.instrument);
			student.find(STUDENT_LEVEL).text(studentInfo.level);
			student.find(STUDENT_BIO).text(studentInfo.bio);
			student.find(STUDENT_IMAGE).attr("src", studentInfo.image);
			// $(STUDENT_LOGS);
		// 	for (let student of studentsArray){
		// 		console.log(student.image);
		// 		var clonedStudent = $(TEST_STUDENT).clone();
		// 		clonedStudent.find(STUDENT_IMAGE).attr('src', student.image);
		// 		clonedStudent.find(STUDENT_NAME).text(student.name);
		// 		clonedStudent.find(STUDENT_INFO).text(student.bio);
		// 		clonedStudent.removeClass("hidden");
		// 		$(STUDENT_LIST).append(clonedStudent);
		// 	}
		}

}

function render (payload) {
	var $view = document.getElementById('view')
	$view.innerHTML = payload
}


page('/', pageIndex);
page('/create-user', pageCreateUser);
page('/students', pageAllStudents);
page('/create-student', pageCreateStudent);
page('/students/:id', pageStudentPage);

$(() => page({ hashbang: true }))
