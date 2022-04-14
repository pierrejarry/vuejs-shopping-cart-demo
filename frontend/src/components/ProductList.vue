<template>
  <div class="products">
      <h1>{{ title }}</h1>
      <ul v-if="allProducts">
          <li v-for="product in allProducts" :key="product.id">
              {{ product.productName }}
          </li>
      </ul>
      <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "ProductList",
    data() {
        return {
            title: "Product list"
        }
    },
    methods: {
        ...mapActions(['fetchProducts']),
    },
    computed: mapGetters(['allProducts']),
    created() {
        this.fetchProducts()
    }
}
</script>

<style lang="scss" scoped>
    .products {
        flex: 1 1 75%;
        padding: 10px;
    }
</style>