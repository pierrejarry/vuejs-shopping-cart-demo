<template>
  <div id="app">
    <ProductList/>
    <Cart/>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

export default {
  name: 'App',
  components: {
    ProductList,
    Cart
  }
}
</script>

<style lang="scss">
@import "./assets/css/_variables.scss";

#app {
  display: flex;
}
</style>
