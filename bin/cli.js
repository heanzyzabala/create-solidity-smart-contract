#! /usr/bin/env node

const utl = require('util');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const exec = utl.promisify(require('child_process').exec);
const log = console.log;
const error = console.error;

async function setup() {
	if (process.argv.length < 3) {
		log();
		log('Please specify the project directory:');
		log();
		log('For Example:');
		log(`  ${chalk.cyan('@hzabala/create-solidity-smart-contract')} ${chalk.green('app')}`);
		log();
		process.exit(1);
	}

	const projectName = process.argv[2];
	const rootDir = path.resolve(projectName);

	try {
		fs.mkdirSync(rootDir);
	} catch (err) {
		if (err.code === 'EEXIST') {
			log();
			log(
				`Project directory ${chalk.green(
					projectName,
				)} already exists, try using a new directory name`,
			);
			log();
		} else {
			error(err);
		}
		process.exit(1);
	}

	try {
		log();
		log(`Creating new project in ${chalk.green(rootDir)}.`);
		log();

		const spinner = ora({
			color: 'cyan',
			spinner: 'dots',
		});

		spinner.start('Cloning template from repository');
		process.chdir(rootDir);
		await exec('git init');
		await exec(
			'git remote add origin https://github.com/heanzyzabala/create-solidity-smart-contract.git',
		);
		await exec('git config core.sparsecheckout true');
		await exec('echo "template" >> .git/info/sparse-checkout');
		await exec('git pull --depth=1 origin master');
		await exec('mv template/.env.example template/* .');
		await exec('rm -r template');
		await exec('mv .env.example .env');
		await exec('rm -rf .git');
		await exec('git init');
		if (spinner.isSpinning) {
			spinner.succeed();
		}

		spinner.start('Installing dependencies. It might take a few seconds.');
		await exec('npm install');
		if (spinner.isSpinning) {
			spinner.succeed();
		}

		log();
		log(`Done! Created ${projectName} at ${rootDir}`);
		log();
		log('  You can get started by typing:');
		log();
		log(`  ${chalk.cyan('cd')} ${projectName}`);
		log(`  ${chalk.cyan('npm')} run ${chalk.cyan('dev')}`);
		log();
		log('  Open a new terminal, and inside the project, type:');
		log();
		log(`  ${chalk.cyan('npm')} run ${chalk.cyan('deploy')}`);
		log();
		log(`  This deploys the ${chalk.cyan('greeter.sol')} contract in your local node.`);
		log();
	} catch (err) {
		error(err);
		process.exit(1);
	}
}

setup();
