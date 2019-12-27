"use strict";

const electron = require("electron");

const closeQuitWindowButton = document.getElementById("close-quit-subWindow");
const quitYesButton = document.getElementById("quit-yes");
const quitNoButton = document.getElementById("quit-no");

closeQuitWindowButton.addEventListener("click", () => electron.remote.getCurrentWindow().close());
quitNoButton.addEventListener("click", () => electron.remote.getCurrentWindow().close());

quitYesButton.addEventListener("click", () => {
	electron.ipcRenderer.send("quit-editor-with-no-save");
	electron.remote.getCurrentWindow().close();
});