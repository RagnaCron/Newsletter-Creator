"use strict";

const electron = require("electron");
const path = require("path");
const User = require("../models/User");

const backdropElement = document.getElementById("backdrop");
function toggleBackdrop() {
	backdropElement.classList.toggle('visible');
}

electron.ipcMain.on("logged-in-user", (evt, arg) => {
	console.log(arg);
});
