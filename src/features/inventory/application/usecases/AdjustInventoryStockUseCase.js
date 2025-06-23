export class AdjustInventoryStockUseCase {

    constructor(repository) {
        this.repository = repository;
    }
    async execute(itemId, adjustBy) {
        await this.repository.adjustStock(itemId, adjustBy);
    }
}