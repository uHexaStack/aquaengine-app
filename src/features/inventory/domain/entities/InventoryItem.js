export class InventoryItem {

    constructor({
        id = 0,
        userId = 0,
        name = "",
        price = { amount: 0, currency: "" },
        quantityOnHand = 0,
        threshold = 0
    }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.price = price;
        this.quantityOnHand = quantityOnHand;
        this.threshold = threshold;
    }
}