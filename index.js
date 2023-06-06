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
const fetch = require('node-fetch');
const Table = require('cli-table');

const input = cli.input;
const flags = cli.flags;
const { clear, debug } = flags;

const ENDPOINT = 'https://api-ap-northeast-1.hygraph.com/v2/clijly8cu041k01uoe0f8chsb/master';

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
			url: `https://auth-beplus-cli.beplusprojects.com/auth.php`,
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

				fs.writeFile('./auth.log', authBody, err => {
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
		fs.unlinkSync('./auth.log');
		console.log('Logout successful.');
	}

	/**
	 * Search sFTP Config
	 */
	if(input.includes(`search-sftp`)) {
		let [command, searchName] = input;
		searchName = searchName ?? '';
		const _SEARCH_SFTP = `query searchsFtpConfig {
			sFtpInformations(where: {_search: "${ searchName }"}) {
				id
				name
				lastUpdatedMember
				config
			}
		}
		`;

		fetch(ENDPOINT, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify({ query: _SEARCH_SFTP }),
		})
			.then(r => r.json())
			.then(data => {
				var table = new Table({
					head: Object.keys(data.data.sFtpInformations[0])
				});

				data.data.sFtpInformations.forEach((item, _index) => {
					let _item = Object.values(item).map(_i => (_i ? _i : ''));
					table.push(_item);
				});

				console.log(table.toString());
			})
	}

	/**
	 * sFtp
	 */
	if(input.includes(`sftp`)) {

	}
})();
