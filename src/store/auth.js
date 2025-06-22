import { defineStore } from "pinia";
import JwtService from "@/common/services/jwt.service.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: JwtService.getToken() || null,
        // You can store user data if needed
        user: null,
    }),
    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    actions: {
        setToken(token) {
            this.token = token;
            JwtService.saveToken(token);
        },
        clearAuth() {
            this.token = null;
            this.user = null;
            JwtService.destroyToken();
        },
    },
});