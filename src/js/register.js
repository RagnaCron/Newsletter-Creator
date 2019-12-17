const electron = require("electron");
const remote = electron.remote;

const closeButton = document.getElementById("close-registration-form");
closeButton.addEventListener("click", () => {
	remote.getCurrentWindow().close();
});