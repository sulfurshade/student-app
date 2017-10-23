
let userData = {
	username: username,
	password: password
};

$.ajax({
	url: `/api/auth/login`,
	type: "POST",
	data: JSON.stringify(userData),
	contentType: "application/json; charset=utf-8",
	dataType: "json",
	success: function(data){
		console.log("yay! authenticated");
		state.loggedIn = true;
		state.token = data.authToken;
			// do stuff/ goto a page
		},
		error: function(errorData){
			console.log("we couldn't authenticate");
		},
	});