<script>
import { useOrdersStore } from '@/features/orders/application/stores/useOrdersStore.js'
import OrderForm from '@/features/orders/presentation/components/OrderForm.vue'
import ApiService from '@/common/api/api.service.js';
import jsPDF from 'jspdf';

export default {
  components: {
    OrderForm
  },

  data: () => ({
    showForm: false
  }),

  setup() {
    const store = useOrdersStore()
    store.fetchAll()
    return { store }
  },

  methods: {
    create(data) {
      this.store.create(data).then(() => this.showForm = false)
    },

    goDetail(id) {
      this.$router.push({ name: 'OrderDetail', params: { id } })
    },

    cancel(id) {
      this.store.cancel(id)
    },

    async viewInvoice(orderId) {
      try {
        const res = await ApiService.get('invoices', orderId);
        const invoice = res.data;

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text('INVOICE', 105, 20, { align: 'center' });

        doc.setFontSize(12);
        doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 20, 40);
        doc.text(`Order ID: ${invoice.orderId}`, 20, 50);
        doc.text(`Issued At: ${new Date(invoice.issuedAt).toLocaleString()}`, 20, 60);
        doc.text(`Status: ${invoice.status}`, 20, 70);
        doc.text(`Amount: ${invoice.amount} ${invoice.currency}`, 20, 80);

        doc.setLineWidth(0.5);
        doc.line(20, 85, 190, 85);

        doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
      } catch (err) {
        alert(`Failed to load invoice: ${err.response?.data?.message || err.message}`);
      }
    }
  }
}
</script>


<template>
  <div class="p-4 bg-gray-50">

    <!-- Header Actions -->
    <div class="flex flex-wrap items-center justify-between mb-6">
      <h1 class="text-2xl font-bold">{{ $t('orders.myOrders') }}</h1>
      <button @click="showForm=true"
              class="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
        {{ $t('orders.newOrder') }}
      </button>
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-xl shadow-lg">
      <table class="w-full table-auto">
        <thead class="bg-blue-100">
        <tr>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('orders.id') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('orders.status') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('orders.total') }}</th>
          <th class="px-6 py-3 text-left text-gray-700 font-medium">{{ $t('common.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="o in store.list" :key="o.id" class="border-b hover:bg-gray-50 transition">
          <td class="px-6 py-4 text-gray-800">{{ o.id }}</td>
          <td class="px-6 py-4 text-gray-800">{{ o.status }}</td>
          <td class="px-6 py-4 text-gray-800">{{ o.totalAmount }}</td>
          <td class="px-6 py-4">
            <button @click="goDetail(o.id)"
                    class="px-3 py-1 rounded-lg shadow transition bg-blue-600 text-white hover:bg-blue-700">
              {{ $t('common.view') }}
            </button>
            <button v-if="o.status==='CREATED'" @click="cancel(o.id)"
                    class="ml-2 px-3 py-1 rounded-lg shadow transition bg-red-600 text-white hover:bg-red-700">
              {{ $t('orders.cancel') }}
            </button>
            <button @click="viewInvoice(o.id)"
                    class="ml-2 px-3 py-1 rounded-lg shadow transition bg-purple-600 text-white hover:bg-purple-700">
              Download Invoice
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Form Modal -->
    <OrderForm v-if="showForm" @save="create" @close="showForm=false"/>
  </div>
</template>

<style scoped>

</style>