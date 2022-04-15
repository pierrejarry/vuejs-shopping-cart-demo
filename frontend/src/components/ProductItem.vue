<template>
    <li>
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
</template>

<script> 
export default {
  name: 'ProductItem',
  data() {
      return {
          title: "Cart",
      }
  },
  props: {
    product: Object
  }
}
</script>