const TEST_STUDENT = "#example-student";
const STUDENT_LIST = "#student-list";
const STUDENT_IMAGE = ".student-image";
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
			console.log("err");
			console.log(errorData);
		},
	});
	function renderStudents(studentsArray){
		for (let student of studentsArray){
			var clonedStudent = $(TEST_STUDENT).clone();
			clonedStudent.find(STUDENT_IMAGE).attr('src', student.image);
			clonedStudent.find(STUDENT_NAME).text(student.name);
			clonedStudent.find(STUDENT_NAME).attr('href', "/student-page.html#" + (student.username));
			clonedStudent.find(STUDENT_INFO).text(student.bio);
			clonedStudent.removeClass("hidden");
			$(STUDENT_LIST).append(clonedStudent);
		}
	}
})
