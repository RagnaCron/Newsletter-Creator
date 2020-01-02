"use strict";

const electron = require("electron");

const quitSaveSubWindowButton = document.getElementById("close-save-subWindow");
const saveButton = document.getElementById("save-yes");
const saveAndQuitButton = document.getElementById("save-and-quit-yes");
const cancelButton = document.getElementById("save-cancel");

quitSaveSubWindowButton.addEventListener("click", () => electron.remote.getCurrentWindow().close());
cancelButton.addEventListener("click", () => electron.remote.getCurrentWindow().close());

saveButton.addEventListener("click", () => {

	electron.remote.getCurrentWindow().close();
});

saveAndQuitButton.addEventListener("click", () => {

	electron.remote.getCurrentWindow().close();
});