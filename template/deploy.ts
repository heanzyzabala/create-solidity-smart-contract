import { ethers } from 'hardhat';
import { Greeter } from 'typechain/Greeter';

const main = async (): Promise<void> => {
	const contractFactory = await ethers.getContractFactory('Greeter');
	const contract = (await contractFactory.deploy('Hello, Hardhat!')) as Greeter;
	await contract.deployed();
	console.log('Hash', contract.deployTransaction.hash);
	console.log('Greeter deployed to:', contract.address);
};

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
