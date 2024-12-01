<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full bg-white shadow-xl rounded-xl overflow-hidden">
      <div class="p-8">
        <h1 class="text-3xl font-extrabold text-center text-red-800 mb-8">Create New Product</h1>

        <form @submit.prevent="createProduct" class="space-y-6">
          <div class="grid md:grid-cols-2 gap-6">
            <div class="form-group">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                  type="text"
                  id="name"
                  v-model="product.name"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div class="form-group">
              <label for="brand" class="block text-sm font-medium text-gray-700 mb-2">Brand</label>
              <input
                  type="text"
                  id="brand"
                  v-model="product.brand"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="desc" class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
                id="desc"
                v-model="product.desc"
                required
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="form-group">
              <label for="price" class="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                  type="number"
                  id="price"
                  v-model="product.price"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div class="form-group">
              <label for="category" class="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input
                  type="text"
                  id="category"
                  v-model="product.category"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div class="form-group">
              <label for="releaseDate" class="block text-sm font-medium text-gray-700 mb-2">Release Date</label>
              <input
                  type="date"
                  id="releaseDate"
                  v-model="product.releaseDate"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div class="grid md:grid-cols-3 gap-6">
            <div class="form-group">
              <label for="quantity" class="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
              <input
                  type="number"
                  id="quantity"
                  v-model="product.quantity"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div class="form-group flex items-center space-x-2">
              <input
                  type="checkbox"
                  id="available"
                  v-model="product.available"
                  class="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label for="available" class="text-sm text-gray-900">Available</label>
            </div>
          </div>

          <div class="form-group">
            <label for="image" class="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
            <div class="image-upload border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                  type="file"
                  id="image"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                  ref="fileInput"
              />
              <div
                  @click="$refs.fileInput.click()"
                  class="cursor-pointer hover:bg-gray-50 transition duration-200 p-4"
              >
                <div v-if="imagePreview" class="flex justify-center mb-4">
                  <img
                      :src="imagePreview"
                      alt="Product Preview"
                      class="max-h-48 max-w-full rounded-lg object-cover"
                  />
                </div>
                <div v-else class="text-gray-600">
                  <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <p class="mt-1 text-sm">Click to upload image or drag and drop</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  setup() {
    const product = ref({
      name: "",
      desc: "",
      brand: "",
      price: null,
      category: "",
      releaseDate: "",
      available: false,
      quantity: null,
    });

    const image = ref(null);
    const imagePreview = ref(null);
    const fileInput = ref(null);

    const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        image.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const createProduct = async () => {
      try {
        const formData = new FormData();

        formData.append(
            "product",
            new Blob([JSON.stringify(product.value)], {type: "application/json"})
        );

        if (image.value) {
          formData.append("imageFile", image.value);
        }

        const response = await axios.post(
            "http://localhost:8080/api/products",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
        );

        console.log("Product created successfully:", response.data);
        resetForm();
      } catch (error) {
        console.error("Error creating product:", error.response?.data || error.message);
      }
    };

    const resetForm = () => {
      product.value = {
        name: "",
        desc: "",
        brand: "",
        price: null,
        category: "",
        releaseDate: "",
        available: false,
        quantity: null,
      };
      image.value = null;
      imagePreview.value = null;
      if (fileInput.value) {
        fileInput.value.value = "";
      }
    };

    return {
      product,
      image,
      imagePreview,
      fileInput,
      createProduct,
      handleImageUpload,
    };
  },
};
</script>
