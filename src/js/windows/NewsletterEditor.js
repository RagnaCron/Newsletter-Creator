"use strict";
//---------------------------------------------------------------------------//
//                                                                           //
// Editor: Basics by Vinzenc Gregori, extended and changes by Manuel Werder. //
//                                                                           //
//---------------------------------------------------------------------------//
const oneColumn = document.getElementById("one-column");
const twoColumns = document.getElementById("two-columns");
const panelThree = document.getElementById("three-columns");
const line = document.getElementById("line");
const placeholder = document.getElementsByClassName("placeholder")[0];
const emptyFolder = document.getElementById("empty-folder");

let draggingElement = null;
let counter = 0;

oneColumn.addEventListener("dragstart", () => {
	draggingElement = 1;
});

twoColumns.addEventListener("dragstart", () => {
	draggingElement = 2;
});

panelThree.addEventListener("dragstart", () => {
	draggingElement = 3;
});

line.addEventListener("dragstart", () => {
	draggingElement = 4;
});

let editors = [];

let elementForTrash;

function setElementForTrash(element) {
	elementForTrash = element;
}

function columnsEvents(id) {
	const element = document.getElementById(id);
	element.addEventListener("dragstart", () => setElementForTrash(element));
}

emptyFolder.addEventListener("dragover", (evt) => evt.preventDefault());

emptyFolder.addEventListener("drop", () => {
	elementForTrash.removeEventListener("dragstart", setElementForTrash);
	document.getElementsByClassName("insertion-area")[0].removeChild(elementForTrash);
	elementForTrash = null;
});

placeholder.addEventListener("dragover", (evt) => evt.preventDefault());

placeholder.addEventListener("drop", () => {
	if (draggingElement === 1) {
		document.getElementsByClassName("insertion-area")[0].insertAdjacentHTML("beforeend",
			`<div id="${counter}" class="mjml-columns ${draggingElement}" draggable="true"> 
				<div style="width: 98%" class="froala-editor" id="editor${counter + 1}"></div>
			</div>`);
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		columnsEvents(counter);
		counter = counter + 2;
	} else if (draggingElement === 2) {
		document.getElementsByClassName("insertion-area")[0].insertAdjacentHTML("beforeend",
			`<div id="${counter}" class="mjml-columns ${draggingElement}" draggable="true">
				<div style="width: 48%" class="froala-editor" id="editor${counter + 1}"></div>
				<div style="width: 48%" class="froala-editor" id="editor${counter + 2}"></div>
			</div>`);
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		editors.push(new FroalaEditor(`#editor${counter + 2}`));
		columnsEvents(counter);
		counter = counter + 3;
	} else if (draggingElement === 3) {
		document.getElementsByClassName("insertion-area")[0].insertAdjacentHTML("beforeend",
			`<div id="${counter}" class="mjml-columns ${draggingElement}" draggable="true">
				<div style="width: 31%" class="froala-editor" id="editor${counter + 1}"></div>
				<div style="width: 31%" class="froala-editor" id="editor${counter + 2}"></div>
				<div style="width: 31%" class="froala-editor" id="editor${counter + 3}"></div>
			</div>`);
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		editors.push(new FroalaEditor(`#editor${counter + 2}`));
		editors.push(new FroalaEditor(`#editor${counter + 3}`));
		columnsEvents(counter);
		counter = counter + 4;
	} else if (draggingElement === 4) {
		document.getElementsByClassName("insertion-area")[0].insertAdjacentHTML("beforeend",
			`<hr id="${counter}" class="mjml-columns ${draggingElement}" draggable="true">`);
		columnsEvents(counter);
		counter++;
	}
});

function parse() {
	const mjmlElements = document.getElementsByClassName("mjml-columns");
	console.log(mjmlElements);
	let mjmlCode = "<mjml>\n\t<mj-body>\n\t";
	for (let element of mjmlElements) {
		if (element.className === "mjml-columns 1") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 1)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t";
		} else if (element.className === "mjml-columns 2") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 1)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 2)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t";
		} else if (element.className === "mjml-columns 3") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 1)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 2)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 3)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t";
		} else if (element.className === "mjml-columns 4") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-divider/>\n\t\t\t"
				+ "</mj-column>\n\t\t</mj-section>\n\t"
		}
	}
	mjmlCode += "</mj-body>\n</mjml>";
	console.log(mjmlCode);
}

function getText(id) {
	for (let editorElement of editors) {
		if (editorElement.$box[0].getAttribute("id") === "editor" + id) {
			return editorElement.html === undefined ? "" : editorElement.html.get();
		}
	}
}

//---------------------------------------------------------------------------//
//                                                                           //
// Electron binding.                                                         //
//                                                                           //
//---------------------------------------------------------------------------//

const backdropElement = document.getElementById("backdrop");
function toggleBackdrop() {
	backdropElement.classList.toggle('visible');
}

const previewButton = document.getElementById("preview-content");
const saveButton = document.getElementById("save-content");
const quitButton = document.getElementById("quit-editor");

// const electron = require('electron');
// const path = require('path');
// const ipc = electron.ipcRenderer;
const BrowserWindow = electron.remote.BrowserWindow;

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

quitButton.addEventListener("click", quit);
function quit() {
	const registerHTML = path.join('file://', __dirname, 'QuitEditor.html');

	subWindow = createWindow(600, 320);
	subWindow.webContents.openDevTools();

	subWindow.on('close', () => {
		subWindow = null;
		toggleBackdrop();
	});
	subWindow.loadURL(registerHTML).then(() => {
		toggleBackdrop();
		subWindow.show();
	});
}
















