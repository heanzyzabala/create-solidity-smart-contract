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
const DEPLOYMENT_MNEMONIC = process.env.DEPLOYMENT_MNEMONIC || '';

const config: HardhatUserConfig = {
	solidity: '0.7.3',
	defaultNetwork: 'hardhat',
	networks: {
		hardhat: {},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${INFURA_API_KEY}`,
			accounts: {
				mnemonic: DEPLOYMENT_MNEMONIC,
			},
		},
	},
};

export default config;
