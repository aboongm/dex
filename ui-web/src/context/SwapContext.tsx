import React, { useState, useEffect, createContext, ReactNode } from "react";
import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithERC20Boo,
    connectingWithERC20Life,
    connectingSingleSwap,
    connectingMultihopSwap,
    connectingIWETH,
    connectingDai,
    connectingUSDC,
} from "../utils/appFeatures";

import { IWETHAbi } from "./constants";
import ERC20 from "./ERC20.json";

type SwapTokenContextProps = {
    children: ReactNode;
};

type SwapContextType = {
    // Define your context structure here
    swap: string;
    // Add more context properties as needed
};

export const SwapTokenContext = createContext<SwapContextType>({ swap: "" });

export const SwapTokenContextProvider = ({ children }: SwapTokenContextProps) => {
    const swap = "Welcome to swap my token";

    const [account, setAccount] = useState('')
    const [ether, setEther] = useState('')
    const [networkConnect, setNetworkConnect] = useState('')
    const [weth9, setWeth9] = useState('')
    const [dai, setDai] = useState('')

    const [tokenData, setTokenData] = useState([])

    const addToken = [
        import.meta.env.VITE_ERC20Boo_ADDRESS,
        import.meta.env.VITE_ERC20LIFE_ADDRESS,
        import.meta.env.VITE_SINGLESWAP_ADDRESS,
    ]

    const fetchingData = async () => {
        try {
            // const userAccount = await checkIfWalletConnected()
            // setAccount(userAccount)
            // const web3modal = new Web3Modal()
            // const connection = await web3modal.connect()
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const balance = await provider.getBalance(signer)
            console.log("balance: ", balance);
            const ethValue = ethers.formatEther(balance)
            console.log('ETH Balance:', ethValue);
            console.log( signer);
            

            const tokenBalances = await Promise.all(addToken.map(async (tokenAddress) => {
                const contract = new ethers.Contract(tokenAddress, ERC20.abi, signer);
                console.log(await contract.totalSupply());

                try {
                    // const userBalance = await contract.balanceOf(signer.address);
                    const userAddress = await signer.getAddress();
                    console.log(userAddress);
                    
                    const userBalance = await contract.balanceOf(userAddress);

                    console.log(await userBalance);
                    
                } catch (error) {
                    console.log(error);
                    
                }
                
                
                // const convertUserBalance = ethers.formatEther(userBalance);
                // console.log('Token Address:', tokenAddress, "\ncontract: ", contract);
                // console.log('User Balance:', convertUserBalance);
                return {
                    tokenAddress,
                    // userBalance: convertUserBalance
                };
            }));

            // tokenBalances now holds an array of objects containing token addresses and user balances
            console.log('All Token Balances:', tokenBalances);


        } catch (error) {
            console.log("Error from here: ", error);

        }
    }

    useEffect(() => {
        fetchingData()
    }, [])

    return (
        <SwapTokenContext.Provider value={{ swap }}>
            {children}
        </SwapTokenContext.Provider>
    );
};