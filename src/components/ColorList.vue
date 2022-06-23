<template>
  <ul class="colors colors--black" >
    <li class="colors__item"
        v-for="color in colorList" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only"
              type="radio"
              :value="color.id"
              v-model.number="computedColors"
        >
        <span class="colors__value" :style="'background-color:'+color.code+';'">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>

export default {
  name: 'ColorList',
  props: ['colorList', 'currentColor'],
  computed: {
    computedColors: {
      get() {
        return this.currentColor;
      },
      set(value) {
        this.$emit('update:currentColor', value);
      },
    },
  },
};
</script>
