<script>
import {useAuthStore} from "@/features/auth/application/stores/useAuthStore.js";

export default {
  name: "DashboardView",
  setup() {
    const auth = useAuthStore();
    return {auth};
  }
};
</script>

<template>
  <div class="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 w-full">
    <!-- Inventario: solo para proveedores -->
    <router-link
        v-if="auth.role === 'ROLE_MACHINERY_PROVIDER'"
        to="/inventory"
        class="feature__item"
    >
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img src="@/assets/images/inventory-logo.png" alt="inventory-icon" class="h-16 w-16 mb-4"/>
          <span class="text-lg font-medium">{{ $t("home.inventory") }}</span>
        </div>
      </div>
    </router-link>

    <!-- Catálogo (global): solo para compañías pesqueras -->
    <router-link
        v-if="auth.role === 'ROLE_FISHING_COMPANY'"
        to="/catalog"
        class="feature__item"
    >
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img src="@/assets/images/inventory-logo.png" alt="catalog-icon" class="h-16 w-16 mb-4"/>
          <span class="text-lg font-medium">{{ $t("catalog.title") }}</span>
        </div>
      </div>
    </router-link>
    <!-- Órdenes: solo para compañías pesqueras -->
    <router-link
        v-if="auth.role === 'ROLE_FISHING_COMPANY'"
        to="/cart"
        class="feature__item"
    >
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img src="@/assets/images/cart-logo.webp" alt="orders-icon" class="h-16 w-16 mb-4"/>
          <span class="text-lg font-medium">{{ $t("home.orders") }}</span>
        </div>
      </div>
    </router-link>


    <router-link
        v-if="auth.role === 'ROLE_FISHING_COMPANY'"
        to="/orders"
        class="feature__item"
    >
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img src="@/assets/images/orders-logo.png" alt="orders-icon" class="h-16 w-16 mb-4"/>
          <span class="text-lg font-medium">{{ $t("home.orders") }}</span>
        </div>
      </div>
    </router-link>


  </div>
</template>

<style scoped>
.dashboard {

}

.feature__card {
  background-color: #ffffff;
}

.feature__content {
  text-align: center;
}
</style>
