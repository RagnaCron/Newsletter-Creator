"use strict";

class Newsletter {
	constructor(id, saveTime, editableHTML, mjml, html) {
		this.id = id;
		this.saveTime = saveTime;
		this.editableHTML = editableHTML;
		this.mjml = mjml;
		this.html = html;
	}
}

module.exports = Newsletter;