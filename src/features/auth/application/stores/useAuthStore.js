import {defineStore} from "pinia";

import JwtService from "@features/auth/infrastructure/services/jwt.service.js";
import ApiService from "@common/api/api.service.js";

import {SignInUseCase} from "@/features/auth/application/usecases/SignInUseCase.js";
import {SignUpUseCase} from "@/features/auth/application/usecases/SignUpUseCase.js";
import {UserRepository} from "@/features/auth/infrastructure/repositories/UserRepository.js";

const userRepo = new UserRepository();
const signInUseCase = new SignInUseCase(userRepo);
const signUpUseCase = new SignUpUseCase(userRepo);

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: JwtService.getToken() || null,
        userId: JwtService.getUserId() || null,
        role: JwtService.getUserRole() || null,
        user: null,
        error: null,
    }),

    getters: {
        isAuthenticated: (state) => !!state.token,
    },

    actions: {
        setToken(token) {
            this.token = token;
            JwtService.saveToken(token);
            this.userId = JwtService.getUserId();
            this.role = JwtService.getUserRole();
            ApiService.setHeader();
        },

        clearAuth() {
            this.user = null;
            this.token = null;
            this.userId = null;
            this.role = null;
            JwtService.destroyToken();
            ApiService.clearHeader();
        },

        async fetchUser() {
            if (!this.userId)
                return;

            try {
                const { data } =
                    await ApiService.get(`profiles/user/${this.userId}`);
                this.user = data;
            } catch (e) {
                this.clearAuth();
            }
        },

        async signIn(credentials) {
            try {
                this.error = null;
                const { id, token, username: user, role } =
                    await signInUseCase.execute(credentials);
                this.setToken(token);
                this.user = { id, username: user };
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },

        async signUp(signUpData) {
            try {
                this.error = null;
                const {id, username, role} = await signUpUseCase.execute(signUpData);
                this.user = {id, username, role};
                return {id, username, role};
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },
    },
});
