

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

let draggingElement = null;
let counter = 0;

oneColumn.addEventListener('dragstart', () => {
	draggingElement = 1;
});

twoColumns.addEventListener('dragstart', () => {
	draggingElement = 2;
});

panelThree.addEventListener('dragstart', () => {
	draggingElement = 3;
});

line.addEventListener('dragstart', () => {
	draggingElement = 4;
});

let editors = [];

placeholder.addEventListener('drop', () => {
	if (draggingElement === 1) {
		document.getElementsByClassName("insertion-area")[0].innerHTML +=
			`<div id="${counter}" class="mjml-columns ${draggingElement}"> 
				<div style="width: 98%" class="froala-editor" id="editor${counter + 1}"></div>
			</div>`;
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		counter = counter + 2;
	} else if (draggingElement === 2) {
		document.getElementsByClassName("insertion-area")[0].innerHTML +=
			`<div id="${counter}" class="mjml-columns ${draggingElement}">
				<div style="width: 48%" class="froala-editor" id="editor${counter + 1}"></div>
				<div style="width: 48%" class="froala-editor" id="editor${counter + 2}"></div>
			</div>`;
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		editors.push(new FroalaEditor(`#editor${counter + 2}`));
		counter = counter + 3;
	} else if (draggingElement === 3) {
		document.getElementsByClassName("insertion-area")[0].innerHTML +=
			`<div id="${counter}" class="mjml-columns ${draggingElement}">
				<div style="width: 31%" class="froala-editor" id="editor${counter + 1}"></div>
				<div style="width: 31%" class="froala-editor" id="editor${counter + 2}"></div>
				<div style="width: 31%" class="froala-editor" id="editor${counter + 3}"></div>
			</div>`;
		editors.push(new FroalaEditor(`#editor${counter + 1}`));
		editors.push(new FroalaEditor(`#editor${counter + 2}`));
		editors.push(new FroalaEditor(`#editor${counter + 3}`));
		counter = counter + 4;
	} else if (draggingElement === 4) {
		document.getElementsByClassName("insertion-area")[0].innerHTML +=
			`<hr id="${counter}" class="mjml-columns ${draggingElement}">`;
		counter++;
	}
	// parse();
});

placeholder.addEventListener('dragover', (evt) => {
	evt.preventDefault();
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
		}
		else if (element.className === "mjml-columns 2") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 1)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 2)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t";
		}
		else if (element.className === "mjml-columns 3") {
			mjmlCode += "\t<mj-section>\n\t\t\t<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 1)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 2)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t\t"
				+ "<mj-column>\n\t\t\t\t<mj-raw>"
				+ getText(Number(element.id) + 3)
				+ "</mj-raw>\n\t\t\t</mj-column>\n\t\t</mj-section>\n\t";
		}
		else if (element.className === "mjml-columns 4") {
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