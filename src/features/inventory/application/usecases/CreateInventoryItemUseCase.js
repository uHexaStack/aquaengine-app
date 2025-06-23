export class CreateInventoryItemUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute(itemData) {
        return await this.repository.createInventoryItem(itemData);
    }
}