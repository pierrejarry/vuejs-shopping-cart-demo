<template>
  <div class="products">
      <h1>{{ title }}</h1>
      <p class="errorMessage" v-if="getErrorMessage">{{ getErrorMessage }}</p>
      <div class="productsContainer" v-else>
        <ul v-if="allProducts">
            <li v-for="product in allProducts" :key="product.id">
                <img :src="product.image_url" />
                <p class="title spaceBetween">
                    {{ product.productName }} 
                    <span class="price">{{ product.price }} &euro;</span>
                </p>
                <p>{{ product.productDescription }}</p>
                <span class="bottom">
                    <p>{{ product.stock }} left</p>
                </span>
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

<style lang="scss">
@import "@/assets/css/_variables.scss";

    .products {
        padding: 10px;
        width: 75%;

        h1 {
            margin: 0 5px;
        }

        ul {
            display: flex;
            flex-wrap: wrap;

            li {
                border: 1px solid $border;
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                margin: 10px 5px;
                padding: 10px;
                width: calc(25% - 10px);
            }
        }

        p {
            &.title {
                font-weight: 600;
                text-align: left;
            }

            .price {
                color: $price;
                flex-shrink: 0;
                margin-left: 10px;
            }
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
                    width: 100%;
                }
            }
        }
    }
</style>