"use strict";

const electron = require("electron");
const remote = electron.remote;
const User = remote.require("../models/User");
const DB = remote.require("../database/NewsletterDataBase");

const closeButton = document.getElementById("close-user-form");
closeButton.addEventListener("click", () => {
	remote.getCurrentWindow().close();
});

const regName = document.getElementById("reg-button");
const regEmail = document.getElementById("reg-email");
const regBirthday = document.getElementById("reg-birthday");
const regPassword1 = document.getElementById("reg-password1");
const regPassword2 = document.getElementById("reg-password2");

const registerButton = document.getElementById("reg-button");
registerButton.addEventListener("click", () => {
	// const valid = validateRegistrationFrom();
	const valid = true;
	if (valid) {
		let userDB  = new DB();
		userDB.openDB();
		userDB.openUserObjectStore("readwrite");

		if (!userDB.containsUsername(regName.value)
			&& !userDB.containsEmail(regEmail.value)
			&& regPassword1.value === regPassword2.value) {
			console.log("We can add a user....")
			// const user = new User(regName.value, regEmail.value, regBirthday.value, regPassword1.value);
			// userDB.addUser(user);
		} else {

		}
		userDB.closeDB();
	}

});

