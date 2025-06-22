import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/features/auth/application/stores/useAuthStore.js";

import authRoutes from '@/features/auth/presentation/router.js'
import homeRoutes from '@/features/home/presentation/router.js'

const routes = [
    { path: '/', redirect: '/auth/sign-in' },
    ...authRoutes,
    ...homeRoutes,
    { path: '/:catchAll(.*)*', redirect: '/' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        // If not authenticated → redirect to sign-in
        if (to.path !== "/auth/sign-in") {
            return next({ path: "/auth/sign-in", replace: true });
        }
    }

    if (to.meta.guest && auth.isAuthenticated) {
        // If authenticated and trying to access a guest route → redirect to dashboard
        if (to.path !== "/dashboard") {
            return next({ path: "/dashboard", replace: true });
        }
    }

    next();
});

export default router;