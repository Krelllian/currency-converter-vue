<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         v-if="type === 'decrease'"
         outlined
         x-small
         fab
         color="warning darken-3"
         style="height: 25px; width: 25px; align-self-center;"
         v-bind="attrs"
         v-on="on"
        >
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn
         v-if="type === 'increase'"
         outlined
         x-small
         fab
         color="green darken-3"
         style="height: 25px; width: 25px; align-self-center;"
         v-bind="attrs"
         v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{title}} {{currency}} currency
        </v-card-title>
        <div class="d-flex align-center ">
        <v-text-field
            v-model="fieldNumber"
            class="ma-3"
            hide-details
            type="number"
            label="Solo"
            placeholder="Placeholder"
            solo
          ></v-text-field>
        <v-btn
        color="green darken-1 mr-3"
        v-on:click="reduceAmount"
        >Confirm</v-btn>
        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Done
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
      name: 'ChangeCurrencyPopup',
      props: ['test', 'title', 'currency', 'type'],
    data () {
      return {
    fieldNumber: 100,
        dialog: false,
      };
    },
    methods: {
    reduceAmount(store) {
      console.log(this.title)
      this.$store.commit('changeCurrencyAmount', {
      coinName: this.currency,
      number: Number(this.fieldNumber),
      type: this.type,
      })
    }
  },
  };
</script>