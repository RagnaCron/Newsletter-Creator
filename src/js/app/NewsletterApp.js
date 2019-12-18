"use strict";

const electron = require("electron");
const path = require("path");


class NewsletterApp {
	constructor() {
		this.menu = electron.Menu;
		this.app = electron.app;
		this.mainWindow = null;
		this.getHelloTemplate = require("./templates/HelloMenuTemplate");
		this.getNewletterTemplate = require("./templates/NewsletterMenuTemplate");


		this.app.on('ready', () => {
			this.createWindow();
			this.createMenu(this.getHelloTemplate(this.app));
		});

		this.app.on('window-all-closed', () => {
			if (process.platform !== 'darwin') {
				this.app.quit();
			}
		});

		this.app.on('activate', () => {
			if (this.mainWindow === null) {
				this.createWindow();
			}
		});
	}

	run() {

	}

	createWindow() {
		this.mainWindow = new electron.BrowserWindow({
			width: 1024,
			height: 768,
			minWidth: 1024,
			minHeight: 768,
			webPreferences: {
				nodeIntegration: true,
			}
		});

		this.mainWindow.loadFile(path.join(__dirname, "../../html/Hello.html"));

		// Open the DevTools.
		this.mainWindow.webContents.openDevTools();

		this.mainWindow.on('closed', () => {
			this.mainWindow = null;
		});
	}

	createMenu(template) {
		const newsLetterMenu = this.menu.buildFromTemplate(template);
		this.menu.setApplicationMenu(newsLetterMenu);
	}
}

module.exports = NewsletterApp;