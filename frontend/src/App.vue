<template>
  <div id="app">
    <div class="fixedTop">
      <button type="button" class= "btn" @click="showFavoritesPage()">{{ showFavoritesText }}</button>
    </div>
    <ProductList/>
    <Cart :showCart="this.showCart" />
    <ViewCartMobile @show-cart="showHideCart" />
    <Favorites :showFavorites="this.showFavorites" @show-favorites="showFavoritesPage"/>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import ViewCartMobile from './components/ViewCartMobile.vue'
import Favorites from './components/Favorites.vue'

export default {
  name: 'App',
  data() {
    return {
      showCart: false,
      showFavorites: false,
      showFavoritesText: "Show Favorites"
    }
  },
  components: {
    ProductList,
    Cart,
    ViewCartMobile,
    Favorites
  },
  methods: {
    showHideCart() {
      this.showCart = !this.showCart;
    },
    showFavoritesPage() {
      this.showFavorites = !this.showFavorites
    }
  }
}
</script>