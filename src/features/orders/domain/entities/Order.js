export class Order {
    constructor({
                    id = 0,
                    userId = 0,
                    status = '',
                    shippingAddress = '',
                    totalAmount = 0,
                    items = []
                }) {
        this.id = id
        this.userId = userId
        this.status = status
        this.shippingAddress = shippingAddress
        this.totalAmount = totalAmount
        this.items = items
    }
}