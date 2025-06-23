export class GetItemQuantityUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(name) {
        return await this.repository.getQuantity(name);
    }
}