<template>
  <header class="relative z-50">
    <!-- Backdrop blur for glass effect -->
    <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg"></div>

    <div class="relative">
      <!-- Main Navigation -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <router-link
                to="/"
                class="flex items-center space-x-2 group"
            >
              <!-- Logo Icon -->
              <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <span class="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                CarRent
              </span>
            </router-link>
          </div>


<!--          SEARCH BAR-->
          <div>
            <input
                type="text"
                v-model="inputValue"
                @input="handleChange"
                placeholder="Search products..."
                class="border p-2 rounded w-full"
            />

            <div v-if="showSearchResults" class="mt-4">
              <ul v-if="searchResults.length > 0">
                <li v-for="(product, index) in searchResults" :key="index" class="py-2 border-b">
                  {{ product.name }}
                </li>
              </ul>
              <p v-else class="text-gray-500">No results found.</p>
            </div>
          </div>





          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center space-x-1">
            <router-link
                v-for="item in navigationItems"
                :key="item.path"
                :to="item.path"
                class="px-4 py-2 text-sm font-medium text-blue-50 rounded-lg hover:bg-white/10 transition-colors duration-200"
                :class="{ 'bg-white/20': isCurrentRoute(item.path) }"
            >
              {{ item.name }}
            </router-link>

            <!-- Conditionally Render Login/Register buttons -->
            <div v-if="!loggedIn">
              <router-link
                  to="/login"
                  class="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Login
              </router-link>
              <router-link
                  to="/register"
                  class="px-4 py-2 text-sm font-medium text-white rounded-lg hover:bg-white/10 transition-colors duration-200"
              >
                Register
              </router-link>
            </div>
          </nav>

          <!-- Mobile Menu Button -->
          <div class="md:hidden">
            <button
                @click="toggleMobileMenu"
                class="inline-flex items-center justify-center p-2 rounded-lg text-blue-100 hover:bg-white/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
                :aria-expanded="isMobileMenuOpen"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                  class="w-6 h-6"
                  :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                  class="w-6 h-6"
                  :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
      >
        <div
            v-if="isMobileMenuOpen"
            class="absolute inset-x-0 top-full md:hidden bg-blue-700/95 backdrop-blur-lg"
        >
          <div class="px-2 pt-2 pb-3 space-y-1">
            <router-link
                v-for="item in navigationItems"
                :key="item.path"
                :to="item.path"
                class="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
                :class="{ 'bg-white/20': isCurrentRoute(item.path) }"
                @click="isMobileMenuOpen = false"
            >
              {{ item.name }}
            </router-link>
            <!-- Conditionally Render Login/Register buttons in mobile view -->
            <div v-if="!loggedIn" class="mt-4">
              <router-link
                  to="/login"
                  class="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Login
              </router-link>
              <router-link
                  to="/register"
                  class="block px-3 py-2 rounded-lg text-base font-medium text-white hover:bg-white/10 transition-colors duration-200"
              >
                Register
              </router-link>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";

const inputValue = ref("");
const showSearchResults = ref(false);
const searchResults = ref([]);
const noResults = ref(false);
const route = useRoute();
const isMobileMenuOpen = ref(false);

const loggedIn = ref(false);

const navigationItems = [
  {name: 'Home', path: '/'},
  {name: 'New Product', path: '/add-product'},
];

const isCurrentRoute = (path) => {
  return route.path === path;
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};




const handleChange = async () => {
  if (inputValue.value.length >= 1) {
    showSearchResults.value = true;

    try {
      const response = await axios.get(
          `http://localhost:8080/api/product/search?keyword=${inputValue.value}`
      );
      searchResults.value = response.data;
      noResults.value = response.data.length === 0;
      console.log(response.data);
    } catch (error) {
      console.error("Error searching:", error);
    }
  } else {
    showSearchResults.value = false;
    searchResults.value = [];
    noResults.value = false;
  }
};

</script>
