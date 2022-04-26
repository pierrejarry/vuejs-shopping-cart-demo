<template>
  <div class="products">
      <h1>{{ title }}</h1>
      <p class="errorMessage" v-if="error">{{ error }}</p>
      <div class="productsContainer" v-else>
        <ul v-if="allProducts">
            <ProductItem
                v-for="product in allProducts" 
                :key="product.id"
                :product="product"
                :isFavoritePage="isFavoritePage"
            />
        </ul>     
        <p v-else>Loading...</p>
      </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ProductItem from './ProductItem.vue'

export default {
    name: "ProductList",
    components: {
        ProductItem
    },
    data() {
        return {
            title: "Product list",
            error: "",
            isFavoritePage: false
        }
    },
    methods: {
        ...mapActions(['fetchProducts']),
        async handleFetchProducts () {
            try {
                await this.fetchProducts()
            } catch (error) {
                this.error = error
            }
        }
    },
    computed: mapGetters(['allProducts']),
    created() {
        this.handleFetchProducts()
    }
}
</script>

<style lang="scss">
@import "@/assets/css/_variables.scss";

    .products {
        margin-top: 60px;
        padding: 10px;
        width: 75%;

        h1 {
            margin-left: 5px;
            margin-right: 5px;
        }

        .bottom {
            border-top: 1px solid $border;
            margin-top: auto;
            padding-top: 10px;
        }
    }

    /* ==============================*/
    /* Responsive                    */
    /*===============================*/

    @media only screen and (max-width: 1400px) {
        .products {
            ul {
                li {
                    width: calc(33.3% - 10px);
                }
            }
        }
    }

    @media only screen and (max-width: 1024px) {
        .products {
            width: 70%;

            ul {
                li {
                    width: calc(50% - 10px);
                }
            }
        }
    }

    @media only screen and (max-width: 768px) {
        .products {
            width: 100%;

            ul {
                li {
                    width: calc(33.3% - 10px);
                }
            }
        }
    }

    @media only screen and (max-width: 600px) {
        .products {
            ul {
                li {
                    width: calc(50% - 10px);
                }
            }
        }
    }

    @media only screen and (max-width: 480px) {
        .products {
            ul {
                li {
                    margin: 0;
                    width: 100%;
                }
            }
        }
    }
</style>