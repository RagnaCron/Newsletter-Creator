"use strict";

const electron = require("electron");
const remote = electron.remote;
const ipc = electron.ipcRenderer;

const User = remote.require("../models/User");
const DB_NAME = "CreatorDB";
const DB_VERSION = 1;
const DB_STORE_USERS = "Users";

const closeButton = document.getElementById("close-user-form");
closeButton.addEventListener("click", () => {
	remote.getCurrentWindow().close();
});

function message(field, message) {
	field.innerText = message;
}

function inputValidationCheck(validationField, errorField, errorMessage) {
	if (validationField.validity.valid)
		message(errorField, "");
	else
		message(errorField, errorMessage);
}

const loginName =  document.getElementById("log-name");
const loginError = document.getElementById("log-error");

const password = document.getElementById("log-password");
const passwordError = document.getElementById("password-error");

const loginButton = document.getElementById("log-button");
loginButton.addEventListener("click", () => {
	connectToDB(containsUsername);
});

function connectToDB(dbSuccessCallback) {
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
		dbSuccessCallback(request.result);
		console.log("opening DB DONE");
	};
	request.onerror = () => {
		console.error("opening DB ERROR:", request.error);
	};
}

// function login(db) {
// 	const transaction = db.transaction([DB_STORE_USERS], "readonly");
// 	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
// 	const index = userObjectStore.index("userName");
// 	const request = index.get();
// }

function containsUsername(db) {
	console.log("Contains user name...");
	const transaction = db.transaction([DB_STORE_USERS], "readonly");
	const userObjectStore = transaction.objectStore(DB_STORE_USERS);
	const usernameIndex = userObjectStore.index('userName');
	const request = usernameIndex.get(loginName.value);
	request.onerror = () => {
		message(loginError, "Wrong username.");
		message(passwordError, "Wrong password.");
	};
	request.onsuccess = () => {
		console.log("contains username");
		// const result = request.result;
		const user = new User(
			request.result.userName, request.result.email,
			request.result.birthday, request.result.password);
		if (user.password === password.value) {
			ipc.send("login-successful", user);
			console.log(user);
			// remote.getCurrentWindow().close();
		} else {
			message(loginError, "Wrong username");
			message(passwordError, "Wrong password.");
		}
		loginName.innerText = "";
		password.innerText = "";
	};
}