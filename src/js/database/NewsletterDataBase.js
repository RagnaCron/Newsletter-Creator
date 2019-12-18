"use strict";

const DB_NAME = "CreatorDB";
const DB_VERSION = 1;
const DB_STORE_USERS = "Users";
const DB_STORE_NEWSLETTERS = "Newsletters";

const User = require("../model/User");

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

	/**
	 * @param {string} mode either "readonly" or "readwrite"
	 */
	openObjectUserObjectStore(mode) {
		this.userObjectStore = this.db.transaction(DB_STORE_USERS, mode).objectStore(DB_STORE_USERS);
	}

	clearUserObjectStore() {
		this.openObjectUserObjectStore('readwrite');
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

	/**
	 * @param {User} user to add
	 */
	addUser(user) {
		const request = this.userObjectStore.add(user);
		request.onerror = (evt) => {
			console.error("Adding User ERROR:", evt.target.result);
		};
		request.onsuccess = (evt) => {
			console.log("Adding User ERROR:", evt.target.result);
		};
	}

	/**
	 * @param {string} userName to Look up
	 * @param {string} password to Look up
	 * @return {User} a User object or null
	 */
	getUser(userName, password) {
		const index = this.userObjectStore.index(userName);
		let user = null;
		index.get(userName).onerror = (evt) => {
			console.error("getUser ERROR:", evt.target.result.userName);
		};
		index.get(userName).onsuccess = (evt) => {
			const data = evt.target.result;
			if (data.password === password) {
				user = new User(data.userName, data.email, data.birthday, null);
			}
		};
		return user;
	}

	/**
	 * @param {string} mode either "readonly" or "readwrite"
	 */
	openObjectNewsletterObjectStore(mode) {
		this.newsletterObjectStore = this.db.transaction(DB_STORE_NEWSLETTERS, mode).objectStore(DB_STORE_NEWSLETTERS);
	}

	clearNewsletterObjectStore() {
		this.openObjectNewsletterObjectStore('readwrite');
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