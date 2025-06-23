export class GetAllLowStockItemsUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute() {
        return await this.repository.getAllLowStockItems();
    }
}