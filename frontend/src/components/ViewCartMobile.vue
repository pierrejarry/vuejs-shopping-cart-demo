<template>
    <div class="viewCartMobile">
        <button type="button" @click="showCart()" v-if="viewCart == false">
            {{ cart }} <span v-if="cartProducts.length > 0" class="itemsNb">{{ cartProducts.length }}</span>
        </button>
        <button type="button" @click="hideCart()" v-else>
            {{ products }}
        </button>        
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ViewCartMobile',
  data() {
      return {
        cart: "View Cart",
        products: "Back to Products",
        viewCart: false
      }
  },
  computed: {
    ...mapGetters(['cartProducts'])
  },
  methods: {
      showCart() {
          this.$emit('show-cart', true);
          this.viewCart = true;
      },
      hideCart() {
          this.$emit('show-cart', false);
          this.viewCart = false;
      }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/main';

.viewCartMobile {
    display: none;
}

@media only screen and (max-width: 768px) {
    .viewCartMobile {
        background-color: $white;
        border-top: 1px solid $border;
        bottom: 0;
        -webkit-box-shadow: 0px -2px 12px -4px #000000; 
        box-shadow: 0px -2px 12px -4px #000000;
        display: block;
        position: fixed;  
        right: 0;
        text-align: center;
        width: 100%;
        z-index: 99;

        button {
            align-items: center;
            background: transparent;
            border: none;
            color: $body;
            cursor: pointer;
            display: flex;
            font-size: 16px;
            font-weight: 600;
            height: 100%;
            justify-content: center;
            line-height: 26px;
            padding: 10px;
            width: 100%;

            .itemsNb {
                align-items: center;
                background-color: #ff5252;
                border-radius: 100%;
                color: #fff;
                display: inline-flex;
                height: 26px;
                justify-content: center;
                margin-left: 10px;
                width: 26px;
            }
        }
    }
}
</style>
