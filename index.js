'use strict';
const app = require('electron').app;
const isDev = require('electron-is-dev');
const minimist = require('minimist');
const redent = require('redent');
const camelcaseKeys = require('camelcase-keys');
const decamelizeKeys = require('decamelize-keys');

module.exports = (opts, minimistOpts) => {
	if (Array.isArray(opts) || typeof opts === 'string') {
		opts = {help: opts};
	}

	opts = Object.assign({
		argv: process.argv.slice(isDev ? 2 : 1)
	}, opts);

	minimistOpts = minimistOpts || {};

	minimistOpts.default = decamelizeKeys(minimistOpts.default || {}, '-');

	const argv = minimist(opts.argv, minimistOpts);

	const help = redent((opts.help || '').replace(/\t+\n*$/, ''), 2);

	const showHelp = code => {
		console.log(help);
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(code || 0);
	};

	if (argv.version && opts.version !== false) {
		console.log(typeof opts.version === 'string' ? opts.version : app.getVersion());
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(0);
	}

	if (argv.help && opts.help !== false) {
		showHelp();
	}

	const flags = camelcaseKeys(argv, {exclude: ['--', /^\w$/]});

	const input = argv._;
	delete argv._;

	return {
		input,
		flags,
		showHelp,
		help
	};
};
