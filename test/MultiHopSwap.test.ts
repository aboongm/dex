import { expect } from "chai";
import { ethers } from "hardhat";
import { MultiHopSwap, IWETH, IERC20 } from "../typechain-types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("MultiHopSwap", () => {
    let multiHopSwap: MultiHopSwap;
    let accounts: HardhatEthersSigner[];
    let weth: IWETH;
    let dai: IERC20;
    let usdc: IERC20;

    before(async() => {
        accounts = await ethers.getSigners();

        const MultiHopSwap = await ethers.getContractFactory("MultiHopSwap");
        multiHopSwap = await MultiHopSwap.deploy();
        await multiHopSwap.waitForDeployment()

        weth = await ethers.getContractAt("IWETH", WETH9);
        dai = await ethers.getContractAt("IERC20", DAI);
        usdc = await ethers.getContractAt("IERC20", USDC);

    })

    it("swapExactInputMultihop", async () => {
        const amountIn = 10n ** 18n;
        await weth.deposit({ value: amountIn })
        await weth.approve(multiHopSwap.getAddress(), amountIn)
        await multiHopSwap.swapExactInputMultiHop(amountIn)
        console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
    })

    it("swapExactOutputMultihop", async () => {
        const wethAmountInMax = 10n ** 18n;
        const daiAmountOut = 100n * 10n ** 18n;

        await weth.deposit({ value: wethAmountInMax })
        await weth.approve(multiHopSwap.getAddress(), wethAmountInMax)
        await multiHopSwap.swapExactOutputMultihop(daiAmountOut, wethAmountInMax)
        console.log(accounts[0].address);
        console.log("DAI balance: ", await dai.balanceOf(accounts[0].address));
        console.log(accounts[1].address);
        console.log("DAI balance: ", await dai.balanceOf(accounts[1].address));
        
    })

    // it("should swap exact input with multihop", async () => {
    //     const amountIn = ethers.parseEther("1"); // 1 WETH
    //     await weth.deposit({ value: amountIn });
    //     await weth.approve(multiHopSwap.getAddress(), amountIn);
    //     await multiHopSwap.swapExactInputMultiHop(amountIn);

    //     const daiBalance = await dai.balanceOf(accounts[0].address);
    //     expect(daiBalance).to.be.gt(0, "DAI balance should be greater than 0");
    // });

    // it("should swap exact output with multihop", async () => {
    //     const daiAmountOut = ethers.parseEther("100"); // 100 DAI
    //     const wethAmountInMax = ethers.parseEther("10"); // Maximum input of 10 WETH

    //     await weth.deposit({ value: wethAmountInMax });
    //     await weth.approve(multiHopSwap.getAddress(), wethAmountInMax);

    //     const initialWethBalance = await weth.balanceOf(accounts[0].address);
    //     await multiHopSwap.swapExactOutputMultihop(daiAmountOut, wethAmountInMax);

    //     const finalWethBalance = await weth.balanceOf(accounts[0].address);
    //     expect(finalWethBalance).to.be.gt(initialWethBalance, "WETH balance should increase");
    // });
})