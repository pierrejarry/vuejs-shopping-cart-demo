<template>
  <div class="products">
      <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
    name: "ProductList",
    data() {
        return {
            title: "Product list"
        }
    }
}
</script>

<style lang="scss" scoped>
    .products {
        flex: 1 1 75%;
        padding: 10px;
    }
</style>