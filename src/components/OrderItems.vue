<template>
  <div>
    <ul class="cart__orders">
      <li class="cart__order" v-for="item in products" :key="item.product.productId">
        <h3>{{ item.product.title }}</h3>
        <b>{{ item.product.price | numberFormat }} ₽</b>
        <span>Артикул: {{ item.product.id }}</span>
      </li>
      <!-- <li class="cart__order">
        <h3>Гироскутер Razor Hovertrax 2.0ii</h3>
        <b>4 990 ₽</b>
        <span>Артикул: 150030</span>
      </li>
      <li class="cart__order">
        <h3>Электрический дрифт-карт Razor Lil’ Crazy</h3>
        <b>8 990 ₽</b>
        <span>Артикул: 150030</span>
      </li> -->
    </ul>
    <div class="cart__total">
      <p>Доставка: <b>500 ₽</b></p>
      <p>Итого: <b>{{ totalItems }}</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
    </div>
  </div>
</template>

<script>

import numberFormat from '@/helpers/numberFormat';
// import { mapGetters } from 'vuex';

export default {
  filters: { numberFormat },
  props: ['products', 'totalPrice', 'totalItems'],

  // Get data from orderInfo() in state, it has all the necessary stuff

  // computed: {
  //   ...mapGetters({
  //     products: 'cartDetailProducts',
  //     totalPrice: 'cartTotalPrice',
  //     totalItems: 'cartTotalItems',
  //   }),
  // },
};
</script>
