<template>

  <v-app>
    <v-card
    class="mx-auto overflow-hidden"
    height="100%"
    width="1080"
  >
    <v-system-bar color="deep-purple darken-3"></v-system-bar>

    <v-app-bar
      color="deep-purple accent-4"
      height="80"
      dark
      prominent
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-spacer></v-spacer>
        <p class="d-flex ">{{portfolioCostInUSD}}<v-icon>mdi-currency-usd</v-icon></p>
      </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item :to="'/'">
          <v-list-item-title>Currency converter</v-list-item-title>
          </v-list-item>

          <v-list-item :to="'/account'">
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <router-view></router-view>
    </v-card>
  </v-app>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
  export default Vue.extend({
    name: 'App',
    components: {
    },
    data: () => ({
      drawer: false,
      group: null,
    }),
    watch: {
      group () {
        this.drawer = false;
      },
    },
    computed: {
    ...mapGetters(['portfolioCostInUSD'])
  }
  });
</script>

<style scoped lang="scss">
.acc-balance {
   white-space: pre-line;
}
</style>
