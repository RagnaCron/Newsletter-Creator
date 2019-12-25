'use strict';

const electron = require('electron');
const path = require('path');
const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

electron.remote.getCurrentWindow().on("close", () => {
	registerButton.removeEventListener("click", registration);
	loginButton.removeEventListener("click", login);
});

ipc.on("login-successful", () => electron.remote.getCurrentWindow().close());


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

registerButton.addEventListener("click", registration);
function registration() {
	const registerHTML = path.join('file://', __dirname, 'Registration.html');

	subWindow = createWindow(600, 700);
	subWindow.webContents.openDevTools();

	subWindow.on('close', () => {
		subWindow = null
	});
	subWindow.loadURL(registerHTML).then(() => subWindow.show());
}


loginButton.addEventListener("click", login);
function login() {
	const loginHTML = path.join('file://', __dirname, 'Login.html');

	subWindow = createWindow(600, 700);
	subWindow.webContents.openDevTools();

	subWindow.on('close', () => subWindow = null);
	subWindow.loadURL(loginHTML).then(() => subWindow.show());
}