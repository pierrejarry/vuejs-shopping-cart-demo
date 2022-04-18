<template>
  <div class="cart" :class="{ 'showMobile': showCart }">
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
            <div class="checkout">
                <p class="spaceBetween">{{ total }} : <strong>{{ cartTotal }} &euro;</strong></p>
                <button type="button" class="btn fullWidth">{{ checkout }}</button>
            </div>
        </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: "Cart",
    data() {
        return {
            title: "Cart",
            placeholder: "Your cart is empty",
            quantity: "Quantity",
            total: "Total",
            checkout: "Checkout",
            clear: "Clear Cart"
        }
    },
    computed: {
        ...mapGetters(['cartTotal']),
        productsInCart() {
            return this.$store.getters.cartProducts.filter(function (item) {
                return item.stock > 0
            });
        }
    },
    methods: {
        ...mapActions(['incrementItemQuantityCart', 'decrementItemQuantityCart'])
    },
    props: {
        showCart: Boolean
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/_variables.scss";

.cart {
    border-left: 1px solid $border;
    height: 100vh;
    margin-top: 60px;
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

            &:last-child {
                border: none;
            }
        }
    }

    .checkout {
        border-top: 1px solid $border;
        margin-top: 20px;

        p {
            display: flex;
            align-items: center;

            strong {
                font-size: 24px;
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
            background-color: $white;
            display: block;
            height: 100%;
            width: 100%;
            z-index: 98;
        }
    }
}
</style>