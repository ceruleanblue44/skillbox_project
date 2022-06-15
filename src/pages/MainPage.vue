<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        152 товара
      </span>
    </div>

    <div class="content__catalog">
    <ProductFilter :price-from.sync="filterPriceFrom"
                   :price-to.sync="filterPriceTo"
                   :category-id.sync="filterCategoryId"
                   :product-color.sync="filterColorId"
                   />
   <section class="catalog">
    <ProductList
      :products="products">
    <!-- <ProductItem /> -->
    </ProductList>

    <BasePagination v-model="page"
                    :count="countProducts"
                    :per-page="productsPerPage"
                    />

    </section>
    </div>
  </main>
</template>

<!-- eslint-disable max-len -->
<!-- The prop is in camelCase in the component, but here it's in kebab-case, Vue    automatically converts kebab-case into camelCase when passing props. This syntax is necessary 'cos we are using HTML-based attribute syntax (dashes, no camelCase) -->

<script>
// @ - absolute path to the src folder, works from anywhere
// import products from '@/data/products';
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import { API_BASE_URL } from '../config';

export default {
  components: {
    ProductList, BasePagination, ProductFilter,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
    };
  },
  computed: {
    // filteredProducts() {
    //   let filteredProducts = products;
    //   const Color = (product) => product.colors.find((color) => color.id === this.filterColorId);

    //   if (this.filterPriceFrom > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price > this.filterPriceFrom);
    //   }

    //   if (this.filterPriceTo > 0) {
    //     filteredProducts = filteredProducts.filter((product) => product.price < this.filterPriceTo);
    //   }

    //   if (this.filterCategoryId) {
    //     filteredProducts = filteredProducts.filter((product) => product.categoryId === this.filterCategoryId);
    //   }

    //   if (this.filterColorId) {
    //     filteredProducts = filteredProducts.filter(Color);
    //   }

    //   return filteredProducts;
    // },
    products() {
      // Replaced with the API call results:
      // const offset = (this.page - 1) * this.productsPerPage;
      // return this.filteredProducts.slice(offset, offset + this.productsPerPage);
      return this.productsData
        // eslint-disable-next-line arrow-body-style
        ? this.productsData.items.map((product) => {
          return {
            ...product,
            // Correct path to the picture:
            image: product.image.file.url,
          };
        })
        : [];
    },
    countProducts() {
      // Data from local file:
      // return this.filteredProducts.length;
      // Data from API:
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get(`${API_BASE_URL}api/products`, {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
          },
        })
          // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data);
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
