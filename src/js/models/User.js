"use strict";

class User {
	constructor(userName, email, birthday, password) {
		this.userName = userName;
		this.email = email;
		this.birthday = birthday;
		this.password = password;
	}
}

module.exports = User;