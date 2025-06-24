import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: []
    }),
    getters: {
        totalAmount: (state) =>
            state.items.reduce((sum, i) => sum + i.price.amount * i.quantity, 0)
    },
    actions: {
        addItem(product) {
            const existing = this.items.find(i => i.id === product.id);
            if (existing) {
                existing.quantity++;
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
        },
        removeItem(productId) {
            this.items = this.items.filter(i => i.id !== productId);
        },
        clearCart() {
            this.items = [];
        }
    }
});
