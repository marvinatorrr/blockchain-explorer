<script lang="ts">
import Balance from "./components/Balance.vue";
import Contract from "./components/Contract.vue";
import Block from "./components/Block.vue";
export default {
  name: "home",
  setup() {},
  components: { Balance, Contract, Block },
};
</script>

<template>
  <Balance />
  <Contract />
  <Block />
</template>
