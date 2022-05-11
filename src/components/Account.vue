<template>
    <v-container class = "text-center">
    <h1 class="display-1 col-12">Currency portfolio</h1>
    <DoughnutChart v-bind:width="300" v-bind:height="300" :chartData="this.chartData">
    </DoughnutChart>
    <div class= "mt-4" style="display: grid; justifyContent: center">
     <v-row class="mb-5 justify-items-start" v-for="coin in coinsData" :key="coin.id" no-gutters>
         <change-currency-popup test="test" title="Decrease" type="decrease" v-bind:currency="coin.name">
    </change-currency-popup>
    <v-sheet
      color="white"
      elevation="2"
     class="align-self-center ml-2 mr-2" style="minWidth: 100px">{{coin.amount}}</v-sheet>
     <change-currency-popup test="test" title="Increase " type="increase" v-bind:currency= "coin.name">
     </change-currency-popup>
    <p class="ml-4 mb-0 align-self-center">{{coin.name}}</p>
    </v-row>
    </div>

  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapGetters, mapActions } from 'vuex'
import ChangeCurrencyPopup from './ChangeCurrencyPopup.vue';
import DoughnutChart from './charts/DoughnutChart.vue';
export default Vue.extend({
  name: 'Account',
  components: {
    ChangeCurrencyPopup,
    DoughnutChart,
  },
  computed: {
  ...mapState({
    ...mapGetters(['coinsData', 'portfolioCostInUSD']),
    chartData(){ return {
        labels: [...this.coinsData.map((coin: any) => coin.name)],
        datasets: [
          {
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [...this.coinsData.map((coin: any) => coin.amount)]
          }
        ]
      }
      },
  })
  },
  data: () => ({
  }),
  methods: {
  },
  mounted() {
    this.$store.dispatch('setAccountBalance')
  },
});
</script>

<style scoped lang="scss">

</style>