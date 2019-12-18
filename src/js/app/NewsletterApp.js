"use strict";

const electron = require('electron');
const path = require('path');
const Menu = electron.Menu;

class NewsletterApp {

	constructor() {
		this.app = require("electron").app;
		this.mainWindow = null;
		this.user = null;
		this.getHelloTemplate = require("./HelloMenuTemplate");
		this.getNewletterTemplate = require("./NewsletterMenuTemplate");
	}

	init() {
		// this.app = electron.app;

		// This method will be called when Electron has finished
		// initialization and is ready to create browser windows.
		// Some APIs can only be used after this event occurs.
		this.app.on('ready', () => {
			this.createWindow();
			this.createMenu(this.getHelloTemplate(this.app));
		});

		// Quit when all windows are closed.
		this.app.on('window-all-closed', () => {
			// On OS X it is common for applications and their menu bar
			// to stay active until the user quits explicitly with Cmd + Q
			if (process.platform !== 'darwin') {
				this.app.quit();
			}
		});

		this.app.on('activate', () => {
			// On OS X it's common to re-create a window in the app when the
			// dock icon is clicked and there are no other windows open.
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
		const newsLetterMenu = Menu.buildFromTemplate(template);
		Menu.setApplicationMenu(newsLetterMenu);
	}
}

module.exports = NewsletterApp;