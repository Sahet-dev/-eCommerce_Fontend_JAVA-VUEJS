import { createRouter, createWebHistory } from 'vue-router';

import ProductDetails from '../pages/ProductDetails.vue';
import ProductUpdate from '../pages/ProductUpdate.vue';
import AddProduct from '../pages/AddProduct.vue';
import Products from '../pages/Products.vue';
import Checkout from '../pages/Checkout.vue';

const routes = [
    { path: '/', name: 'Home', component: Products },
    { path: '/product', name: 'Products', component: Products },
    { path: '/add-product', name: 'AddProduct', component: AddProduct },
    { path: '/checkout', name: 'Checkout', component: Checkout },
    { path: "/product/:id", name: "ProductDetails", component: ProductDetails },
    { path: "/product/:id/edit", name: "ProductUpdate", component: ProductUpdate },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
