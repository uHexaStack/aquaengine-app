import ApiService from "@/common/api/api.service.js"

class AuthApiService {
    static signIn(payload) {
        return ApiService.post("/authentication/sign-in", payload);
    }

    static signUp(payload) {
        return ApiService.post("/authentication/sign-up", payload);
    }
}

export default AuthApiService;