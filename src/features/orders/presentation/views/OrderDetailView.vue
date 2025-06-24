<script>
import {useOrdersStore} from '@/features/orders/application/stores/useOrdersStore.js'
import OrderDetail from '@/features/orders/presentation/components/OrderDetail.vue'

export default {
  components: {OrderDetail},
  setup(_, {route}) {
    const store = useOrdersStore();
    store.fetchDetails(route.params.id);
    return {store};
  }
}
</script>

<template>
  <div class="p-4">
    <button @click="$router.back()" class="mb-3">{{ $t('common.back') }}</button>
    <OrderDetail :order="store.current"/>
  </div>
</template>

<style scoped>

</style>