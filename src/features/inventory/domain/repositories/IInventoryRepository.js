export class IInventoryRepository {

    static getAllItems() {
        throw new Error("getAllItems() method not implemented");
    }

    static getAllForCatalog() {
        throw new Error("getAllForCatalog() method not implemented");
    }

    static createInventoryItem(payload) {
        throw new Error("createInventoryItem() method not implemented");
    }

    static adjustStock(id, amount) {
        throw new Error("adjustStock() method not implemented");
    }

    static reserveStock(id, qty) {
        throw new Error("reserveStock() method not implemented");
    }

    static releaseStock(id, qty) {
        throw new Error("releaseStock() method not implemented");
    }
}