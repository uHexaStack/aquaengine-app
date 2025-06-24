<script>
export default {props: {order: {type: Object, required: true}}}
</script>

<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="font-bold mb-2">{{ $t('orders.orderDetail') }} #{{ order.id }}</h2>
    <p><strong>{{ $t('orders.status') }}:</strong> {{ order.status }}</p>
    <p><strong>{{ $t('orders.shippingAddress') }}:</strong> {{ order.shippingAddress }}</p>
    <table class="w-full mt-3">
      <thead>
      <tr>
        <th>{{ $t('orders.productId') }}</th>
        <th>{{ $t('orders.quantity') }}</th>
        <th>{{ $t('orders.unitPrice') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="i in order.items" :key="i.productId">
        <td>{{ i.productId }}</td>
        <td>{{ i.quantity }}</td>
        <td>{{ i.unitPrice }} {{ i.currency }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>