export class ReleaseInventoryUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(itemId, quantity) {
        return await this.repository.releaseStock(itemId, quantity);
    }
}