<script>
export default {
  name: "DashboardView",
};
</script>

<template>
  <div class="dashboard grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 w-full">
    <!-- Inventory -->
    <router-link to="/inventory" class="feature__item">
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img
              src="@/assets/images/inventory-logo.png"
              alt="inventory-icon"
              class="feature__icon h-16 w-16 mb-4"
          />
          <span class="text-lg font-medium">{{ $t("home.inventory") }}</span>
        </div>
      </div>
    </router-link>

    <!-- Order -->
    <router-link to="/orders" class="feature__item">
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img
              src="@/assets/images/orders-logo.png"
              alt="orders-icon"
              class="feature__icon h-16 w-16 mb-4"
          />
          <span class="text-lg font-medium">{{ $t("home.orders") }}</span>
        </div>
      </div>
    </router-link>

    <!-- Payments -->
    <router-link to="/payments" class="feature__item">
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img
              src="@/assets/images/payments-logo.webp"
              alt="payments-icon"
              class="feature__icon h-16 w-20 mb-4"
          />
          <span class="text-lg font-medium">{{ $t("home.payments") }}</span>
        </div>
      </div>
    </router-link>

    <!-- Notifications -->
    <router-link to="/notifications" class="feature__item">
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img
              src="@/assets/images/notification-logo.webp"
              alt="notifications-icon"
              class="feature__icon h-16 w-16 mb-4"
          />
          <span class="text-lg font-medium">{{ $t("home.notifications") }}</span>
        </div>
      </div>
    </router-link>

    <!-- Perfiles -->
    <router-link to="/profiles" class="feature__item">
      <div class="feature__card p-6 shadow rounded-lg hover:shadow-lg transition">
        <div class="feature__content flex flex-col items-center">
          <img
              src="@/assets/images/profile-logo.png"
              alt="profile-icon"
              class="feature__icon h-16 w-16 mb-4"
          />
          <span class="text-lg font-medium">{{ $t("home.profile") }}</span>
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
