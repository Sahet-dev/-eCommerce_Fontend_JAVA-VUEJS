<template>
  <div class="container">
    <!-- Header Section -->
    <div class="header">
      <h1 class="heading">Our Products</h1>
      <router-link to="/add-product" class="add-product-button">Add Product</router-link>
    </div>

    <!-- Product Grid -->
    <div class="product-grid">
      <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";
import { useCartStore } from "../store/cart.js";

const products = ref([]);
const cartStore = useCartStore();

const fetchProducts = async () => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/products");
    products.value = data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};



const addToCart = (product) => {
  cartStore.addToCart(product);
};

onMounted(() => {
  fetchProducts();
});
</script>

<style>
/* Overall Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
  background: #f9f9f9;
}

/* Header Section */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* Heading Styling */
.heading {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  border-bottom: 4px solid #ff9900;
  display: inline-block;
  padding-bottom: 10px;
}

/* Add Product Button Styling */
.add-product-button {
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #28a745;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.add-product-button:hover {
  background-color: #218838;
}

/* Product Grid Styling */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
</style>
