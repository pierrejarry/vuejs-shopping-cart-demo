<template>
    <li>
        <img :src="product.image_url" />
        <p class="title spaceBetween">
            {{ product.productName }} 
            <span class="price">{{ product.price }} &euro;</span>
        </p>
        <p>{{ product.productDescription }}</p>
        <div class="bottom">
            <p class="textCenter">{{ product.stock }} left</p>
            <button type="button" class="btn" @click="handleAddProduct(product)">{{ btn }}</button>
            <p class="errorMessage" v-if="showErrorMessage">{{ getErrorMessage }}</p>
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
          showErrorMessage: false
      }
  },
  props: {
    product: Object
  },
  computed: mapGetters(['getErrorMessage']),
  methods: {
      ...mapActions(['addProductToCart']),
      async handleAddProduct(p) {
          await this.addProductToCart(p);
          if (this.product.id === p.id && this.getErrorMessage) {
              this.showErrorMessage = true;
          }
      }
  }
}
</script>