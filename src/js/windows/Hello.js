'use strict';

const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

const createWindow = (width, height) => {
	return new BrowserWindow({
		width: width,
		height: height,
		// minWidth: width,
		// minHeight: height,
		// maxWidth: width,
		// maxHeight: height,
		frame: false,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true
		},
	});
};

let subWindow = null;

registerButton.addEventListener("click", () => {
	const registerHTML = path.join('file://', __dirname, 'Register.html');

	subWindow = createWindow(600, 700);
	subWindow.webContents.openDevTools();

	subWindow.on('close', () => subWindow = null);
	subWindow.loadURL(registerHTML).then(() => subWindow.show());
});

loginButton.addEventListener("click", () => {
	const loginHTML = path.join('file://', __dirname, 'Login.html');

	subWindow = createWindow(600, 700);
	subWindow.webContents.openDevTools();

	subWindow.on('close', () => subWindow = null);
	subWindow.loadURL(loginHTML).then(() => subWindow.show());
});


// class HelloScreenView {
// 	constructor(electron, path) {
// 		this.electron = electron;
// 		this.path = path;
// 		// this.doc = this.electron.window.document;
// 		this.subWindow = null;
// 		// this.loadHelloListeners();
// 	}
//
// 	createSubWindow(width, height) {
// 		const BrowserWindow = this.electron.BrowserWindow;
// 		this.subWindow = new BrowserWindow({
// 			width: width,
// 			height: height,
// 			minWidth: width,
// 			minHeight: height,
// 			frame: false,
// 			alwaysOnTop: true,
// 			webPreferences: {
// 				nodeIntegration: true
// 			},
// 		});
// 	}
//
// 	loadHelloListeners() {
// 		// const app = this.remote.app;
// 		// this.electron.app.on("ready", (event) => {
// 			// this.electron.window.document.getElementById()
// 			// this.createSubWindow(600, 560);
// 			// this.electron.remote.getCurrentWindow().on(this.subWindow.on("ready",), () => {
// 			//
// 			// });
// 		const remote = this.electron.remote;
// 		win.addListener("ready", event => {
// 			const loginButton = this.electron.remote.getCurrentWindow().window.document.getElementById('login-button');
// 			const registerButton = document.getElementById('register-button');
//
// 			registerButton.addEventListener("click", () => {
// 				const registerHTML = this.path.join('file://', __dirname, 'Register.html');
//
// 				this.createSubWindow(600, 560);
// 				this.subWindow.loadURL(registerHTML).then(() => this.subWindow.show());
//
// 				this.subWindow.on('close', () => this.subWindow = null);
// 			});
//
// 			loginButton.addEventListener("click", () => {
// 				const loginHTML = this.path.join('file://', __dirname, 'Login.html');
//
// 				this.createSubWindow(600, 560);
// 				this.subWindow.loadURL(loginHTML).then(() => this.subWindow.show());
//
// 				this.subWindow.on('close', () => this.subWindow = null);
// 			});
// 		});
//
//
// 		// });
// 	}
// }
//
// module.exports = HelloScreenView;