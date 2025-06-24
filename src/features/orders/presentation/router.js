export default [
    {
        path: '/orders',
        name: 'OrderList',
        component: () => import('@orders/presentation/views/OrderListView.vue'),
        meta: {
            requiresAuth: true,
            role: 'ROLE_FISHING_COMPANY'
        }
    },
    {
        path: '/orders/:id',
        name: 'OrderDetail',
        component: () => import('@orders/presentation/views/OrderDetailView.vue'),
        meta: {
            requiresAuth: true,
            role: 'ROLE_FISHING_COMPANY'
        }
    }
];