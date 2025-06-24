import ApiService from '@/common/api/api.service.js';
import {InventoryItemDto} from "@inventory/infrastructure/dtos/InventoryItemDto.js";

class InventoryApiService {
    static async getAll() {
        const {data} = await ApiService.get('inventories');
        return data.map(item => new InventoryItemDto(item).toDomain());
    }

    static async getAllForCatalog() {
        const {data} = await ApiService.get('inventories/all');
        return data.map(item => new InventoryItemDto(item).toDomain());
    }

    static async create(domainItem) {
        const payload = InventoryItemDto.fromDomain(domainItem);
        const {data} = await ApiService.post('inventories', payload);
        return new InventoryItemDto(data).toDomain();
    }

    static async adjust(itemId, adjustBy) {
        const {data} = await ApiService.put(`inventories/adjust/${itemId}?adjustBy=${adjustBy}`);
        return new InventoryItemDto(data).toDomain();
    }

    static async reserve(itemId, quantity) {
        const {data} = await ApiService.post(`inventories/${itemId}/reserve?quantity=${quantity}`);
        return new InventoryItemDto(data).toDomain();
    }

    static async release(itemId, quantity) {
        const {data} = await ApiService.post(`inventories/${itemId}/release?quantity=${quantity}`);
        return new InventoryItemDto(data).toDomain();
    }

    static async getQuantity(name) {
        const {data} = await ApiService.get(`inventories/items/${encodeURIComponent(name)}`);
        return new InventoryItemDto(data).toDomain();
    }

    static async getLowStockForItem(name) {
        const {data} = await ApiService.get(`inventories/items/${encodeURIComponent(name)}/low-stock`);
        return new InventoryItemDto(data).toDomain();
    }

    static async getAllLowStock() {
        const {data} = await ApiService.get('inventories/low-stock');
        return data.map(item => new InventoryItemDto(item).toDomain());
    }
}

export default InventoryApiService;
