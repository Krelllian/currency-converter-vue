<template>
<account/>
</template>

<script lang="ts">
import Vue from 'vue';
import Account from '../components/Account.vue';

export default Vue.extend({
  name: 'AccountView',
  components: {
      Account
  },
});
</script>