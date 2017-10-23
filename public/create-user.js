const CREATE_BUTTON = "#user-submit";
const USER_FIRST = "#user-first-name";
const USER_LAST = "#user-last-name";
const USER_USERNAME = "#student-username";
const USER_PASSWORD = "#student-password";

$(function(){
	$(CREATE_BUTTON).click(function(e){
		e.preventDefault();
		let newUser = {
			name: {
				firstName: $(USER_FIRST).val(),
				lastName: $(USER_LAST).val()
			},
			username: $(USER_USERNAME).val(),
			password: $(USER_PASSWORD).val(),
		}
		console.log(newUser);
		$.ajax({
			url: `/users`,
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