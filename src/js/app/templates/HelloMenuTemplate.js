"use strict";

function getHelloTemplate(app) {
	return [
		{
			label: "Menu",
			submenu: [
				{
					label: "Login",
				},
				{type: 'separator'},
				{
					label: "Register"
				},
				{type: 'separator'},
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

module.exports = getHelloTemplate;