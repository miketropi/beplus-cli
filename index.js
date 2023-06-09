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
const request = require('request');
const fs = require('fs');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const { AUTH_URL, PATH_AUTH_LOG } = require('./config')();

(async () => {
	init({ clear });
	input.includes(`help`) && cli.showHelp(0);
	debug && log(flags);

	/**
	 * Project pack Init
	 */
	if(input.includes(`pp-init`)) {
		console.log(`Project Pack clone...`);
		shell.exec(`git clone git@github.com:miketropi/project-pack.git ${ flags.name }`);
		console.log(`Done!`);
	}

	/**
	 * Beplus Auth (Login)
	 */
	if(input.includes(`auth`)) {
		let [command, username, password] = input;
		if (!username || !password) {
			console.log('Please provide username and password');
			console.log('Usage: auth <username> <password>');
			process.exit(1);
		}

		request.post({
			url: AUTH_URL,
			form: {
				user: username,
				pass: password,
			}
		}, (err, res, body) => {
			if(res.statusCode === 200 && body === 'Auth successful!!!') {
				console.log('Auth successful.');
				const authBody = JSON.stringify({
					user: username,
					pass: password,
				});

				fs.writeFile(PATH_AUTH_LOG, authBody, err => {
					if (err) {
						console.error(err);
					}
				});
			} else {
				console.log('Auth failed!!!');
			}
		});
	}

	/**
	 * Beplus Logout
	 */
	if(input.includes(`logout`)) {
		let path = PATH_AUTH_LOG;
		if (fs.existsSync(path)) {
			fs.unlinkSync(path);
			console.log('Logout successful.');
		} else {
			console.log('You are not logged in.');
		}
	}

	/**
	 * sFtp
	 */
	if(input.includes(`sftp`)) {
		const sftpHelpers = require('./src/features/sftpHelpers'); 
		let [command, action, ...args] = input;
		sftpHelpers(action, ...args) 
	}
})();
