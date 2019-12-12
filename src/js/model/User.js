

/**
 * The User for the Newsletter. This Class will be used to pass to a indexedDB.
 */

class User {
	name;
	email;
	password;

	constructor(name, email, password) {
		this.name = name;
		this.email = email;
		this.password = password;
	}
}