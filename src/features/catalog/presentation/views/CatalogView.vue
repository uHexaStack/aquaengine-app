<script>
import {useInventoryStore} from '@/features/inventory/application/stores/useInventoryStore.js';
import {useCartStore} from '@/features/cart/application/stores/useCartStore.js';

export default {
  name: 'CatalogView',

  data() {
    return {
      store: useInventoryStore(),
      cart: useCartStore(),
      loading: false,
      error: null,
      notification: '',
      filterText: '',
      sortOrder: 'asc',
      itemsCopy: []
    };
  },

  computed: {
    displayedItems() {
      let list = [...this.itemsCopy];

      if (this.filterText) {
        const ft = this.filterText.toLowerCase();
        list = list.filter(i => i.name.toLowerCase().includes(ft));
      }

      list.sort((a, b) =>
          this.sortOrder === 'asc'
              ? a.price.amount - b.price.amount
              : b.price.amount - a.price.amount
      );
      return list;
    }
  },
  methods: {
    async fetchItems() {
      this.loading = true;
      try {
        this.error = null;
        await this.store.fetchCatalogItems();
        this.itemsCopy = this.store.catalogItems;
      } catch (e) {
        this.error = e.message;
      } finally {
        this.loading = false;
      }
    },
    onFilter() {
      // resetea a la página 1 si paginaras
    },
    onSort() {
      // nada más, el computed se encarga
    },
    addToCart(item) {
      this.cart.addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        currency: item.price.currency
      });

      this.notification = this.$t('catalog.addedToCart');
      setTimeout(() => {
        this.notification = '';
      }, 3000);
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>


<template>
  <div class="p-8">
    <!-- Aviso de agregación al carrito -->
    <div
        v-if="notification"
        class="bg-green-100 text-green-800 px-4 py-2 rounded mb-4 transition-opacity"
    >
      {{ notification }}
    </div>

    <!-- Controles -->
    <div class="flex flex-col md:flex-row md:justify-between mb-6 gap-4">
      <input
          v-model="filterText"
          @input="onFilter"
          type="text"
          :placeholder="$t('catalog.filterByName')"
          class="border p-2 rounded focus:ring-2 focus:ring-blue-300 w-full md:w-1/3"
      />
      <select v-model="sortOrder" @change="onSort"
              class="border p-2 rounded focus:ring-2 focus:ring-blue-300 w-full md:w-1/6">
        <option value="asc">{{ $t('catalog.sortPriceAsc') }}</option>
        <option value="desc">{{ $t('catalog.sortPriceDesc') }}</option>
      </select>
    </div>

    <!-- Grilla de productos -->
    <div class="catalog grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
          v-for="item in displayedItems"
          :key="item.id"
          class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition flex flex-col items-center"
      >
        <img src="@/assets/images/inventory-logo.png" alt="item-icon" class="h-16 w-16 mb-4"/>
        <span class="text-lg font-medium">{{ item.name }}</span>
        <span class="mt-2">{{ item.price.amount }} {{ item.price.currency }}</span>
        <small class="text-gray-500 mt-1">Provider: {{ item.userId }}</small>
        <button
            @click="addToCart(item)"
            class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {{ $t('catalog.order') }}
        </button>
      </div>
    </div>

    <p v-if="error" class="text-red-500 text-center mt-4">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>