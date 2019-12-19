// "use strict";

const DB_NAME = "CreatorDB";
const DB_VERSION = 1;
const DB_STORE_USERS = "Users";
const DB_STORE_NEWSLETTERS = "Newsletters";
// const User = require("electron").remote.require("../models/User");

class NewsletterDataBase {

	constructor() {
		this.db = null;
		this.userObjectStore = null;
		this.newsletterObjectStore = null;
	}

	openDB() {
		console.log("opening DB ...");
		const request = indexedDB.open(DB_NAME, DB_VERSION);

		request.onsuccess = () => {
			this.db = request.result;
			console.log("opening DB DONE");
		};

		request.onerror = (evt) => {
			console.error("opening DB ERROR:", evt.target.errorCode);
		};

		request.onupgradeneeded =(evt) => {
			console.log("opening DB onupgradeneeded");
			const userObjectStore = evt.currentTarget.result.createObjectStore(
				DB_STORE_USERS, { keyPath: 'id', autoIncrement: true });
			userObjectStore.createIndex('userName', 'userName', { unique: true });
			userObjectStore.createIndex('email', 'email', { unique: true });

			const newsletterObjectStore = evt.currentTarget.result.createObjectStore(
				DB_STORE_NEWSLETTERS, {keyPath: "id", autoIncrement: true});
			newsletterObjectStore.createIndex("newsletterName", "newsletterName", {unique: true});
		};
	}

	closeDB() {
		this.db.close();
	}

	/**
	 * @param {string} mode either "readonly" or "readwrite"
	 */
	openUserObjectStore(mode) {
		console.log("opening User ObjectStore");
		this.userObjectStore = this.db.transaction(DB_STORE_USERS, mode).objectStore(DB_STORE_USERS);
	}

	clearUserObjectStore() {
		this.openUserObjectStore('readwrite');
		const request = this.userObjectStore.clear();

		request.onsuccess = (evt) => {
			// displayActionSuccess("Store cleared");
			// displayPubList(store);
		};
		request.onerror = (evt) => {
			console.error("Clear Users ObjectStore ERROR:", evt.target.errorCode);
			// displayActionFailure(this.error);
		};
	}

	// /**
	//  * @param {User} user to add
	//  */
	addUser(user) {
		const request = this.userObjectStore.add(user);
		request.onerror = (evt) => {
			console.error("Adding User ERROR:", evt.target.result);
		};
		request.onsuccess = (evt) => {
			console.log("Adding User ERROR:", evt.target.result);
		};
	}

	// /**
	//  * @param {string} userName to Look up
	//  * @param {string} password to Look up
	//  * @return {User} a User object or null
	//  */
	getUser(userName, password, getUserCallback) {
		const index = this.userObjectStore.index(userName);
		index.get(userName).onerror = (evt) => {
			console.error("getUser ERROR:", evt.target.result.userName);
			getUserCallback(false);
		};
		index.get(userName).onsuccess = (evt) => {
			const data = evt.target.result;
			if (data.password === password) {
				const user = {
					userName: data.userName,
					email: data.email,
					birthday: data.birthday,
					password: null
				};
				getUserCallback(user);
			} else {
				getUserCallback("Wrong Username or Password.");
			}
		};
	}

	containsUsername(userName) {
		let is = false;
		const index = this.userObjectStore.index(userName);
		index.get(userName).onsuccess = (evt) => {
			is = true;
		};
		return is;
	}

	containsEmail(email) {
		let is = false;
		const index = this.userObjectStore.index(email);
		index.get(email).onsuccess = (evt) => {
			is = true;
		};
		return is;
	}

	/**
	 * @param {string} mode either "readonly" or "readwrite"
	 */
	openNewsletterObjectStore(mode) {
		this.newsletterObjectStore = this.db.transaction(DB_STORE_NEWSLETTERS, mode).objectStore(DB_STORE_NEWSLETTERS);
	}

	clearNewsletterObjectStore() {
		this.openNewsletterObjectStore('readwrite');
		const request = this.newsletterObjectStore.clear();

		request.onsuccess = (evt) => {
			// displayActionSuccess("Store cleared");
			// displayPubList(store);
		};
		request.onerror = (evt) => {
			console.error("Clear Newsletter ObjectStore ERROR:", evt.target.errorCode);
			// displayActionFailure(this.error);
		};
	}

	deleteNewsletter(newsletterName) {
		const request = this.newsletterObjectStore.delete(newsletterName);
		request.onsuccess = (evt) => {
			console.log("Deleted Newsletter", newsletterName)
		};
	}

}

module.exports = NewsletterDataBase;