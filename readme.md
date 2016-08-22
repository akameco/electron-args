# electron-args [![Build Status](https://travis-ci.org/akameco/electron-args.svg?branch=master)](https://travis-ci.org/akameco/electron-args)

> cli helper for electron


## Features

- Change the argument by the execution environment
- Parses arguments using [minimist](https://github.com/substack/minimist)
- Converts flags to [camelCase](https://github.com/sindresorhus/camelcase)
- Outputs app version when --version
- Outputs supplied help text when --help
- inspired by [meow](https://github.com/sindresorhus/meow)

## Install

```
$ npm install --save electron-args
```


## Usage

```js
const electron = require('electron');
const parseArgs = require('electron-args');

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
```


## API

### parseArgs(opts, [minimistOptions])

Returns an Object with:

- input (Array) - Non-flag arguments
- flags (Object) - Flags converted to camelCase
- help (string) - The help text used with --help
- showHelp([code=0]) (Function) - Show the help text and exit with code

#### options

Type: `Object` `Array` `string`

Can either be a string/array that is the `help` or an options object.

##### help

Type: `string` `boolean`
The help text you want shown.

Set it to `false` to disable it altogether.

##### version

Type: `string` `boolean`
Default: `electron.app.getVersion()`

Set a custom version output.

Set it to false to disable it altogether.

##### argv

Type: `Array`

Custom arguments object.


#### minimistOptions

Type: `Object`
Default: `{}`

Minimist options.

Keys passed to the minimist default option are decamelized, so you can for example pass in fooBar: 'baz' and have it be the default for the --foo-bar flag.

## License

MIT © [akameco](http://akameco.github.io)
