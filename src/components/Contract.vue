<template>
  <div class="m-5 outline outline-2 outline-offset-2">
    <h2 class="font-bold text-8xl bg-red-500">Smart Contracts</h2>
    <div class="text-3xl bg-green-500">
      <p>Explore a smart contract!</p>
    </div>
    <div>
      <span>Enter smart contract address: </span>
      <input v-model="contractAddress" type="text" class="bg-red-400" />
      <button @click="getContract" class="bg-zinc-600 text-white">
        Submit
      </button>
      <div v-if="finishedLoading && !isLoading">
        <p>Name: {{ name }}</p>
        <p>Symbol: {{ symbol }}</p>
        <p>Total Supply: {{ totalSupply }}</p>
        <p>Enter address to get balance:</p>
        <div>
          <input v-model="address" type="text" class="bg-red-400" />
          <button @click="getBalance" class="bg-zinc-600 text-white">
            Submit
          </button>
          <p>Balance is: {{ balance }} {{ symbol }}</p>
        </div>
      </div>
      <div v-if="isLoading">
        <p>Loading smart contract!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ethers, utils } from "ethers";
import { ref } from "vue";
const apiKey = import.meta.env.VITE_APIKEY;
const provider = new ethers.providers.JsonRpcProvider(apiKey);
const contractAddress = ref("0x6B175474E89094C44Da98b954EedeAC495271d0F");
const name = ref();
const symbol = ref();
const totalSupply = ref();
const finishedLoading = ref(false);
const isLoading = ref(false);
const address = ref("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];
const balance = ref("...");
const getContract = async () => {
  try {
    isLoading.value = true;
    const contract = new ethers.Contract(contractAddress.value, abi, provider);
    name.value = await contract.name();
    symbol.value = await contract.symbol();
    totalSupply.value = await contract.totalSupply();
    finishedLoading.value = true;
    isLoading.value = false;
  } catch (error) {}
};

const getBalance = async () => {
  const contract = new ethers.Contract(contractAddress.value, abi, provider);
  balance.value = utils.formatEther(await contract.balanceOf(address.value));
};
</script>

<style scoped></style>
