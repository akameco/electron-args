'use strict';
const electron = require('electron');
const parseArgs = require('./index');

const cli = parseArgs(`
	sample-viewer

	Usage
	  $ sample-viewer [path]

	Options
	  --help     show help
	  --version  show version
	  --auto     slide show [Default: false]

	Examples
	  $ sample-viewer . --auto
	  $ sample-viewer ~/Pictures/
`, {
	alias: {
		h: 'help'
	},
	default: {
		auto: false
	}
});


console.log(cli.flags);
console.log(cli.input[0]);

electron.app.on('ready', () => {
	const win = new electron.BrowserWindow({width: 400, height: 400});
	win.loadURL(`file://${__dirname}/fixture.html`);
});

