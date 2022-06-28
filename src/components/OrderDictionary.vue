<template>
  <ul class="dictionary">
    <li class="dictionary__item" v-for="item in dictionary" :key="item.field">
      <span class="dictionary__key">
        {{ item.key }}
      </span>
      <span class="dictionary__value">
        {{ item.value }}
      </span>
    </li>
    <!-- <li class="dictionary__item">
      <span class="dictionary__key">
        Адрес доставки
      </span>
      <span class="dictionary__value">
        Москва, ул. Ленина, 21, кв. 33
      </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key">
        Телефон
      </span>
      <span class="dictionary__value">
        8 800 989 74 84
      </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key">
        Email
      </span>
      <span class="dictionary__value">
        lalala@mail.ru
      </span>
    </li>
    <li class="dictionary__item">
      <span class="dictionary__key">
        Способ оплаты
      </span>
      <span class="dictionary__value">
        картой при получении
      </span>
    </li> -->
  </ul>
</template>

<script>
export default {
  props: ['dictionary'],
};
</script>
