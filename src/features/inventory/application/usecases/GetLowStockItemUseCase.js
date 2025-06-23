export class GetLowStockItemUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(name) {
        return await this.repository.getLowStockItem(name);
    }
}