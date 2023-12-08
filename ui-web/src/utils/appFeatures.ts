import { ethers } from 'ethers'
import Web3Modal from 'web3modal'

import {
    ERC20Boo_ADDRESS,
    ERC20BooAbi,
    ERC20LIFE_ADDRESS,
    ERC20LifeAbi,
    SINGLESWAP_ADDRESS,
    SingleSwapAbi,
    MULTIHOPSWAP_ADDRESS,
    MultiHopSwapAbi,
    IWETH_ADDRESS,
    IWETHAbi
} from "../context/constants"

export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install Metamask!")
        }

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAccount = accounts[0]
        return firstAccount;
    } catch (error) {
        console.log(error)
    }
}

export const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            console.log("Install Metamask!")
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstAccount = accounts[0]
        return firstAccount;
    } catch (error) {
        console.log(error)
    }
}


export const fetchERC20BooContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(ERC20Boo_ADDRESS, ERC20BooAbi, signerOrProvider)

export const connectingWithERC20Boo = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchERC20BooContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}


export const fetchERC20LifeContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(ERC20LIFE_ADDRESS, ERC20LifeAbi, signerOrProvider)

export const connectingWithERC20Life = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchERC20LifeContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}


export const fetchSingleSwapContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(SINGLESWAP_ADDRESS, SingleSwapAbi, signerOrProvider)

export const connectingSingleSwap = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchSingleSwapContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}


export const fetchMultiHopSwapContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(MULTIHOPSWAP_ADDRESS, MultiHopSwapAbi, signerOrProvider)

export const connectingMultihopSwap = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchMultiHopSwapContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}


export const fetchIWETHContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(IWETH_ADDRESS, IWETHAbi, signerOrProvider)

export const connectingIWETH = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchIWETHContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}

const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
export const fetchIDaiContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(DAI_ADDRESS, IWETHAbi, signerOrProvider)

export const connectingDai = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchIDaiContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}


const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"
export const fetchIUSDCContract = (signerOrProvider: ethers.JsonRpcSigner | ethers.ContractRunner | null | undefined) => new ethers.Contract(USDC_ADDRESS, IWETHAbi, signerOrProvider)

export const connectingUSDC = async () => {
    try {
        const web3modal = new Web3Modal()
        const connection = await web3modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection) 
        const provider = new ethers.BrowserProvider(connection);
        const signer = await provider.getSigner();
        const contract = fetchIUSDCContract(signer)
        return contract
    } catch (error) {
        console.log(error)
    }
}

