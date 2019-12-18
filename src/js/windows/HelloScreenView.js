'use strict';

// const electron = require('electron');
// const path = require('path');
// const BrowserWindow = electron.remote.BrowserWindow;
//
// const loginButton = document.getElementById('login-button');
// const registerButton = document.getElementById('register-button');

// const createWindow = (width, height) => {
// 	return new BrowserWindow({
// 		width: width,
// 		height: height,
// 		minWidth: width,
// 		minHeight: height,
// 		frame: false,
// 		alwaysOnTop: true,
// 		webPreferences: {
// 			nodeIntegration: true
// 		},
// 	});
// };

// let subWindow = null;

// registerButton.addEventListener("click", () => {
// 	const registerHTML = path.join('file://', __dirname, 'Register.html');
//
// 	subWindow = createWindow(600, 560);
//
// 	subWindow.on('close', () => subWindow = null);
// 	subWindow.loadURL(registerHTML).then(() => subWindow.show());
// });
//
// loginButton.addEventListener("click", () => {
// 	const loginHTML = path.join('file://', __dirname, 'Login.html');
//
// 	subWindow = createWindow(600, 560);
//
// 	subWindow.on('close', () => subWindow = null);
// 	subWindow.loadURL(loginHTML).then(() => subWindow.show());
// });

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

class HelloScreenView {
	constructor(electron, path) {
		this.electron = electron;
		this.path = path;
		this.subWindow = null;
	}

	createSubWindow(width, height) {
		const BrowserWindow = this.electron.remote.BrowserWindow;
		this.subWindow =  new BrowserWindow({
			width: width,
			height: height,
			minWidth: width,
			minHeight: height,
			frame: false,
			alwaysOnTop: true,
			webPreferences: {
				nodeIntegration: true
			},
		});
	}

	loadHelloListeners() {
		registerButton.addEventListener("click", () => {
			const registerHTML = this.path.join('file://', __dirname, 'Register.html');

			this.createSubWindow(600, 560);

			this.subWindow.on('close', () => this.subWindow = null);
			this.subWindow.loadURL(registerHTML).then(() => this.subWindow.show());
		});

		loginButton.addEventListener("click", () => {
			const loginHTML = this.path.join('file://', __dirname, 'Login.html');

			this.createSubWindow(600, 560);

			this.subWindow.on('close', () => this.subWindow = null);
			this.subWindow.loadURL(loginHTML).then(() => this.subWindow.show());
		});
	}
}

module.exports = HelloScreenView;