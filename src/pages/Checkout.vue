<template>
  <div>
    <h1>Your Cart</h1>
    <div v-for="item in cart" :key="item.id">
      <p>{{ item.name }} - ${{ item.price }}</p>
    </div>
    <button @click="checkout">Checkout</button>
  </div>
</template>

<script>
import { useCartStore } from '../store/cart';

export default {
  setup() {
    const cartStore = useCartStore();
    const cart = cartStore.cart;

    const checkout = () => {
      alert('Checkout complete!');
      cartStore.clearCart();
    };

    return { cart, checkout };
  },
};
</script>
