"use strict";

function getNewsletterTemplate(app) {
	const electron = require("electron");
	return [
		{
			label: "Menu",
			submenu: [
				{
					label: "Overview",
					accelerator: "CmdOrCtrl+Shift+V"
				},
				{type: 'separator'},
				{
					label: 'New Newsletter',
					// click() {
					// 	electron.remote.ipcRenderer.send("open-mjml-editor");
					// },
					accelerator: "CmdOrCtrl+Shift+N"
				},
				{type: 'separator'},
				{
					label: "Logout",
					// click() {
					//
					// },
					accelerator: "CmdOrCtrl+Shift+Alt+Q"
				},
				{
					label: 'Exit',
					click() {
						app.quit();
					},
					accelerator: "CmdOrCtrl+Q"
				},
			]
		},
		{
			label: "Help",
			submenu: [
				{
					label: 'Learn More',
					click: async () => {
						const { shell } = require('electron');
						await shell.openExternal('https://electronjs.org');
					}
				},
				{ type: "separator" },
				{
					label: 'Newsletter Editor'
				}
			]
		}
	];
}

module.exports = getNewsletterTemplate;