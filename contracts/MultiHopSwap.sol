// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.7.0 < 0.9.0;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract MultiHopSwap {
     ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);

    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant WETH9 = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; 

    // For this example, we will set the pool fee to 0.3%.
    uint24 public constant poolFee = 3000;

    function swapExactInputMultiHop(uint amountIn) external returns (uint amountOut) {
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountIn);

        TransferHelper.safeApprove(WETH9, address(swapRouter), amountIn);

        ISwapRouter.ExactInputParams memory params = ISwapRouter.ExactInputParams({
             path: abi.encodePacked(WETH9, poolFee, USDC, poolFee, DAI),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountIn: amountIn,
                amountOutMinimum: 0
        });

        // Executes the swap.
        amountOut = swapRouter.exactInput(params);
    }

    function swapExactOutputMultihop(uint256 amountOut, uint256 amountInMaximum) external returns (uint256 amountIn) {
        // Transfer the specified `amountInMaximum` to this contract.
        TransferHelper.safeTransferFrom(WETH9, msg.sender, address(this), amountInMaximum);
        // Approve the router to spend  `amountInMaximum`.
        TransferHelper.safeApprove(WETH9, address(swapRouter), amountInMaximum);

        // The parameter path is encoded as (tokenOut, fee, tokenIn/tokenOut, fee, tokenIn)
        // The tokenIn/tokenOut field is the shared token between the two pools used in the multiple pool swap. In this case USDC is the "shared" token.
        // For an exactOutput swap, the first swap that occurs is the swap which returns the eventual desired token.
        // In this case, our desired output token is WETH9 so that swap happpens first, and is encoded in the path accordingly.
        ISwapRouter.ExactOutputParams memory params =
            ISwapRouter.ExactOutputParams({
                path: abi.encodePacked(DAI, poolFee, USDC, poolFee, WETH9),
                recipient: msg.sender,
                deadline: block.timestamp,
                amountOut: amountOut,
                amountInMaximum: amountInMaximum
            });

        // Executes the swap, returning the amountIn actually spent.
        amountIn = swapRouter.exactOutput(params);

        // If the swap did not require the full amountInMaximum to achieve the exact amountOut then we refund msg.sender and approve the router to spend 0.
        if (amountIn < amountInMaximum) {
            TransferHelper.safeApprove(WETH9, address(swapRouter), 0);
            TransferHelper.safeTransferFrom(WETH9, address(this), msg.sender, amountInMaximum - amountIn);
        }
    }
}