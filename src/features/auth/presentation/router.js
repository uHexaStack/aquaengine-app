export default [
    {
        path: '/auth/sign-in',
        name: 'SignIn',
        component: () => import('@/features/auth/presentation/views/SignInView.vue'),
        meta: {guest: true}
    },
    {
        path: '/auth/sign-up',
        name: 'SignUp',
        component: () => import('@/features/auth/presentation/views/SignUpView.vue'),
        meta: {guest: true}
    }
]