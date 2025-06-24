export class GetOrderDetailsUseCase {
    constructor(repo) {
        this.repo = repo
    }

    async execute(orderId) {
        return await this.repo.getById(orderId)
    }
}