<template>
  <div class="update-product-container">
    <div class="center-container">
      <h1>Update Product</h1>
      <form class="row g-3 pt-5" @submit.prevent="handleSubmit">
        <div class="col-md-6">
          <label class="form-label">
            <h6>Name</h6>
          </label>
          <input
              type="text"
              class="form-control"
              :placeholder="product.name"
              v-model="updateProduct.name"
              name="name"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">
            <h6>Brand</h6>
          </label>
          <input
              type="text"
              name="brand"
              class="form-control"
              :placeholder="product.brand"
              v-model="updateProduct.brand"
              id="brand"
          />
        </div>
        <div class="col-12">
          <label class="form-label">
            <h6>Description</h6>
          </label>
          <input
              type="text"
              class="form-control"
              :placeholder="product.description"
              name="description"
              v-model="updateProduct.description"
              id="description"
          />
        </div>
        <div class="col-5">
          <label class="form-label">
            <h6>Price</h6>
          </label>
          <input
              type="number"
              class="form-control"
              v-model="updateProduct.price"
              :placeholder="product.price"
              name="price"
              id="price"
          />
        </div>
        <div class="col-md-6">
          <label class="form-label">
            <h6>Category</h6>
          </label>
          <select
              class="form-select"
              v-model="updateProduct.category"
              name="category"
              id="category"
          >
            <option value="">Select category</option>
            <option value="laptop">Laptop</option>
            <option value="headphone">Headphone</option>
            <option value="mobile">Mobile</option>
            <option value="electronics">Electronics</option>
            <option value="toys">Toys</option>
            <option value="fashion">Fashion</option>
          </select>
        </div>

        <div class="col-md-4">
          <label class="form-label">
            <h6>Stock Quantity</h6>
          </label>
          <input
              type="number"
              class="form-control"
              :placeholder="product.stockQuantity"
              v-model="updateProduct.stockQuantity"
              name="stockQuantity"
              id="stockQuantity"
          />
        </div>
        <div class="col-md-8">
          <label class="form-label">
            <h6>Image</h6>
          </label>
          <img
              :src="imagePreview"
              :alt="product.imageName"
              style="width: 100%; height: 180px; object-fit: cover; padding: 5px; margin: 0;"
          />
          <input
              class="form-control"
              type="file"
              @change="handleImageChange"
              placeholder="Upload image"
              name="imageUrl"
              id="imageUrl"
          />
        </div>
        <div class="col-12">
          <div class="form-check">
            <input
                class="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                v-model="updateProduct.productAvailable"
            />
            <label class="form-check-label">Product Available</label>
          </div>
        </div>

        <div class="col-12">
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
          <!-- Delete button -->
          <button type="button" class="btn btn-danger" @click="deleteProduct">
            Delete
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import router from "../router/index.js";

// Get the route parameter
const route = useRoute()
const productId = route.params.id

// Reactive state
const product = ref({})
const image = ref(null)
const updateProduct = ref({
  id: null,
  name: '',
  description: '',
  brand: '',
  price: '',
  category: '',
  releaseDate: '',
  productAvailable: false,
  stockQuantity: '',
})

// Computed property for image preview
const imagePreview = computed(() => {
  return image.value ? URL.createObjectURL(image.value) : 'Image unavailable'
})

// Convert blob to file
const convertBlobToFile = async (blobData, fileName) => {
  return new File([blobData], fileName, { type: blobData.type })
}

// Fetch product data on component mount
onMounted(async () => {
  try {
    // Fetch product details
    const response = await axios.get(`http://localhost:8080/api/products/${productId}`)
    product.value = response.data

    // Fetch product image
    const responseImage = await axios.get(
        `http://localhost:8080/api/products/${productId}/image`,
        { responseType: 'blob' }
    )

    // Convert image blob to file
    const imageFile = await convertBlobToFile(responseImage.data, response.data.imageName)
    image.value = imageFile

    // Update product state
    updateProduct.value = { ...response.data }
  } catch (error) {
    console.error('Error fetching product:', error)
  }
})

// Handle image change
const handleImageChange = (e) => {
  image.value = e.target.files[0]
}

// Handle form submission
const handleSubmit = async () => {
  try {
    const updatedProduct = new FormData()
    updatedProduct.append('imageFile', image.value)
    updatedProduct.append(
        'product',
        new Blob([JSON.stringify(updateProduct.value)], { type: 'application/json' })
    )

    await axios.put(`http://localhost:8080/api/products/${productId}`, updatedProduct, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    alert('Product updated successfully!')
  } catch (error) {
    console.error('Error updating product:', error)
    alert('Failed to update product. Please try again.')
  }
}



const deleteProduct = async () => {
  try {
    const confirmDelete = confirm('Are you sure you want to delete this product?')
    if (!confirmDelete) return

    await axios.delete(`http://localhost:8080/api/products/${productId}`)
    alert('Product deleted successfully!')

    // Redirect to the products list or another page after deletion
    router.push('/')
  } catch (error) {
    console.error('Error deleting product:', error)
    alert('Failed to delete product. Please try again.')
  }
}
</script>

<style scoped>
.update-product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.center-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>
