export class GetAllCatalogItemsUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    async execute() {
        return await this.repository.getAllForCatalog();
    }
}