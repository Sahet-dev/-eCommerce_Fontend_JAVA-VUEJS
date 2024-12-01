<template>
  <div class="card">
    <img :src="`data:${product.imageType};base64,${product.imageDate}`" :alt="product.name" />
    <h2>{{ product.name }}</h2>
    <p>${{ product.price }}</p>
    <!-- See Details button -->
    <button @click="viewDetails">See Details</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  props: {
    product: Object,
  },
  setup(props) {
    const router = useRouter();

    const viewDetails = () => {
      router.push(`/product/${props.product.id}`); // Navigate to the product details page
    };

    return { viewDetails };
  },
};
</script>

<style>
.card {
  border: 1px solid #ddd;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
}
button {
  background-color: #ff9900;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #cc7a00;
}
</style>
