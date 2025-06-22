import {IUserRepository} from "@/features/auth/domain/repositories/IUserRepository.js";
import ApiService from "@/common/services/api.service.js";
import JwtService from "@/common/services/jwt.service.js";

export class UserRepository extends IUserRepository {

    async signIn({ username, password }) {
        const response = await ApiService.post(
            "authentication/sign-in", { username, password });

        const { id, token } = response.data;
        JwtService.saveToken(token);

        return { id, username, token };
    }

    async signUp(data) {
        const response = await ApiService.post(
            "authentication/sign-up", data);
        return response.data;
    }
}
