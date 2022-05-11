<template>
<crypto-convecter/>
</template>

<script lang="ts">
import Vue from 'vue';
import CryptoConvecter from '../components/CryptoConverter.vue'
export default Vue.extend({
  name: 'CryptoConverterView',
  components: {
      CryptoConvecter
  },
});
</script>