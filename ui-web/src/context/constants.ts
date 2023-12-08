import ERC20Boo from "./ERC20Boo.json";
import ERC20Life from "./ERC20Life.json";
import SingleSwap from "./SingleSwap.json";
import MultiHopSwap from "./MultiHopSwap.json";
import IWETH from "./IWETH.json"

// export const ERC20Boo_ADDRESS = import.meta.env.VITE_ERC20Boo_ADDRESS
export const ERC20Boo_ADDRESS = import.meta.env.VITE_ERC20Boo_ADDRESS
export const ERC20BooAbi = ERC20Boo.abi

export const ERC20LIFE_ADDRESS = import.meta.env.VITE_ERC20LIFE_ADDRESS
export const ERC20LifeAbi = ERC20Life.abi

export const SINGLESWAP_ADDRESS = import.meta.env.VITE_SINGLESWAP_ADDRESS
export const SingleSwapAbi = SingleSwap.abi

export const  MULTIHOPSWAP_ADDRESS = import.meta.env.VITE_MULTIHOPSWAP_ADDRESS
export const MultiHopSwapAbi = MultiHopSwap.abi

export const IWETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
export const IWETHAbi = IWETH.abi
