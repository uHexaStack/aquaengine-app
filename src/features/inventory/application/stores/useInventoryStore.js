import {defineStore} from "pinia";

import {InventoryRepository} from '@/features/inventory/infrastructure/repositories/InventoryRepository.js';
import {CreateInventoryItemUseCase} from '@/features/inventory/application/usecases/CreateInventoryItemUseCase.js';
import {GetAllInventoryItemsUseCase} from '@/features/inventory/application/usecases/GetAllInventoryItemsUseCase.js';
import {AdjustInventoryStockUseCase} from '@/features/inventory/application/usecases/AdjustInventoryStockUseCase.js';
import { ReserveInventoryUseCase } from "@/features/inventory/application/usecases/ReserveInventoryUseCase.js";
import { ReleaseInventoryUseCase } from "@/features/inventory/application/usecases/ReleaseInventoryUseCase.js";
import { GetItemQuantityUseCase } from "@/features/inventory/application/usecases/GetItemQuantityUseCase.js";
import { GetLowStockItemUseCase } from "@/features/inventory/application/usecases/GetLowStockItemUseCase.js";
import { GetAllLowStockItemsUseCase } from "@/features/inventory/application/usecases/GetAllLowStockItemsUseCase.js";
import { GetAllCatalogItemsUseCase } from "@/features/inventory/application/usecases/GetAllCatalogItemsUseCase.js";

const repository = new InventoryRepository();
const createInventoryItemUseCase = new CreateInventoryItemUseCase(repository);
const getAllInventoryItemsUseCase = new GetAllInventoryItemsUseCase(repository);
const adjustInventoryStockUseCase = new AdjustInventoryStockUseCase(repository);
const reserveInventoryStockUseCase   = new ReserveInventoryUseCase(repository);
const releaseInventoryStockUseCase   = new ReleaseInventoryUseCase(repository);
const getItemQuantityUseCase    = new GetItemQuantityUseCase(repository);
const getLowStockItemUseCase    = new GetLowStockItemUseCase(repository);
const getAllLowStockItemsUseCase = new GetAllLowStockItemsUseCase(repository);
const getAllCatalogItemsUseCase = new GetAllCatalogItemsUseCase(repository);

export const useInventoryStore = defineStore("inventory", {
    state: () => ({
        items: [],
        quantities: {},
        lowStockItemsMap: {},
        allLowStockItems: [],
        catalogItems: [],
        loading: false,
        error: null,
    }),

    actions: {
        async fetchAllItems() {
            this.loading = true;

            try {
                this.error = null;
                this.lines = await getAllInventoryItemsUseCase.execute();
            } catch (e) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        },

        async fetchCatalogItems() {
            this.loading = true;
            try {
                this.error = null;
                this.catalogItems = await getAllCatalogItemsUseCase.execute();
            } catch (e) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        },

        async createItem(itemData) {
            try {
                const newItem = await createInventoryItemUseCase.execute(itemData);
                this.lines.push(newItem);
                return newItem;
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },

        async adjustItemStock(itemId, adjustBy) {
            try {
                await adjustInventoryStockUseCase.execute(itemId, adjustBy);
                await this.fetchAllItems();
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },

        async reserveItemStock(itemId, quantity) {
            this.loading = true;
            this.error = null;
            try {
                await reserveInventoryStockUseCase.execute(itemId, quantity);
                await this.fetchAllItems();
            } catch (e) {
                this.error = e.message;
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async releaseItemStock(itemId, quantity) {
            this.loading = true;
            this.error = null;
            try {
                await releaseInventoryStockUseCase.execute(itemId, quantity);
                await this.fetchAllItems();
            } catch (e) {
                this.error = e.message;
                throw e;
            } finally {
                this.loading = false;
            }
        },

        async fetchItemQuantity(name) {
            this.error = null;
            try {
                const qty = await getItemQuantityUseCase.execute(name);
                this.quantities = { ...this.quantities, [name]: qty };
                return qty;
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },

        async fetchLowStockItem(name) {
            this.error = null;
            try {
                const item = await getLowStockItemUseCase.execute(name);
                this.lowStockItemsMap = { ...this.lowStockItemsMap, [name]: item };
                return item;
            } catch (e) {
                this.error = e.message;
                throw e;
            }
        },

        async fetchAllLowStockItems() {
            this.loading = true;
            this.error = null;
            try {
                this.allLowStockItems = await getAllLowStockItemsUseCase.execute();
            } catch (e) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        }
    }
});