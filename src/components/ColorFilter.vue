<template>
  <ul class="colors" >
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" :value="color.id" checked="" v-model="currentColorId">
        <span class="colors__value" :style="{ backgroundColor: color.color }">
        </span>
      </label>
    </li>
    <!-- <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
        <span class="colors__value" style="background-color: #FFBE15;">
        </span>
      </label>
    </li>
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#939393">
        <span class="colors__value" style="background-color: #939393;">
      </span></label>
    </li>
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
        <span class="colors__value" style="background-color: #8BE000;">
      </span></label>
    </li>
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
        <span class="colors__value" style="background-color: #FF6B00;">
      </span></label>
    </li>
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#FFF">
        <span class="colors__value" style="background-color: #FFF;">
      </span></label>
    </li>
    <li class="colors__item">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" name="color" value="#000">
        <span class="colors__value" style="background-color: #000;">
      </span>
      </label>
    </li> -->
  </ul>
</template>

<script>

import colors from '../data/colors';

export default {
  // data() {
  //   return {
  //     currentColor: '',
  //   };
  // },
  props: ['colorId'],
  computed: {
    currentColorId: {
      get() {
        return this.colorId;
      },
      set(currentColorId) {
        return this.$emit('update:colorId', currentColorId);
      },
    },
    colors() {
      return colors;
    },
  },
};
</script>

<!-- Stopped watching at 18:41 -->
