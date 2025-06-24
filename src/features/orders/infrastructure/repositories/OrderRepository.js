import { IOrderRepository } from '@orders/domain/repositories/IOrderRepository.js'
import OrderApiService from '@orders/infrastructure/api/order.api.js'

export class OrderRepository extends IOrderRepository {
    async getAllOrders(userId) {
        return await OrderApiService.getAll();
    }
    async getById(orderId) {
        return await OrderApiService.getById(orderId)
    }
    async createOrder(payload) {
        return await OrderApiService.create(payload)
    }
    async cancelOrder(orderId) {
        return await OrderApiService.cancel(orderId)
    }
}