<template>
  <div class="product-details">
    <div class="product-card">
      <div class="product-image-container">
        <img
            :src="product.imageType && product.imageDate ? `data:${product.imageType};base64,${product.imageDate}` : 'default-image.jpg'"
            :alt="product.name"
            class="product-image"
        />

        <!--        <img :src="`data:${product.imageType};base64,${product.imageDate}`" :alt="product.name" -->
<!--             class="product-image" />-->
      </div>
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>

        <div class="product-main-details">
          <div class="product-price-availability">
            <div class="price-tag">${{ product.price }}</div>
            <div class="availability-tag">
              {{ product.available ? "In Stock" : "Out of Stock" }}
            </div>
          </div>

          <p class="product-desc">{{ product.desc }}</p>
        </div>

        <div class="product-meta">
          <div class="meta-grid">
            <div class="meta-item">
              <span class="meta-label">Brand</span>
              <span class="meta-value">{{ product.brand }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Category</span>
              <span class="meta-value">{{ product.category }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Quantity</span>
              <span class="meta-value">{{ product.quantity }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-label">Release Date</span>
              <span class="meta-value">
                {{ new Date(product.releaseDate).toLocaleDateString() }}
              </span>
            </div>
          </div>
        </div>

        <div class="product-actions">
          <router-link to="/" class="back-button">Back to Products</router-link>
          <button v-if="product.available" class="add-to-cart-button">Add to Cart</button>
          <button @click="navigateToUpdate" class="update-button">Update Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const product = ref({});

const fetchProduct = async () => {
  try {
    const { data } = await axios.get(`http://localhost:8080/api/products/${route.params.id}`);
    product.value = data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

const navigateToUpdate = () => {
  router.push(`/product/${route.params.id}/edit`);
};

onMounted(fetchProduct);
</script>

<style scoped>
.product-details {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background: #fdfdfd;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.product-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  align-items: center;
}

.product-image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.product-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.05);
}

.product-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: left;
}

.product-main-details {
  margin-bottom: 25px;
}

.product-price-availability {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.price-tag {
  font-size: 2rem;
  font-weight: bold;
  color: #007BFF;
}

.availability-tag {
  font-size: 1rem;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
}

.product-desc {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
}

.product-meta {
  margin-bottom: 25px;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
}

.meta-label {
  font-size: 0.9rem;
  color: #6c757d;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.meta-value {
  font-size: 1rem;
  color: #333;
  font-weight: 500;
}

.product-actions {
  display: flex;
  gap: 15px;
}

.back-button,
.add-to-cart-button,
.update-button {
  flex-grow: 1;
  padding: 12px 20px;
  font-size: 1rem;
  border-radius: 8px;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.back-button {
  color: #fff;
  background-color: #007BFF;
}

.back-button:hover {
  background-color: #0056b3;
}

.add-to-cart-button {
  color: #fff;
  background-color: #28a745;
  border: none;
  cursor: pointer;
}

.add-to-cart-button:hover {
  background-color: #218838;
}

.update-button {
  color: #fff;
  background-color: #ffc107;
  border: none;
  cursor: pointer;
}

.update-button:hover {
  background-color: #e0a800;
}

@media (max-width: 768px) {
  .product-card {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .product-title,
  .product-main-details {
    text-align: center;
  }

  .meta-grid {
    grid-template-columns: 1fr;
  }

  .product-actions {
    flex-direction: column;
  }
}
</style>
