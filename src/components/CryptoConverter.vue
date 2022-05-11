<template>
  <v-container class = "d-flex flex-column justify-center align-center text-center">
    <h1 class="display-1 ">Сrypto currency converter</h1>
    <v-text-field class="mt-5"
            v-model="currencyAmount"
            v-on:input="convertCurrency() + setHistoricalData()"
            type="number"
            style="maxWidth: 500px"
            label="Currency amount"
            outlined
          ></v-text-field>
          <div class="d-md-flex">
          <v-select class="mr-md-3"
            v-model="currency1"
            v-on:change="convertCurrency() + setHistoricalData()"
            style="width: 290px"
            :items="items"
            label="Solo field"
            solo
          ></v-select>
          <v-select class=""
            v-model="currency2"
            v-on:change="convertCurrency() + setHistoricalData()"
            style="width: 290px"
            :items="items"
            label="Solo field"
            solo
          ></v-select>
          </div>
          <div v-if="!apiError">
          <p>{{currencyAmount}} ({{currency1}}) = {{exchangeRate}} ({{currency2}})</p>
          <chart class="chart" v-if="this.currency1 !== this.currency2" :label="`${currency1}-${currency2}`"/>
          </div>
          <p v-else>We don't have this data on our server</p>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';
import Chart  from '../components/charts/Chart.vue';
import { mapActions, mapState } from 'vuex';
export default Vue.extend({
  name: 'CryptoConvecter',
  components: {
    Chart,
  },
  data: () => ({
    currency1: 'Bitcoin',
    currency2: 'Bitcoin',
    currencyAmount: 10,
    items: ['Bitcoin', 'ETH', 'USD'],
    exchangeRate: 10,
    apiError: false
  }),
  computed: {
    },
  methods: {
    setHistoricalData() {
      this.$store.dispatch('setHistoricalData', {coinId1: this.currency1.toLowerCase(), coinId2: this.currency2.toLowerCase(), days: '14'})
    },
    async convertCurrency() {
        const config = {
          headers: {
            Accept: 'application/json',
          }
        }
      console.log(this.currency1, this.currency2)
        if (this.currency1 === this.currency2) {
          this.apiError = false
          this.exchangeRate = this.currencyAmount
        } else {
          console.log('api call')
          try {
            this.apiError = false
            const exchangeRate = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${this.currency2.toLowerCase()}&ids=${this.currency1.toLowerCase()}&order=market_cap_desc&per_page=100&page=1&sparkline=false`, config);
            console.log(exchangeRate)
            this.exchangeRate = exchangeRate.data[0].current_price * this.currencyAmount
            console.log(exchangeRate)
          } catch (err) {
            console.log('err')
            this.apiError = true
          }
        }
    },
  },
});
</script>

<style scoped lang="scss">
    .chart {
        width: 500px;
        height: 500px;
        @media (max-width: 600px) {
        width: 300px;
        height: 300px;
        }
    }
</style>