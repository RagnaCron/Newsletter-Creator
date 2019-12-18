"use strict";

const NewsletterApp = require("./NewsletterApp");
const HelloScreenView = require("../windows/HelloScreenView");
const electron = require("electron");
const path = require("path");

class NewsletterController {

	constructor() {
		this.newsletterApp = new NewsletterApp(electron, path);
		this.helloScreenView = new HelloScreenView(electron, path);
	}

	run() {
		this.newsletterApp.loadAppListeners();
		this.helloScreenView.loadHelloListeners();
	}

}

module.exports = NewsletterController;