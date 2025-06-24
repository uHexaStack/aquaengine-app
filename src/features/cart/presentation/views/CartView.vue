<script>
import {useCartStore} from '@/features/cart/application/stores/useCartStore.js';
import {useOrdersStore} from '@/features/orders/application/stores/useOrdersStore.js';

export default {
  name: 'CartView',
  data() {
    return {
      cart: useCartStore(),
      orders: useOrdersStore(),
      checkoutError: null,
      showShippingModal: false,
      shipping: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }
    };
  },
  methods: {
    remove(id) {
      this.cart.removeItem(id);
    },
    async checkout() {
      const currencies = new Set(this.cart.items.map(i => i.currency));
      if (currencies.size > 1) {
        this.checkoutError = this.$t('cart.errorDifferentCurrency');
        return;
      }
      const [currency] = currencies;
      const payload = {
        shippingAddress: {...this.shipping},
        lines: this.cart.items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          unitPrice: i.price.amount,
          currency: currency
        }))
      };
      try {
        await this.orders.create(payload);
        this.cart.clearCart();
        this.$router.push('/orders');
      } catch (e) {
        /* si algo escapa a la validación */
        this.checkoutError = e.message || this.$t('common.error');
      }
    }
  }
};
</script>

<template>
  <div class="container mx-auto p-8">
    <h1 class="text-2xl mb-4">{{ $t('cart.title') }}</h1>

    <!-- Shipping Address Button -->
    <button @click="showShippingModal = true" class="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none">
      {{ $t('cart.shippingAddress') }}
    </button>

    <!-- Shipping Address Modal -->
    <div v-if="showShippingModal" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50" @click="showShippingModal = false"></div>
      <div class="bg-white p-8 rounded-lg shadow-2xl z-10 w-11/12 md:w-1/2">
        <h2 class="font-semibold text-xl mb-6">{{ $t('cart.shippingAddress') }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input v-model="shipping.street" :placeholder="$t('cart.addressStreet')" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input v-model="shipping.city" :placeholder="$t('cart.addressCity')" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input v-model="shipping.state" :placeholder="$t('cart.addressState')" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input v-model="shipping.postalCode" :placeholder="$t('cart.addressPostal')" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <input v-model="shipping.country" :placeholder="$t('cart.addressCountry')" class="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div class="mt-6 flex justify-end">
          <button @click="showShippingModal = false" class="px-5 py-2 bg-gray-700 text-white rounded transition duration-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400">
            {{ $t('common.close') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Cart Table -->
    <table class="w-full mb-6 min-w-full divide-y divide-gray-200" v-if="cart.items.length">
      <thead class="bg-gray-50">
      <tr>
        <th class="px-4 py-2 text-left">{{ $t('cart.product') }}</th>
        <th class="px-4 py-2 text-left">{{ $t('cart.qty') }}</th>
        <th class="px-4 py-2 text-left">{{ $t('cart.price') }}</th>
        <th class="px-4 py-2"></th>
      </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
      <tr v-for="i in cart.items" :key="i.id" class="hover:bg-gray-100 transition-colors">
        <td class="px-4 py-2">{{ i.name }}</td>
        <td class="px-4 py-2">{{ i.quantity }}</td>
        <td class="px-4 py-2">{{ i.price.amount * i.quantity }} {{ i.currency }}</td>
        <td class="px-4 py-2">
          <button @click="remove(i.id)" class="text-red-500 hover:underline">{{ $t('common.remove') }}</button>
        </td>
      </tr>
      </tbody>
    </table>
    <p v-else class="text-gray-500">{{ $t('cart.empty') }}</p>

    <!-- Total and Checkout -->
    <div class="flex flex-col sm:flex-row justify-between items-center">
      <span class="mb-2 sm:mb-0">{{ $t('cart.total') }}: {{ cart.totalAmount }}</span>
      <button @click="checkout" class="px-6 py-2 bg-green-600 text-white rounded transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
        {{ $t('cart.checkout') }}
      </button>
    </div>

    <p v-if="checkoutError" class="text-red-500 mt-4">{{ checkoutError }}</p>
  </div>
</template>

<style scoped>
/* Additional custom styles (optional) */
input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}
</style>
