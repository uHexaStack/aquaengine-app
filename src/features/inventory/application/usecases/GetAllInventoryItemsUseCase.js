export class GetAllInventoryItemsUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute() {
        return await this.repository.getAllItems();
    }
}