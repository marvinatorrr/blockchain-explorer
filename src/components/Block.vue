<template>
  <div class="m-5 outline outline-2 outline-offset-2">
    <h2 class="font-bold text-8xl bg-red-500">Get latest block transactions</h2>
    <div class="text-3xl bg-green-500">
      <p>The current block number is {{ blockNumber }}</p>
    </div>
    <div>
      <button @click="getTransactions" class="bg-zinc-600 text-white">
        Get it!
      </button>

      <table v-if="finishedLoading">
        <p>Timestamp: {{ timestamp }}</p>
        <tr>
          <th>Hash</th>
          <th>From</th>
          <th>To</th>
          <th>Value (Eth)</th>
          <th>Fee (Eth)</th>
        </tr>
        <tr v-for="transaction in transactions">
          <td>
            {{ transaction.hash }}
          </td>
          <td>
            {{ transaction.from }}
          </td>
          <td>
            {{ transaction.to }}
          </td>
          <td>
            {{ ethers.utils.formatEther(transaction.value) }}
          </td>
          <td>
            {{
              ethers.utils.formatEther(
                transaction.gasPrice.mul(transaction.gasLimit)
              )
            }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBlockStore } from "@/stores/useBlockStore";
import { computed } from "@vue/reactivity";
import { ethers } from "ethers";
import { ref } from "vue";
import moment from "moment";
const transactions = ref();
const finishedLoading = ref(false);
const timestamp = ref();
const blockStore = useBlockStore();
const apiKey = import.meta.env.VITE_APIKEY;
const provider = new ethers.providers.JsonRpcProvider(apiKey);
const blockNumber = computed(() => {
  return blockStore.getBlockNumber;
});
const getTransactions = async () => {
  finishedLoading.value = false;
  const latestBlock = await provider.getBlockNumber();
  blockStore.setBlockNumber(latestBlock.toString());
  const blockWithTransactions = await provider.getBlockWithTransactions(
    latestBlock
  );
  timestamp.value = moment
    .unix(blockWithTransactions.timestamp)
    .format("DD-MM-YYYY HH:mm:ss");
  transactions.value = blockWithTransactions.transactions;
  finishedLoading.value = true;
};
</script>

<style scoped></style>
