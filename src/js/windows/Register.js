"use strict";

const electron = require("electron");
const remote = electron.remote;

const User = remote.require("../models/User");
const DB_NAME = "CreatorDB";
const DB_VERSION = 1;
const DB_STORE_USERS = "Users";

const closeButton = document.getElementById("close-user-form");
closeButton.addEventListener("click", () => {
	remote.getCurrentWindow().close();
});

function message(field, message, validity) {
	field.innerText = message;
	valid = validity;
}

const regName = document.getElementById("reg-name");
const nameError = document.getElementById("name-error");
regName.onblur = () => {
	if (regName.value.length < 4 || regName.value.length > 12)
		message(nameError, "Enter a Username with more then 4 and less then 12 characters.", false);
	else
		message(nameError, "", true);
};
regName.onfocus = () => message(nameError, "", false);

const regEmail = document.getElementById("reg-email");
const emailError  = document.getElementById("email-error");
regEmail.onblur = () => {
	if (regEmail.validity.valid)
		message(emailError, "", true);
	else
		message(emailError, "Enter a correct email address.", false);
};
emailError.onfocus = () => message(emailError, "", false);

const regBirthday = document.getElementById("reg-birthday");
const birthdayError = document.getElementById("birthday-error");
regBirthday.onblur = () => {
	if (regBirthday.validity.valid)
		message(birthdayError, "", true);
	else
		message(birthdayError, "Choose your birthday.", false);
};
regBirthday.onfocus = () => message(birthdayError, "", false);

const regPassword1 = document.getElementById("reg-password1");
const regPassword2 = document.getElementById("reg-password2");

let valid = false;
const registerButton = document.getElementById("reg-button");
registerButton.addEventListener("click", () => {
	if (validateRegistrationForm()) {
		connectToDB(addUser);
	}
});

function validateRegistrationForm() {
	if (regName.value.length < 4 && regName.value.length > 12) {
		valid = false;
		nameError.innerText = "Your";
	} else {
		valid = true;
		nameError.innerText = "";
	}
	return valid;
}

function connectToDB(dbCallback) {
	console.log("opening DB ...");
	const request = indexedDB.open(DB_NAME, DB_VERSION);
	request.onsuccess = () => {
		console.log("opening DB DONE");
		return dbCallback(request.result);
	};
	request.onerror = () => {
		console.error("opening DB ERROR:", request.error);
	};
	request.onupgradeneeded = () => {
		console.log("opening DB onupgradeneeded");
		if (!request.result.objectStoreNames.contains(DB_STORE_USERS)) {
			const userObjectStore = request.result.createObjectStore(
				DB_STORE_USERS, {keyPath: 'id', autoIncrement: true});
			userObjectStore.createIndex('userName', 'userName', {unique: true});
			userObjectStore.createIndex('email', 'email', {unique: true});
		}
	};
}

function addUser(db) {
	const transaction = db.transaction([DB_STORE_USERS], "readwrite");
	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
	const user = new User(regName.value, regEmail.value, regBirthday.value, regPassword1.value);
	const request = userObjectStore.add(user);
	request.onerror = () => {
		console.error("Adding User ERROR:", request.error);
	};
	request.onsuccess = () => {
		console.log("Adding User success:", request.result);
	};
}

// function containsUsername(db) {
// 	let is = false;
// 	const transaction = db.transaction([DB_STORE_USERS], "readonly");
// 	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
// 	const index = userObjectStore.index(regName.value);
// 	index.get(regName.value).onsuccess = (evt) => {
// 		is = true;
// 	};
// 	return is;
// }
//
// function containsEmail(db) {
// 	let is = false;
// 	const transaction = db.transaction([DB_STORE_USERS], "readonly");
// 	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
// 	const index = userObjectStore.index(regEmail.value);
// 	index.get(regEmail.value).onsuccess = (evt) => {
// 		is = true;
// 	};
// 	return is;
// }


