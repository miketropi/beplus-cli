#!/usr/bin/env node

/**
 * BeplusCli
 * ...
 *
 * @author Mike <#>
 */

const init = require('./utils/init');
const cli = require('./utils/cli');
const log = require('./utils/log');
const shell = require('shelljs');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	if(input.includes(`pp-init`)) {
		console.log(`Project Pack clone...`);
		shell.exec(`git clone git@github.com:miketropi/project-pack.git ${ flags.name }`);
		console.log(`Done!`);
	}
})();
