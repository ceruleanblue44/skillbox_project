<template>

<li class="catalog__item" >
        <a class="catalog__pic" href="#" @click.prevent="gotoPage('product', {id: product.id})">
          <img :src="product.image" :alt="product.title">
        </a>

        <h3 class="catalog__title">
          <a href="#">
            {{ product.title }}
          </a>
        </h3>

        <span class="catalog__price">
         {{ product.price | numberFormat }} ₽
        </span>

        <ColorList class="colors colors--black"
            :color-list="product.colors"
            :current-color.sync="currentColor"/>

      </li>

</template>

<script>

import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import ColorList from './ColorList.vue';

export default {
  name: 'ProductItem',
  data() {
    return {
      currentColor: 0,
    };
  },
  filters: {
    numberFormat,
  },
  methods: {
    gotoPage,
  },
  components: {
    ColorList,
  },
  props: ['product'],
};
</script>
