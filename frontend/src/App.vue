<template>
  <div id="app">
    <ProductList/>
    <Cart :showCart="this.showCart" />
    <ViewCartMobile @show-cart="showHideCart" />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import ViewCartMobile from './components/ViewCartMobile.vue'

export default {
  name: 'App',
  data() {
    return {
      showCart: false,
    }
  },
  components: {
    ProductList,
    Cart,
    ViewCartMobile
  },
  methods: {
    showHideCart() {
      this.showCart = !this.showCart;
    }
  }
}
</script>