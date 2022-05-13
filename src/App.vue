<template>
  <!-- The <component /> tag lets you display any component dynamically, :is="component you want" -->
  <component
    :is="currentPageComponent"
    :page-params="currentPageParams"
    />
</template>

<script>

import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';
import eventBus from './eventBus';

// List of all pages, name of a page - component:
const routes = {
  main: 'MainPage',
  product: 'ProductPage',
};

export default {
  data() {
    return {
      currentPage: 'main',
      currentPageParams: {

      },
    };
  },
  methods: {
    gotoPage(pageName, pageParams) {
      this.currentPage = pageName;
      this.currentPageParams = pageParams || {};
    },
  },
  computed: {
    // To return name of the component depending on which page is picked now
    currentPageComponent() {
      return routes[this.currentPage] || 'NotFoundPage';
    },
  },
  components: { MainPage, ProductPage, NotFoundPage },
  created() {
    // $on is a bus method, 1st arg is the name of the event we want to catch, 2nd arg is the function that fires off when the event is caught
    eventBus.$on('gotoPage', (pageName, pageParams) => this.gotoPage(pageName, pageParams));
  },
};

</script>
