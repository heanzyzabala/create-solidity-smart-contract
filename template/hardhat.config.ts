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

// Hash 0x04bef269a4328ccf4221ff5656409819ea912eac44a162b86d4b722fd67b4bc9
// Greeter deployed to: 0x698af1e1AE97a6B8e24fC858e0062a06C6c31411

// Hash 0x4ab42f768ac30e8551ce21b8b12d0356154ea1d1f1f9e1d9741a202661639cc4
// Greeter deployed to: 0xccB09534d66eC80569239b1ed0907e7C5e4dDbe4

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
