export default [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/features/home/presentation/views/HomeView.vue'),
        meta: {guest: true}
    },

    {
        path: "/inventory",
        name: "Inventory",
        component: () => import("@/features/inventory/presentation/views/InventoryListView.vue"),
        meta: { requiresAuth: true },
    },

   /*

    {
        path: "/orders",
        name: "Orders",
        component: () => import("@/features/order/presentation/views/OrderListView.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/payments",
        name: "Payments",
        component: () => import("@/features/payment/presentation/views/PaymentListView.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/notifications",
        name: "Notifications",
        component: () => import("@/features/notification/presentation/views/NotificationListView.vue"),
        meta: { requiresAuth: true },
    },

    {
        path: "/profiles",
        name: "Profiles",
        component: () => import("@/features/profiles/presentation/views/ProfileView.vue"),
        meta: { requiresAuth: true },
    },*/
]