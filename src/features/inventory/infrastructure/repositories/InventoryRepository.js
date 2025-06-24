import { IInventoryRepository } from '@/features/inventory/domain/repositories/IInventoryRepository.js';
import InventoryApiService      from '@/features/inventory/infrastructure/api/inventory.api.js';

export class InventoryRepository extends IInventoryRepository {

    async getAllItems() {
        return await InventoryApiService.getAll();
    }

    async getAllForCatalog() {
        return await InventoryApiService.getAllForCatalog();
    }

    async createInventoryItem(payload) {
        return await InventoryApiService.create(payload);
    }

    async adjustStock(id, amount) {
        return await InventoryApiService.adjust(id, amount);
    }

    async reserveStock(id, qty) {
        return await InventoryApiService.reserve(id, qty);
    }

    async releaseStock(id, qty) {
        return await InventoryApiService.release(id, qty);
    }

    async getQuantity(name) {
        return await InventoryApiService.getQuantity(name);
    }

    async getLowStockItem(name) {
        return await InventoryApiService.getLowStockForItem(name);
    }

    async getAllLowStockItems() {
        return await InventoryApiService.getAllLowStock();
    }
}
