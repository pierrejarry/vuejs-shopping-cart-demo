<template>
  <div class="cart">
        <h1>{{ title }}</h1>
        <p v-if="productsInCart.length == 0">{{ placeholder }}</p>
        <div class="cartContainer" v-else>
            <ul class="cartList">
                <li v-for="product in productsInCart" :key="product.id" class="fade-in-left">
                    <img :src="product.image_url" />
                    <div class="info">
                        <p class="title spaceBetween">{{ product.productName }} <span class="price">{{ product.price }} &euro;</span></p>
                        <div class="quantityContainer">
                            <p>{{ quantity }}:</p>
                            <div class="quantity">
                                <button type="button" @click="decrementItemQuantityCart(product)">-</button>
                                <span>{{ product.stock }}</span>
                                <button type="button" @click="incrementItemQuantityCart(product)">+</button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: "Cart",
    data() {
        return {
            title: "Cart",
            placeholder: "Your cart is empty",
            quantity: "Quantity"
        }
    },
    computed: {
        productsInCart() {
            return this.$store.getters.cartProducts.filter(function (item) {
                return item.stock > 0
            });
        }
    },
    methods: {
        ...mapActions(['incrementItemQuantityCart', 'decrementItemQuantityCart'])
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

.cart {
    border-left: 1px solid $border;
    height: 100vh;
    overflow-y: auto;
    padding: 10px;
    position: fixed;
    right: 0;
    top: 0;
    width: 25%;

    ul {
        li {
            align-items: flex-start;
            border-bottom: 1px solid $border;
            display: flex;
            padding: 10px 0;

            img {
                margin-right: 10px;
                width: 60px;
            }

            .info {
                align-items: flex-start;
                display: flex;
                flex-direction: column;

                p {
                    margin: 0;
                }

                .quantityContainer {
                    align-items: center;
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                
                    .quantity {
                        border: 1px solid $border;
                        border-radius: 5px;
                        display: flex;
                        margin-left: 10px;
                        padding: 5px;

                        span {
                            margin: 0 5px;
                        }

                        button {
                            background: none;
                            border: none;
                            color: $body;
                            cursor: pointer;
                            padding: 0 5px;
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1024px) {
    .cart {
        width: 30%;
    }
}


@media only screen and (max-width: 768px) {
    .cart {
        display: none;

        &.showMobile {
            display: block;
            height: 100%;
            width: 100%;
        }
    }
}
</style>