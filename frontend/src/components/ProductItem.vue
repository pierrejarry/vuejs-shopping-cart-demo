<template>
    <li v-if="!isFavoritePage || (isFavoritePage && product.favorite === 1)">
        <img :src="product.image_url" />
        <p class="title spaceBetween">
            {{ product.productName }} 
            <span class="price">{{ product.price }} &euro;</span>
        </p>
        <button type="button" class="favBtn add" @click="handleFavorites(product)" v-if="!isFavoritePage && product.favorite === 0">
            <img src="./../assets/images/heart_green.svg" alt="Add to favorites" class="favImg"> {{ addFavorites }}
        </button>
        <button type="button" class="favBtn remove" @click="handleFavorites(product)" v-else>
            <img src="./../assets/images/heart_red.svg" alt="Remove from favorites" class="favImg"> {{ removeFavorites }}
        </button>
        <p>{{ product.productDescription }}</p>
        <div class="bottom">
            <p class="textCenter">{{ product.stock }} left</p>
            <button type="button" class="btn fullWidth" @click="handleAddProduct(product)">{{ btn }}</button>
            <p class="errorMessage" v-if="showErrorMessage">{{ getErrorMessage }}</p>
            {{ error }}
        </div>
    </li>
</template>

<script> 
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ProductItem',
  data() {
      return {
          title: "Cart",
          btn: "Add to Cart",
          error: "",
          showErrorMessage: false,
          addFavorites: "Add to favorites",
          removeFavorites: "Remove from favorites"
      }
  },
  props: {
    product: Object,
    isFavoritePage: Boolean
  },
  computed: mapGetters(['getErrorMessage']),
  methods: {
    ...mapActions(['addProductToCart', 'addRemoveProductFromFavorites']),
    async handleAddProduct(p) {
        await this.addProductToCart(p);
        if (this.product.id === p.id && this.getErrorMessage) {
            this.showErrorMessage = true;
        }
    },
    async handleFavorites(product) {
        try {
            await this.addRemoveProductFromFavorites(product);
        } catch (error) {
            this.error = error
        }        
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

.favBtn {
    align-items: center;
    background: none;
    border-left: none;
    border-right: none;
    border-top: 1px solid $body;
    border-bottom: 1px solid $body;
    color: $body;
    display: flex;
    font-size: 14px;
    font-weight: 600;
    justify-content: center;
    padding: 5px;
    transition: .5s all;

    .favImg {
        height: 28px;
        margin-right: 10px;
    }

    &.add {
        &:hover {
            color: $price;
        }
    }

    &.remove {
        &:hover {
            color: $error;
        }
    }
}
</style>