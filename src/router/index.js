import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/auth.js";

const routes = [
    {
        path: "/login",
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        // If not authenticated → redirect to login
        return next({ path: "/login", replace: true });
    }

    if (to.meta.guest && auth.isAuthenticated) {
        // If authenticated and trying to access a guest route → redirect to dashboard
        return next({ path: "/dashboard", replace: true });
    }

    next();
});

export default router;