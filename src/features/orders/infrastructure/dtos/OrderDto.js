import { Order } from '@orders/domain/entities/Order.js';
import { OrderItem } from '@orders/domain/entities/OrderItem.js';

export class OrderDto {
    constructor({ id, userId, status, shippingAddress, totalAmount, lines = [] }) {
        this.id             = id
        this.userId         = userId
        this.status         = status
        this.shippingAddress= shippingAddress
        this.totalAmount    = totalAmount
        this.lines          = lines
    }

    /* payload ↓ */
    static fromDomain(order) {
        const lines = order.lines ?? order.items ?? [];   // ✅ seguro

        return {
            userId:          order.userId,
            shippingAddress: order.shippingAddress,
            lines: lines.map(i => ({
                productId: i.productId,
                quantity:  i.quantity,
                unitPrice: i.unitPrice,
                currency:  i.currency
            }))
        };
    }

    /* respuesta ↑ a dominio */
    toDomain() {
        const safeLines = Array.isArray(this.lines) ? this.lines : [];

        return new Order({
            id:            this.id,
            userId:        this.userId,
            status:        this.status,
            shippingAddress:this.shippingAddress,
            totalAmount:   this.totalAmount,
            items: safeLines.map(i => new OrderItem({
                productId:  i.productId,
                productName:i.productName,
                quantity:   i.quantity,
                unitPrice:  i.unitPrice,
                currency:   i.currency
            }))
        });
    }
}
