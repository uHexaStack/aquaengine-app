export class SignUpUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute(signUpData) {
        return await this.userRepo.signUp(signUpData);
    }
}
