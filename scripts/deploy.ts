import { ethers } from 'hardhat';
import fs from 'fs'
import { promisify} from 'util'

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const ERC20Boo = await ethers.getContractFactory("ERC20Boo");
  const boo = await ERC20Boo.deploy();
  const booContractAddress = await boo.getAddress();
  console.log("ERC20Boo address deployed:", booContractAddress);
  
  const ERC20Life = await ethers.getContractFactory("ERC20Life");
  const life = await ERC20Life.deploy();
  const lifeContractAddress = await life.getAddress();
  console.log("ERC20Life address deployed:", lifeContractAddress);

  const SingleSwap = await ethers.getContractFactory("SingleSwap");
  const singleSwap = await SingleSwap.deploy();
  const singleSwapContractAddress = await singleSwap.getAddress();
  console.log("SingleSwap address deployed:", singleSwapContractAddress);

  const MultiHopSwap = await ethers.getContractFactory("MultiHopSwap");
  const multiHopSwap = await MultiHopSwap.deploy();
  const multiHopSwapContractAddress = await multiHopSwap.getAddress();
  console.log("MultiHopSwap address deployed:", multiHopSwapContractAddress);

  let addresses = [
    `ERC20Boo_ADDRESS=${await booContractAddress}`,
    `ERC20LIFE_ADDRESS=${await lifeContractAddress}`,
    `SINGLESWAP_ADDRESS=${await singleSwapContractAddress}`,
    `MULTIHOPSWAP_ADDRESS=${await multiHopSwapContractAddress}`,
  ]
  const data = '\n' + addresses.join('\n')

  const writeFile = promisify(fs.appendFile);
  const filePath = '.env';
  return writeFile(filePath, data)
      .then(() => {
        console.log('Addresses recorded.');
      })
      .catch((error) => {
        console.error('Error logging addresses:', error);
        throw error;
      });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
