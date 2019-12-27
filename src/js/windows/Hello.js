'use strict';

const electron = require('electron');
const path = require('path');
const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

const backdropElement = document.getElementById("backdrop");
function toggleBackdrop() {
	backdropElement.classList.toggle('visible');
}

const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');

ipc.on("login-successful", () => {
	registerButton.removeEventListener("click", registration);
	loginButton.removeEventListener("click", login);
	// electron.remote.getCurrentWindow().close();
});


const createWindow = (width, height) => {
	return new BrowserWindow({
		width: width,
		height: height,
		minWidth: width,
		minHeight: height,
		maxWidth: width,
		maxHeight: height,
		frame: false,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: true
		},
	});
};

let helloSubWindow = null;

registerButton.addEventListener("click", registration);
function registration() {
	const registerHTML = path.join('file://', __dirname, 'Registration.html');

	helloSubWindow = createWindow(600, 700);
	// helloSubWindow.webContents.openDevTools();

	helloSubWindow.on('close', () => {
		helloSubWindow = null;
		toggleBackdrop();
	});
	helloSubWindow.loadURL(registerHTML).then(() => {
		toggleBackdrop();
		helloSubWindow.show();
	});
}


loginButton.addEventListener("click", login);
function login() {
	const loginHTML = path.join('file://', __dirname, 'Login.html');

	helloSubWindow = createWindow(600, 700);
	// helloSubWindow.webContents.openDevTools();

	helloSubWindow.on('close', () => {
		helloSubWindow = null;
		toggleBackdrop();
	});
	helloSubWindow.loadURL(loginHTML).then(() => {
		toggleBackdrop();
		helloSubWindow.show();
	});
}