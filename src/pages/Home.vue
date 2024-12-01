<template>
  <div class="hero-container">
    <!-- Hero Section -->
    <h1 class="hero-heading">
      Welcome to <span class="highlight">Simple E-Commerce</span>
    </h1>
    <!-- Call to Action Button -->
    <router-link to="/products" class="cta-button">
      Shop Now
    </router-link>
  </div>
</template>

<style>
/* Hero Container */
.hero-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  font-family: 'Arial', sans-serif;
  text-align: center;
}

/* Heading Styles */
.hero-heading {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.hero-heading .highlight {
  text-decoration: underline;
  text-decoration-style: wavy;
  text-decoration-color: #fbbf24;
}

/* Call-to-Action Button */
.cta-button {
  display: inline-block;
  background-color: #fbbf24;
  color: black;
  padding: 12px 32px;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  text-decoration: none;
}

.cta-button:hover {
  background-color: #d97706;
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
