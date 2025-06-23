export class ReserveInventoryUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(itemId, quantity) {
        return await this.repository.reserveStock(itemId, quantity);
    }
}