import { defineStore } from "pinia";
import JwtService from "@/common/services/jwt.service.js";
import ApiService from "@/common/services/api.service.js";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: JwtService.getToken() || null,
        userId: JwtService.getUserId() || null,
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
            this.userId = JwtService.getUserId();
        },
        clearAuth() {
            this.user = null;
            this.token = null;
            this.userId = null;
            JwtService.destroyToken();
        },
        async fetchUser() {
            if (!this.userId)
                return;
            try {
                const { data } = await ApiService.get(`/profiles/user/${this.userId}`);
                this.user = data;
            } catch {
                this.clearAuth();
            }
        },
    },
});