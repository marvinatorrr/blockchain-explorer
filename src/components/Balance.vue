<template>
  <div class="m-5 outline outline-2 outline-offset-2">
    <h2 class="font-bold text-8xl bg-red-500">Basic queries</h2>
    <div class="text-3xl bg-green-500">
      <p>The current block number is {{ blockNumber }}</p>
    </div>
    <div>
      <span>Enter address to check balance: </span>
      <input v-model="inputAddress" type="text" class="bg-red-400" />
      <button @click="GetAddress" class="bg-zinc-600 text-white">Submit</button>
      <div v-if="showBalance">
        The address {{ inputAddress }} has {{ balance }} Eth
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ethers, utils } from "ethers";
import { ref } from "vue";
import { useBlockStore } from "@/stores/useBlockStore";
const storeBlock = useBlockStore();
const apiKey = import.meta.env.VITE_APIKEY;
const provider = new ethers.providers.JsonRpcProvider(apiKey);
const blockNumber = ref();
const inputAddress = ref();
const balance = ref();
const showBalance = ref(false);
const GetAddress = async () => {
  balance.value = utils.formatEther(
    await provider.getBalance(inputAddress.value)
  );
  showBalance.value = true;
};

const getBlock = async () => {
  blockNumber.value = await provider.getBlockNumber();
  storeBlock.setBlockNumber(blockNumber.value);
};
getBlock();
</script>

<style scoped></style>
