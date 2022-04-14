<template>
  <div class="cart">
      <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
    name: "Cart",
    data() {
        return {
            title: "Cart"
        }
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