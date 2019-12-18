"use strict";

class User {
	constructor(name, email, birthday, password) {
		this.name = name;
		this.email = email;
		this.birthday = birthday;
		this.password = password;
	}
}

module.exports = User;