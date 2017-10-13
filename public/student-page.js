const PAGE = ".page-wrap";
const STUDENT_INFO = "#student-info";
const STUDENT_NAME = "#sp-name";
const STUDENT_INSTRUMENT = "#sp-instrument";
const STUDENT_LEVEL = "#sp-level";
const STUDENT_BIO = "#sp-bio";
const STUDENT_LOGS = "#sp-logs";
const LOG_DATE = "#log-date";
const LOG_TIME = "#log-time";
const LOG_NOTES = "#log-notes";
const LOG_GOALS = "#log-goals";

$(function(){
	$.ajax({
		url: `/students`,
		type: "GET",
		contentType: "application/json; charset=utf-8",
		dataType: "json",
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
	function renderStudent(studentsArray){
		var student = $(STUDENT_INFO).clone();
		student.find(STUDENT_NAME).text("hi");
		// $(STUDENT_INSTRUMENT).text("");
		// $(STUDENT_LEVEL).text("");
		// $(STUDENT_BIO)text("");
		// $(STUDENT_LOGS);
		student.removeClass("hidden");
		$(STUDENT_INFO).append(student);
	// 	for (let student of studentsArray){
	// 		console.log(student.image);
	// 		var clonedStudent = $(TEST_STUDENT).clone();
	// 		clonedStudent.find(STUDENT_IMAGE).attr('src', student.image);
	// 		clonedStudent.find(STUDENT_NAME).text(student.name);
	// 		clonedStudent.find(STUDENT_INFO).text(student.bio);
	// 		clonedStudent.removeClass("hidden");
	// 		$(STUDENT_LIST).append(clonedStudent);
	// 	}
	// }
})