"use strict";

class User {
	constructor(userName, email, birthday, password) {
		this.userName = userName;
		this.email = email;
		this.birthday = birthday;
		this.password = password;
	}
	constructor(user) {
		this.userName = user.userName;
		this.email = user.email;
		this.birthday = user.birthday;
		this.password = user.password;
	}
}

module.exports = User;