# Create Solidity Smart Contract
<p align="left">
  <a href="https://www.npmjs.com/package/@hzabala/create-solidity-smart-contract"><img src="https://img.shields.io/npm/v/@hzabala/create-solidity-smart-contract.svg" alt="npm version"></a>
  <a href="./LICENSE.md"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License MIT"/></a>
<p>

A template generator for creating smart contracts using:
- [Solidity](https://soliditylang.org/) 
- [HardHat](https://hardhat.org) 
- [Typescript](https://www.typescriptlang.org)
- [TypeChain](https://github.com/ethereum-ts/TypeChain)

## Installation
```bash
npm i -g @hzabala/create-solidity-smart-contract
```
Or
```bash
npx @hzabala/create-solidity-smart-contract <projectName>
```

## Usage
Create a project using this command:

```bash
create-solidity-smart-contract myapp
```

## Getting Started

After installing, navigate to the project and run:
```bash
npm run deploy
```
You should be able to see something like this:
```bash
Deploying a Greeter with greeting: Hello, Hardhat!
Hash 0xa9a34b54e06fb7070f541c1690c724be6893e2e4adb5eadcfe103e8205ae9697
Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```
This deploys the sample [greeter.sol](https://github.com/heanzyzabala/create-solidity-smart-contract/blob/master/template/contracts/greeter.sol) smart contract to your local Ethereum network. 

By default, running `npm run deploy` will only persist transactions temporarily. It will be purged after executing the command.

### Running a persistent node

To persist transactions, you need to run a persitent node, type:
```bash
npm run dev
```
Open a new terminal, and then run:
```bash
npm run deploy -- --network localhost
```

The `--network localhost` flag simply points the connection to the persistent node that you're running, rather than the default.

You can now persist and retrieve any transactions created in your local node which is useful if you're creating dApps and you want to test it locally.

Read more here: [Hardhat - Getting Started](https://hardhat.org/getting-started/)

## Deploying to a public testnet

After developing and testing your smart contract, you can now deploy it to an Ethereum public testnet.

A testnet is a production-like environment where you initially deploy your smart contracts before deploying them to the mainnet.
Read more here: [Ethereum - Networks](https://ethereum.org/en/developers/docs/networks)

### Connecting to Ropsten Test Network

Similar to running a local node, you would need to run a testnet node in order to deploy smart contracts to it. 
However, maintaining your own testnet node is extensive and it's not really worth it.

Fortunately, we have [Infura](https://infura.io). 
Infura is a service provider that maintains testnets and mainnet nodes for you. They'll just provide APIs for developers for access. 

Register and create a project in Infura. After creating a new project, Infura will give you a `PROJECT ID` (which is basically an API key). Navigate to your directory, and paste it as value for `INFURA_API_KEY` in the `.env` file.
```bash
INFURA_API_KEY=
DEPLOYER_PRIVATE_KEY=
```

Additionally, you also need an account to populate `DEPLOYER_PRIVATE_KEY`.  It's a wallet that you'll use to deploy smart contracts in the testnet, you need it to be funded with ETH since deploying smart contracts requires gas fees.

You can register an account in [MetaMask](https://metamask.io), set `Ropsten Test Network` as your network.
Export your private key from MetaMask and paste it as value for `DEPLOYER_PRIVATE_KEY` in `.env`.

To fund your account with ETH, just visit ether faucets like: https://faucet.ropsten.be and paste your public address. It will send you ETH for free.

### Deploying to Ropsten Test Network
After everything is set, just type:
```bash
npm run deploy -- --network ropsten
```
You'll see a similar output when deploying to a local node:
```bash
Hash 0x071059df0bfd7599868e502744f0851c28ec9d7167777066e9b7efb4597876bc
Greeter deployed to: 0xde6E94Da99EE84a90E85FFcE02c5baF2380D3248
```

You can use the transaction hash to see the transaction in [Ropsten - Etherscan](https://ropsten.etherscan.io).

The `--network ropsten` flag is configured in `hardhat.config.ts`. You can freely add or change any network (e.g. kovan, rinkeby, goerli). But in this case, I choose ropsten since it's the closet representation of the mainnet.

```typescript
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
```

## Contributing

Pull requests are welcome. Please open an issue first to discuss what you would like to change.

## License
```
MIT License

Copyright (c) 2021 Heanzy Zabala

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```