<template>
    <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="order" >
        <div class="cart__field">
          <div class="cart__data">

            <BaseFormText v-model="formData.name" title="ФИО" :error="formError.name" placeholder="Введите ваше полное имя" />

            <BaseFormText v-model="formData.address" title="Адрес доставки" :error="formError.address" placeholder="Введите ваш адрес" />

            <BaseFormText v-model="formData.phone" title="Телефон" :error="formError.phone" placeholder="Введите ваш телефон" />

            <BaseFormText v-model="formData.email" title="Email" :error="formError.email" placeholder="Введите ваш Email" />

            <BaseFormTextarea v-model="formData.comment" title="Комментарий к заказу" :error="formError.name" placeholder="Ваши пожелания"/>

            <!-- <BaseFormField title="ФИО" :error="formError.name">
              <input class="form__input" v-model="formData.name" type="text" name="name" placeholder="Введите ваше полное имя">
            </BaseFormField> -->

            <!-- <label class="form__label">
              <input class="form__input" v-model="formData.address" type="text" name="address" placeholder="Введите ваш адрес">
              <span class="form__value">Адрес доставки</span>
              <span class="form__error" v-if="formError.address">{{ formError.address }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="formData.phone" type="tel" name="phone" placeholder="Введите ваш телефон">
              <span class="form__value">Телефон</span>
              <span class="form__error" v-if="formError.phone">{{ formError.phone }}</span>
            </label>

            <label class="form__label">
              <input class="form__input" v-model="formData.email" type="email" name="email" placeholder="Введи ваш Email">
              <span class="form__value">Email</span>
              <span class="form__error" v-if="formError.email">{{ formError.email }}</span>
            </label> -->

            <!-- <label class="form__label">
              <textarea class="form__input  form__input--area" v-model="formData.comments" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
              <span class="form__error" v-if="formError.comments">{{ formError.comments }}</span>
            </label> -->
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <OrderItems :products="products" :totalPrice="totalPrice" :totalItems="totalItems"/>
          <!-- <ul class="cart__orders">
            <li class="cart__order" v-for="item in products" :key="item.product.productId">
              <h3>{{ item.product.title }}</h3>
              <b>{{ item.product.price | nu }} ₽</b>
              <span>Артикул: {{ item.product.id }}</span>
            </li> -->
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
          <!-- </ul>
          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>3</b> товара на сумму <b>{{ totalPrice | numberFormat }} ₽</b></p>
          </div> -->

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="formErrorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{ formErrorMessage }}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import BaseFormText from '@/components/BaseFormText.vue';
import BaseFormTextarea from '@/components/BaseFormTextarea.vue';
import OrderItems from '@/components/OrderItems.vue';
import axios from 'axios';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import { API_BASE_URL } from '../config';

export default {
  filters: { numberFormat },
  components: { BaseFormText, BaseFormTextarea, OrderItems },
  data() {
    return {
      formData: {},
      formError: {},
      formErrorMessage: '',
    };
  },
  computed: {
    ...mapGetters({
      products: 'cartDetailProducts',
      totalPrice: 'cartTotalPrice',
      totalItems: 'cartTotalItems',
    }),
  },
  methods: {
    order() {
      this.formError = {};
      this.formErrorMessage = '';

      axios
        .post(`${API_BASE_URL}api/orders`, {
          ...this.formData,
        }, {
          params: {
            userAccessKey: this.$store.state.userAccessKey,
          },
        })
        .then((response) => {
          this.$store.commit('resetCart');
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request || {};
          this.formErrorMessage = error.response.data.error.message;
        });
    },
  },
};
</script>
