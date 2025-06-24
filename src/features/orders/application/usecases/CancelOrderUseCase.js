export class CancelOrderUseCase {
    constructor(repo) {
        this.repo = repo
    }

    async execute(orderId) {
        return await this.repo.cancelOrder(orderId)
    }
}