"use strict";

class NewsletterApp {
	constructor(electron, path) {
		this.electron = electron;
		this.menu = this.electron.Menu;
		this.app = this.electron.app;
		this.path = path;
		this.mainWindow = null;
		this.getHelloTemplate = require("./templates/HelloMenuTemplate");
		this.getNewletterTemplate = require("./templates/NewsletterMenuTemplate");
	}

	loadAppListeners() {
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
		this.mainWindow = new this.electron.BrowserWindow({
			width: 1024,
			height: 768,
			minWidth: 1024,
			minHeight: 768,
			webPreferences: {
				nodeIntegration: true,
			}
		});

		this.mainWindow.loadFile(this.path.join(__dirname, "../../html/Hello.html"));

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