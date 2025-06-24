export class OrderItem {
    constructor({
                    productId = 0,
                    productName = '',
                    quantity = 0,
                    unitPrice = 0,
                    currency = 'USD'
                }) {
        this.productId = productId
        this.productName = productName
        this.quantity = quantity
        this.unitPrice = unitPrice
        this.currency = currency
    }
}