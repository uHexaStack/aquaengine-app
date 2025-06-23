<template>
  <div class="p-4 bg-gray-50">
    <!-- Header Actions -->
    <div class="flex flex-wrap items-center justify-between mb-6">
      <div class="flex flex-wrap gap-2">
        <button
            @click="fetchAll"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          {{ $t('inventory.reload') }}
        </button>
        <button
            @click="openCreateForm"
            class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          {{ $t('inventory.newItem') }}
        </button>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <input
            v-model="filterName"
            @input="handleFilterInput"
            type="text"
            :placeholder="$t('inventory.filterByName')"
            class="px-4 py-2 w-64 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <div
            v-if="filteredItems.length > rowsPerPage"
            class="flex justify-center items-center gap-2"
        >
          <button
              @click="goToPage(page - 1)"
              :disabled="page === 1"
              class="px-3 py-1 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
          >
            &laquo;
          </button>
          <button
              v-for="p in totalPages"
              :key="p"
              @click="goToPage(p)"
              :class="[
              'px-4 py-1 rounded-lg shadow transition',
              p === page
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ p }}
          </button>
          <button
              @click="goToPage(page + 1)"
              :disabled="page === totalPages"
              class="px-3 py-1 rounded-lg shadow transition disabled:opacity-50 disabled:cursor-not-allowed bg-gray-200 hover:bg-gray-300"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="bg-white rounded-xl shadow-lg">
      <table class="w-full table-auto">
        <thead class="bg-blue-100">
        <tr>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('inventory.name') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('inventory.price') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('inventory.quantity') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('inventory.threshold') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('common.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in paginatedItems"
            :key="item.id"
            class="border-b hover:bg-gray-50 transition"
        >
          <td class="px-6 py-4 text-gray-800">{{ item.name }}</td>
          <td class="px-6 py-4 text-gray-800">
            {{ item.price.amount }}
            <span class="text-sm text-gray-500">{{ item.price.currency }}</span>
          </td>
          <td class="px-6 py-4 text-gray-800">{{ item.quantityOnHand }}</td>
          <td class="px-6 py-4 text-gray-800">{{ item.threshold }}</td>
          <td class="px-6 py-4">
            <button
                @click="openActionForm(item, 'adjust')"
                class="px-3 py-1 bg-yellow-400 text-gray-800 rounded-lg shadow hover:bg-yellow-500 transition"
            >
              {{ $t('inventory.adjust') }}
            </button>
          </td>
        </tr>
        <tr v-if="!loading && paginatedItems.length === 0">
          <td colspan="5" class="px-6 py-4 text-center text-gray-500">
            {{ $t('inventory.empty') }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Error Message -->
    <p v-if="error" class="mt-4 text-red-500">{{ error }}</p>

    <!-- Inventory Form Modal -->
    <InventoryForm
        v-if="showForm"
        :item="currentItem"
        @save="currentItem.mode === 'create' ? handleCreateItem($event) : handleSave(currentItem.id, $event)"
        @close="closeForm"
    />
  </div>
</template>

<script>
import { useInventoryStore } from '@/features/inventory/application/stores/useInventoryStore.js';
import InventoryForm from '@/features/inventory/presentation/components/InventoryForm.vue';

export default {
  name: 'InventoryListView',
  components: { InventoryForm },

  data() {
    return {
      store: useInventoryStore(),
      error: null,
      loading: false,
      showForm: false,
      currentItem: null,
      page: 1,
      rowsPerPage: 5,
      filterName: ''
    };
  },

  computed: {
    safeItems() {
      return Array.isArray(this.store.items) ? this.store.items : [];
    },
    filteredItems() {
      if (!this.filterName) return this.safeItems;
      const filter = this.filterName.toLowerCase();
      return this.safeItems.filter(item =>
          item.name?.toLowerCase().includes(filter)
      );
    },
    paginatedItems() {
      const start = (this.page - 1) * this.rowsPerPage;
      return this.filteredItems.slice(start, start + this.rowsPerPage);
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredItems.length / this.rowsPerPage));
    }
  },

  methods: {
    async fetchAll() {
      this.loading = true;
      try {
        this.error = null;
        await this.store.fetchAllItems();
      } catch (err) {
        this.error = err.message || this.$t('common.error');
      } finally {
        this.loading = false;
      }
    },
    openCreateForm() {
      this.currentItem = { mode: 'create' };
      this.showForm = true;
    },
    openActionForm(item, mode) {
      this.currentItem = { ...item, mode };
      this.showForm = true;
    },
    closeForm() {
      this.showForm = false;
      this.currentItem = null;
    },
    async handleCreateItem(formData) {
      const amount = Number(formData.price);
      const payload = {
        name: formData.name,
        price: {
          amount: Number.isInteger(amount) && amount > 0 ? amount : 1,
          currency: formData.currency || 'USD'
        },
        quantityOnHand: Math.max(0, Math.floor(Math.abs(Number(formData.initialQuantity)))),
        threshold: Math.max(0, Math.floor(Math.abs(Number(formData.threshold))))
      };
      try {
        await this.store.createItem(payload);
        this.closeForm();
        await this.fetchAll();
        this.page = 1;
      } catch (err) {
        this.error = err.message || this.$t('common.error');
      }
    },
    async handleSave(id, payload) {
      try {
        if (this.currentItem.mode === 'adjust') {
          await this.store.adjustItemStock(id, payload.adjustBy);
        }
        this.closeForm();
        await this.fetchAll();
      } catch (err) {
        this.error = err.message || this.$t('common.error');
      }
    },
    goToPage(p) {
      if (p >= 1 && p <= this.totalPages) this.page = p;
    },
    handleFilterInput() {
      this.page = 1;
    }
  },

  mounted() {
    this.fetchAll();
  }
};
</script>

<style scoped>
/* Mantener btn-elegant para compatibilidad */
.btn-elegant {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);
  font-weight: 600;
  font-size: 0.875rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
}
.btn-elegant:focus {
  outline: none;
  box-shadow: 0 0 0 2px #90cdf4, 0 2px 8px 0 rgba(0,0,0,0.08);
}
</style>
