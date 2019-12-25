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

function message(field, message, validity = false) {
	field.innerText = message;
	valid = validity;
}

function inputValidationCheck(validationField, errorField, errorMessage) {
	if (validationField.validity.valid)
		message(errorField, "", true);
	else
		message(errorField, errorMessage, false);
}

const regName = document.getElementById("reg-name");
const nameError = document.getElementById("name-error");
regName.onblur = () => {
	const error = "Enter a Username with more then 4 and less then 12 characters.";
	inputValidationCheck(regName, nameError, error);
	// connectToDB(containsUsername);
};
regName.onfocus = () => message(nameError, "");

const regEmail = document.getElementById("reg-email");
const emailError = document.getElementById("email-error");
regEmail.onblur = () => {
	const error = "Enter a correct email address.";
	inputValidationCheck(regEmail, emailError, error);
	// connectToDB(containsEmail);
};
emailError.onfocus = () => message(emailError, "");

const regBirthday = document.getElementById("reg-birthday");
const birthdayError = document.getElementById("birthday-error");
regBirthday.onblur = () => {
	const error = "Choose your birthday.";
	inputValidationCheck(regBirthday, birthdayError, error);
};
regBirthday.onfocus = () => message(birthdayError, "");

const regPassword1 = document.getElementById("reg-password1");
const password1Error = document.getElementById("password1-error");
regPassword1.onblur = () => {
	const error = "Enter a password, it needs at least 8 sings, max 24.";
	inputValidationCheck(regPassword1, password1Error, error);
};
regPassword1.onfocus = () => message(password1Error, "");

const regPassword2 = document.getElementById("reg-password2");
const password2Error = document.getElementById("password2-error");
regPassword2.onblur = () => {
	const error = "Confirm you last password.";
	inputValidationCheck(regPassword2, password2Error, error);
	checkPasswords();
};
regPassword2.onfocus = () => message(password2Error, "");

function checkPasswords() {
	if (regPassword1.value === regPassword2.value)
		return true;
	else {
		message(password1Error, "Password mismatch.");
		message(password2Error, "Password mismatch.");
		return false;
	}

}

let valid = false;
const registerButton = document.getElementById("reg-button");
registerButton.addEventListener("click", () => {
	connectToDB(containsUsername);
	connectToDB(containsEmail);
	if (checkPasswords()) {
		if (valid) {
			connectToDB(addUser);
		}
	}
});


function connectToDB(dbCallback) {
	console.log("opening DB ...");
	const request = indexedDB.open(DB_NAME, DB_VERSION);
	request.onupgradeneeded = () => {
		console.log("opening DB onupgradeneeded");
		if (!request.result.objectStoreNames.contains(DB_STORE_USERS)) {
			const userObjectStore = request.result.createObjectStore(
				DB_STORE_USERS, {keyPath: 'id', autoIncrement: true});
			userObjectStore.createIndex('userName', 'userName', {unique: true});
			userObjectStore.createIndex('email', 'email', {unique: true});
		}
	};
	request.onsuccess = () => {
		console.log("opening DB DONE");
		dbCallback(request.result);
	};
	request.onerror = () => {
		console.error("opening DB ERROR:", request.error);
	};
}

function addUser(db) {
	const transaction = db.transaction([DB_STORE_USERS], "readwrite");
	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
	const user = new User(regName.value, regEmail.value, regBirthday.value, regPassword1.value);
	const request = userObjectStore.add(user);
	request.onerror = () => {
		console.error("Adding User ERROR:", request.error);
		message(nameError, "Username is taken.");
		message(emailError, "Email address is taken.");
	};
	request.onsuccess = () => {
		console.log("Adding User success:", request.result);
		remote.getCurrentWindow().close();
	};
}

function containsUsername(db) {
	console.log("Contains user name...");
	const transaction = db.transaction([DB_STORE_USERS], "readonly");
	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
	const index = userObjectStore.index('userName');
	const request = index.get(regName.value);
	request.onsuccess = () => {
		console.log("contains username");
		message(nameError, "Username is taken.");
	};
	request.onerror = () => {
		console.log("username is free");
		valid = true;
	};
}

function containsEmail(db) {
	console.log("Contains email address");
	const transaction = db.transaction([DB_STORE_USERS], "readonly");
	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
	const index = userObjectStore.index('email');
	const request = index.get(regEmail.value);
	request.onsuccess = () => {
		console.log("contains email address");
		message(emailError, "Email address is taken.");
	};
	request.onerror = () => {
		console.log("email address is free");
		valid = true;
	};
}