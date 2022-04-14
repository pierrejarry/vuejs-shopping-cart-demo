<template>
  <div class="products">
      <h1>{{ title }}</h1>
      <p class="errorMessage" v-if="getErrorMessage">{{ getErrorMessage }}</p>
      <div class="productsContainer" v-else>
        <ul v-if="allProducts">
            <li v-for="product in allProducts" :key="product.id">
                {{ product.productName }}
            </li>
        </ul>
        <div v-else>Loading...</div>
      </div>
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
    computed: mapGetters(['allProducts', 'getErrorMessage']),
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