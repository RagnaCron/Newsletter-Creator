"use strict";

const electron = require("electron");
const path = require("path");

const backdropElement = document.getElementById("backdrop");
function toggleBackdrop() {
	backdropElement.classList.toggle('visible');
}

let user;
electron.ipcRenderer.on("logged-in-user", (evt, arg) => {
	user.userName = arg.userName;
	user.email = arg.email;
});


