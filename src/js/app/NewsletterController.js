"use strict";

const NewsletterApp = require("./NewsletterApp");
const electron = require("electron");
const path = require("path");

class NewsletterController {

	constructor() {
		this.newsletterApp = new NewsletterApp(electron, path);

	}

	run() {
		this.newsletterApp.loadAppListeners()

	}

}

module.exports = NewsletterController;