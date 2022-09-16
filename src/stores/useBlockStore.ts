import { BigNumber, ethers } from "ethers";
import { defineStore } from "pinia";

export const useBlockStore = defineStore({
    id: 'block',
    state: () => ({
        blockNumber: "my block number",
    }),
    actions: {
        setBlockNumber(blockNumber: string) {
            this.blockNumber = blockNumber
        }
    },
    getters: {
        getBlockNumber: (state) => {
            return state.blockNumber
        }

    }
})