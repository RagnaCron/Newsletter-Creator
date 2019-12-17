'use strict';

const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.remote.BrowserWindow;

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

const createWindow = (width, height) => {
	return new BrowserWindow({
		webPreferences: {
			nodeIntegration: true
		},
		width: width,
		height: height,
		frame: false,
		alwaysOnTop: true,
	});
};

let subWindow = null;

registerButton.addEventListener("click", () => {
	const registerHTML = path.join('file://', __dirname, 'register.html');

	subWindow = createWindow(600, 560);

	subWindow.on('close', () => subWindow = null);
	subWindow.loadURL(registerHTML).then(() => subWindow.show());
});


