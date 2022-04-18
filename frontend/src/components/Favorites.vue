<template>
    <section id="favorites" :class="{ 'showFavorites': showFavorites }">
        <button type="button" class="btn" @click="backToProducts()">{{ link }}</button>
        <h1>{{title}}</h1>
        <ul v-if="allFavorites.length > 0">
            <ProductItem
                v-for="(product, index) in allFavorites" 
                :key="index"
                :product="product"
                :isFavoritePage="isFavoritePage"
            />
        </ul>
        <p v-else>{{ placeholder }}</p>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ProductItem from './ProductItem.vue'

export default {
  name: 'FavoritesList',
  components: {
        ProductItem
  },
  props: ['showFavorites'],
  data() {
      return {
          title: "Favorites List",
          link: "Back to Products",
          showFavoritesText: "Show Favorites",
          isFavoritePage: true,
          placeholder: "You have no favorites"
      }
  },
  methods: {
    ...mapActions(['getFavorites']),
    backToProducts() {
        this.$emit("show-favorites", false);
    }
  },
  computed: mapGetters(['allFavorites']),
  created() {
      this.getFavorites()
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

#favorites {
    background-color: $white;
    display: none;
    height: 100%;
    left: 0;
    overflow-y: auto;
    padding: 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;

    &.showFavorites {
        display: block;;
    }
}

@media only screen and (max-width: 768px) {
    #favorites {
        margin-top: 60px;
    }
}
</style>