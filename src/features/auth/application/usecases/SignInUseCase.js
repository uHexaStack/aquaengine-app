export class SignInUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute({ username, password }) {
        return await this.userRepo.signIn({ username, password });
    }
}