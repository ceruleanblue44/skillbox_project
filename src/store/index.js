import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// eslint-disable-next-line max-len
// It is forbidden to chenge state directly by using the .push() method, the only legit way is to use mutations. Mutations are functions, kind of event handlers, names of those functions are names of mutations and they take state and payload (info thats's passed when tha mutation is called) as arguments. Mutations are called by the commit() method.
export default new Vuex.Store({
  state: {
    cartProducts: [
      { productId: 1, amount: 2 },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      // eslint-disable-next-line no-shadow
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
  },
});
