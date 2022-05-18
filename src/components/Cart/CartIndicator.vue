<template>
    <router-link class="header__cart"  aria-label="Корзина с товарами" :to="{name: 'cart'}">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <!-- We can access the store from any component using the $store variable: -->
    <span class="header__count" aria-label="Количество товаров">{{ $store.state.cartProducts.length }}</span>
  </router-link>
</template>

<script>
export default {
  // If we want to access the store from the script section, we use the this keyword
};
</script>
