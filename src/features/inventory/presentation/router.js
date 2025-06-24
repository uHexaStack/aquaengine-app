export default [
    {
        path: "/inventory",
        name: "Inventory",
        component: () => import("./views/InventoryListView.vue"),
        meta: {
            requiresAuth: true,
            role: "ROLE_MACHINERY_PROVIDER"
        }
    }
];