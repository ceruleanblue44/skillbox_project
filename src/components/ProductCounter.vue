<template>
  <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click="currentCount--">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model.number="currentCount" />

    <button type="button" aria-label="Добавить один товар" @click="currentCount++">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: [
    'count',
  ],
  computed: {
    currentCount: {
      get() {
        return this.count;
      },
      set(value) {
        if (value > 0) {
          this.$emit('update:count', value);
        }
      },
    },
  },
};
</script>
