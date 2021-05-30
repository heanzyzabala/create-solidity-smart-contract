import * as dotenv from 'dotenv';
dotenv.config();

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';

import { task } from 'hardhat/config';
import { HardhatUserConfig } from 'hardhat/types';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
	const accounts = await hre.ethers.getSigners();
	for (const account of accounts) {
		console.log(account.address);
	}
});

const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const DEPLOYER_PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY || '';

const config: HardhatUserConfig = {
	solidity: '0.7.3',
	defaultNetwork: 'hardhat',
	networks: {
		ropsten: {
			url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
			accounts: [`0x${DEPLOYER_PRIVATE_KEY}`],
		},
	},
};

export default config;
