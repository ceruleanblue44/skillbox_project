<template>
 <section class="catalog">
  <ProductList :products="products">
    <ProductItem />
  </ProductList>

  <BasePagination v-model="page"
                  :count="countProducts"
                  :per-page="productsPerPage"
/>

 </section>

</template>

<!-- eslint-disable max-len -->
<!-- The prop is in camelCase in the component, but here it's in kebab-case, Vue    automatically converts kebab-case into camelCase when passing props. This syntax is necessary 'cos we are using HTML-based attribute syntax (dashes, no camelCase) -->

<script>

import products from './data/products';
import ProductList from './components/ProductList.vue';
import ProductItem from './components/ProductItem.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, ProductItem, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const offset = (this.page - 1) * this.productsPerPage;
      return products.slice(offset, offset + this.productsPerPage);
    },
    countProducts() {
      return products.length;
    },
  },
};

</script>
