export default [
    {
        path: '/cart',
        name: 'Cart',
        component: () => import('@/features/cart/presentation/views/CartView.vue'),
        meta: { requiresAuth: true, role: 'ROLE_FISHING_COMPANY' }
    }
];