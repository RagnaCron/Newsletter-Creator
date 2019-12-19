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
		connectToDB(addUser);
	}

});


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


