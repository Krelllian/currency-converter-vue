import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import CryptoConverterView from '../views/CryptoConverterView.vue';
import AccountView from '../views/AccountView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'cryptoConverter',
    component: CryptoConverterView,
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AccountView.vue'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
