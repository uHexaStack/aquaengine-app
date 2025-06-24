export default [
    {
        path: '/catalog',
        name: 'Catalog',
        component: () => import('@/features/catalog/presentation/views/CatalogView.vue'),
        meta: {
            requiresAuth: true,
            role: 'ROLE_FISHING_COMPANY'
        }
    }
];