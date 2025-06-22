export default [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/features/home/presentation/views/HomeView.vue'),
        meta: {guest: true}
    },
]