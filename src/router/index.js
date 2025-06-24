import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/features/auth/application/stores/useAuthStore.js";

import authRoutes from '@/features/auth/presentation/router.js';
import homeRoutes from '@/features/home/presentation/router.js';
import cartRoutes from '@/features/cart/presentation/router.js';
import ordersRoutes from '@/features/orders/presentation/router.js';
import catalogRoutes from '@/features/catalog/presentation/router.js';
import inventoryRoutes from '@/features/inventory/presentation/router.js';

import MainLayout from "@/layout/MainLayout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";

const routes = [

    {
        path: '/auth',
        component: AuthLayout,
        children: [
            ...authRoutes,
        ]
    },


    {
        path: '/',
        component: MainLayout,
        meta: { requiresAuth: true },
        children: [
            ...homeRoutes,
            ...catalogRoutes,
            ...inventoryRoutes,
            ...cartRoutes,
            ...ordersRoutes
        ]
    },

    { path: '/:catchAll(.*)*', redirect: '/auth/sign-in' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.guest && auth.isAuthenticated) {
        // If authenticated and trying to access a guest route → redirect to dashboard
        if (to.path !== "/dashboard") {
            return next({ path: "/dashboard", replace: true });
        }
    }

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        // If not authenticated → redirect to sign-in
        if (to.path !== "/auth/sign-in") {
            return next({ path: "/auth/sign-in", replace: true });
        }
    }

    if (to.meta.role && auth.role !== to.meta.role) {
        return next({ path: "/dashboard", replace: true });
    }

    next();
});

export default router;