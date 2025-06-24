// src/features/orders/infrastructure/api/order.api.js
import ApiService from '@/common/api/api.service.js'
import { OrderDto } from '@/features/orders/infrastructure/dtos/OrderDto.js'

export default class OrderApiService {
    /* GET /api/v1/orders */
    static async getAll() {
        const { data } = await ApiService.get('orders')
        return data.map(o => new OrderDto(o).toDomain())
    }

    /* GET /api/v1/orders/{id} */
    static async getById(orderId) {
        const { data } = await ApiService.get(`orders/${orderId}`)
        return new OrderDto(data).toDomain()
    }

    /* POST /api/v1/orders */
    static async create(orderDomain) {
        const payload = OrderDto.fromDomain(orderDomain)
        const { data } = await ApiService.post('orders', payload)
        return new OrderDto(data).toDomain()
    }

    /* PATCH /api/v1/orders/{id}/cancel */
    static async cancel(orderId) {
        const { data } = await ApiService.patch(`orders/${orderId}/cancel`, {
            status: 'CANCELLED'
        })
        return new OrderDto(data).toDomain()
    }

    /* Opcionales: confirm, ship, deliver */
    static async confirm(orderId) {
        return this._patchStatus(orderId, 'confirm', 'CONFIRMED')
    }
    static async ship(orderId)    {
        return this._patchStatus(orderId, 'ship',    'SHIPPED')
    }
    static async deliver(orderId) {
        return this._patchStatus(orderId, 'deliver', 'DELIVERED')
    }

    static async _patchStatus(orderId, action, status) {
        const { data } = await ApiService.patch(`orders/${orderId}/${action}`, { status })
        return new OrderDto(data).toDomain()
    }
}
