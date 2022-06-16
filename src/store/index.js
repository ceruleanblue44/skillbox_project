/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

// eslint-disable-next-line max-len
// It is forbidden to change state directly by using the .push() method, the only legit way is to use mutations. Mutations are functions, kind of event handlers, names of those functions are names of mutations and they take state and payload (info thats's passed when tha mutation is called) as arguments. Mutations are called by the commit() method.
export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const item = state.cartProducts.find((item) => item.productId === productId);

      if (item) {
        item.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
    updateCartProductAmount(state, { productId, amount }) {
      const item = state.cartProducts.find((item) => item.productId === productId);

      if (item) {
        item.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.productId),
      }));
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => (item.product.price * item.amount) + acc, 0);
    },
    cartTotalItems(state) {
      return state.cartProducts.length;
    },
  },
  actions: {
    loadCart(context) {
      axios.get(`${API_BASE_URL}/api/baskets`)
        .then((response) => {
          context.commit('updateUserAccess', response.data.user.accessKey);
          context.commit('updateUserAccess', response.data.items);
        });
    },
  },
});
