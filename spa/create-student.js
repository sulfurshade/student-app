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
				window.location = "/index.html#redirected";
				console.log("err");
				console.log(errorData);
			},
		});
	})
})
