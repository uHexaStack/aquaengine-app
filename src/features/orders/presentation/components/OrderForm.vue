<script>
export default {
  props: {order: {type: Object, default: null}},
  data() {
    return {
      form: {
        userId: 1,
        shippingAddress: this.order?.shippingAddress || '',
        lines: this.order?.lines.map(i => ({productId: i.productId, quantity: i.quantity}))
            || [{productId: '', quantity: 1}]
      }
    }
  },
  methods: {
    add() {
      this.form.items.push({productId: '', quantity: 1})
    },
    remove(i) {
      this.form.items.splice(i, 1)
    },
    submit() {
      this.$emit('save', {...this.form})
    }
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg w-96">
      <h2 class="text-lg font-bold mb-4">{{ $t('orders.newOrder') }}</h2>
      <form @submit.prevent="submit">
        <div class="space-y-3">
          <div><label>{{ $t('orders.shippingAddress') }}</label>
            <input v-model="form.shippingAddress" class="w-full border p-2 rounded" required/>
          </div>
          <div v-for="(item, i) in form.items" :key="i" class="flex gap-2">
            <input v-model.number="item.productId" placeholder="Product ID" class="border p-2 rounded w-1/3"/>
            <input v-model.number="item.quantity" placeholder="Qty" class="border p-2 rounded w-1/3"/>
            <button type="button" @click="remove(i)" class="text-red-500">×</button>
          </div>
          <button type="button" @click="add" class="text-blue-600">{{ $t('orders.addItem') }}</button>
        </div>
        <div class="mt-4 flex justify-end gap-2">
          <button type="button" @click="$emit('close')" class="px-3 py-1 border rounded">{{
              $t('common.cancel')
            }}
          </button>
          <button type="submit" class="px-3 py-1 bg-green-600 text-white rounded">{{ $t('common.save') }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>