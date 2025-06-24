export class CreateOrderUseCase {
    constructor(repo) {
        this.repo = repo
    }

    async execute(orderData) {
        return await this.repo.createOrder(orderData)
    }
}