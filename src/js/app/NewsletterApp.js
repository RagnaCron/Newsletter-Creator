"use strict";

const electron = require('electron');
const path = require('path');

class NewsletterApp {
	constructor() {
		this.app = null;
		this.mainWindow = null;
		this.menu = null;
		this.user = null;
		this.getHelloTemplate = require("./templates/HelloMenuTemplate");
		this.getNewletterTemplate = require("./templates/NewsletterMenuTemplate");
	}

	init() {
		this.app = electron.app;
		this.menu = electron.Menu;

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

		// Emitted when the window is closed.
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