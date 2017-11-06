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

$(function(){
	var token = localStorage.getItem("token");
	var username = window.location.hash.substr(1);
	console.log(username);
	$.ajax({
		url: `/api/students/${username}`,
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
			console.log("err");
			console.log(errorData);
		},
	});
	function renderStudent(studentInfo){
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
});