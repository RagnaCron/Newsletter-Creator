"use strict";

const electron = require("electron");
const path = require("path");
// const User = require("../models/User");


class NewsletterApp {
	constructor() {
		this.menu = electron.Menu;
		this.app = electron.app;
		this.ipc = electron.ipcMain;
		this.mainWindow = null;
		this.user = null;
		this.getHelloTemplate = require("./templates/HelloMenuTemplate");
		this.getNewletterTemplate = require("./templates/NewsletterMenuTemplate");
		this.overview = "../../html/Overview.html";
		this.hello = "../../html/Hello.html";
		this.editor = "../../html/NewsletterEditor.html";
	}

	run() {
		this.app.on('ready', () => {
			this.createWindow(this.editor);
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

		// this.ipc.on("login-successful", (evt, arg) => {
		// 	// this.mainWindow = null;
		// 	this.user = new User(arg.userName, arg.email, arg.birthday, arg.password);
		// 	this.mainWindow.unload;
		// 	this.mainWindow.loadFile(path.join(__dirname, this.overview));
		// 	// this.mainWindow = this.createWindow(this.overview);
		// 	this.createMenu(this.getNewletterTemplate(this.app))
		// });
	}

	createWindow(fileName) {
		this.mainWindow = new electron.BrowserWindow({
			width: 1024,
			height: 768,
			minWidth: 1024,
			minHeight: 768,
			webPreferences: {
				nodeIntegration: true,
			}
		});

		this.mainWindow.loadFile(path.join(__dirname, fileName));

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