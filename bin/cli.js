const utl = require('util');
const fs = require('fs');
const path = require('path');
const { executionAsyncId } = require('async_hooks');

const exec = utl.promisify(require('child_process').exec);

const log = console.log;
const error = console.error;

async function setup() {
	if (process.argv.length < 3) {
		log('Please specify project name.');
		log('Example:');
		log('   npx @hzabala/create-solidity-smart-contract myApp');
		log('      OR');
		log('   @hzabala/create-solidity-smart-contract myApp');
		process.exit(1);
	}

	const projectName = process.argv[2];
	const rootDir = path.resolve(projectName);

	log(`Creating new project in ${rootDir}`);

	try {
		fs.mkdirSync(rootDir);
	} catch (err) {
		if (err.code === 'EEXIST') {
			log('Project directory already exists. Choose another directory.');
		} else {
			error(err);
		}
		process.exit(1);
	}

	try {
		log('Cloning template from repository');
		process.chdir(rootDir);
		await exec('git init');
		await exec('git remote add origin https://github.com/heanzyzabala/create-express-api.git');
		await exec('git config core.sparseCheckout true');
		await exec('echo "template/*"> .git/info/sparse-checkout');
		await exec('git pull --depth=1 origin master');

		log('Installing dependencies');
		await exec('npm install');

		log('Done');
	} catch (err) {
		error(err);
		process.exit(1);
	}
}

setup();
