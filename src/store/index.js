/* eslint-disable no-shadow */
import Vue from 'vue';
import Vuex from 'vuex';
// import products from '@/data/products';
import axios from 'axios';
import { API_BASE_URL } from '../config';

Vue.use(Vuex);

// eslint-disable-next-line max-len
// It is forbidden to change state directly by using the .push() method, the only legit way is to use mutations. Mutations are functions, kind of event handlers, names of those functions are names of mutations and they take state and payload (info thats's passed when tha mutation is called) as arguments. Mutations are called by the commit() method.
export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
  },
  mutations: {
    // addProductToCart(state, { productId, amount }) {
    //   const item = state.cartProducts.find((item) => item.productId === productId);

    //   if (item) {
    //     item.amount += amount;
    //   } else {
    //     state.cartProducts.push({
    //       productId,
    //       amount,
    //     });
    //   }
    // },
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
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        };
      });
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        // eslint-disable-next-line prefer-destructuring
        const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

        return {
          ...item,
          // Local file:
          // product: products.find((p) => p.id === item.productId),
          // API:
          product: {
            ...product,
            image: product.image.file.url,
          },
        };
      });
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
      return axios.get(`${API_BASE_URL}api/baskets`, {
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }

          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return (new Promise((resolve) => setTimeout(resolve, 2000)))
        .then(() => {
          axios
            .post(`${API_BASE_URL}api/baskets/products`, {
              productId,
              quantity: amount,
            }, {
              params: {
                userAccessKey: context.state.userAccessKey,
              },
            })
            .then((response) => {
              context.commit('updateCartProductsData', response.data.items);
              context.commit('syncCartProducts');
            });
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });

      if (amount < 1) {
        return;
      }

      // eslint-disable-next-line consistent-return
      return axios
        .put(`${API_BASE_URL}api/baskets/products`, {
          productId,
          quantity: amount,
        }, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        })
        .catch(() => {
          context.commit('syncCartProducts');
        });
    },
  },
});
