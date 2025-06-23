import {InventoryItem} from "@inventory/domain/entities/InventoryItem.js";

export class InventoryItemDto {
    constructor({
                    id,
                    userId,
                    name,
                    price,
                    quantityOnHand,
                    reservedQuantity,
                    threshold,
                }) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.price = price;
        this.quantityOnHand = quantityOnHand;
        this.reservedQuantity = reservedQuantity;
        this.threshold = threshold;
    }

    static fromDomain(item) {
        return {
            name: item.name,
            price: {amount: item.price.amount, currency: item.price.currency},
            quantityOnHand: item.quantityOnHand,
            reservedQuantity: item.reservedQuantity,
            threshold: item.threshold
        };
    }

    toDomain() {
        return new InventoryItem({
            id: this.id,
            userId: this.userId,
            name: this.name,
            price: this.price,
            quantityOnHand: this.quantityOnHand,
            reservedQuantity: this.reservedQuantity,
            threshold: this.threshold
        });
    }
}