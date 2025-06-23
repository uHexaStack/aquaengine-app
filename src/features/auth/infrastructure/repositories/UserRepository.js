import {IUserRepository} from "@/features/auth/domain/repositories/IUserRepository.js";
import AuthApiService from "@/features/auth/infrastructure/api/auth.api.js";
import { saveToken } from "@features/auth/infrastructure/services/jwt.service.js";

export class UserRepository extends IUserRepository {
    async signIn({username, password}) {
        const response = await AuthApiService.signIn({username, password});

        const {id, token} = response.data;
       saveToken(token);

        return {id, username, token};
    }

    async signUp(data) {
        const response =
            await AuthApiService.signUp(data);
        return response.data;
    }
}