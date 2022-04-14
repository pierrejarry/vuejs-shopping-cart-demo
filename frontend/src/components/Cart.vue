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
    flex: 1 1 25%;
    height: 100vh;
    padding: 10px;
}
</style>