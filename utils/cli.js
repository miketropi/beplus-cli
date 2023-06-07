const meow = require('meow');
const meowHelp = require('cli-meow-help');

const flags = {
	clear: {
		type: `boolean`,
		default: true,
		alias: `c`,
		desc: `Clear the console`
	},
	noClear: {
		type: `boolean`,
		default: false,
		desc: `Don't clear the console`
	},
	debug: {
		type: `boolean`,
		default: false,
		alias: `d`,
		desc: `Print debug info`
	},
	version: {
		type: `boolean`,
		alias: `v`,
		desc: `Print CLI version`
	},
	name: {
		type: `string`,
		alias: `n`,
		default: `project-pack`,
		desc: `Name`
	}
};

const commands = { help: { desc: `Print help info` },
	'pp-init': { desc: `Setup "project pack" resource` },
	'sftp': { desc: `list / add / update / remove / show / put actions` }
};

const helpText = meowHelp({
	name: `be`,
	flags,
	commands
});

const options = {
	inferType: true,
	description: false,
	hardRejection: false,
	flags
};

module.exports = meow(helpText, options);
