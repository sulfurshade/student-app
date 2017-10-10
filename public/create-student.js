const CREATE_BUTTON = "#student-submit";
const STUDENT_FIRST = "#first-name";
const STUDENT_LAST = "#last-name";
const STUDENT_USERNAME = "#student-username";
const STUDENT_INSTRUMENT = "#student-instrument";
const STUDENT_LEVEL = "";
const STUDENT_BIO = "";

$(function(){
	$(CREATE_BUTTON).click(function(e){
		e.preventDefault();
		let newStudent = {
			name: {
				firstName: $(STUDENT_FIRST).val(),
				lastName: $(STUDENT_LAST).val()
			},
			instrument: $(STUDENT_INSTRUMENT).val(),
			level: $(STUDENT_LEVEL).val(),
			username: $(STUDENT_USERNAME).val()
		}
		console.log(newStudent);
		$.ajax({
		url: `/students`,
		type: "POST",
		data: JSON.stringify(newStudent),
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