export class IOrderRepository {
    static async getAllByUser(userId) {
        throw new Error('getAllByUser() not implemented')
    }
    static async getById(orderId) {
        throw new Error('getById() not implemented')
    }
    static async createOrder(payload) {
        throw new Error('createOrder() not implemented')
    }
    static async cancelOrder(orderId) {
        throw new Error('cancelOrder() not implemented')
    }
}