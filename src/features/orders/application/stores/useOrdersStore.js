import {defineStore} from 'pinia'
import {OrderRepository} from '@/features/orders/infrastructure/repositories/OrderRepository.js'

import {CreateOrderUseCase} from '@orders/application/usecases/CreateOrderUseCase.js'
import {GetAllOrdersUseCase} from '@orders/application/usecases/GetAllOrdersUseCase.js'
import {GetOrderDetailsUseCase} from '@orders/application/usecases/GetOrderDetailsUseCase.js'
import {CancelOrderUseCase} from '@orders/application/usecases/CancelOrderUseCase.js'

const repo = new OrderRepository()
const createUC = new CreateOrderUseCase(repo)
const getAllUC = new GetAllOrdersUseCase(repo)
const getDetailsUC = new GetOrderDetailsUseCase(repo)
const cancelUC = new CancelOrderUseCase(repo)

export const useOrdersStore = defineStore('orders', {
    state: () => ({list: [], current: null, loading: false, error: null}),
    actions: {
        async fetchAll() {
            this.loading = true
            try {
                this.error = null;
                this.list = await getAllUC.execute()
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async fetchDetails(orderId) {
            this.loading = true
            try {
                this.error = null;
                this.current = await getDetailsUC.execute(orderId)
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },
        async create(orderData) {
            this.loading = true
            try {
                this.error = null
                const o = await createUC.execute(orderData)
                this.list.unshift(o)
                return o
            } catch (e) {
                this.error = e.message;
                throw e
            } finally {
                this.loading = false
            }
        },
        async cancel(orderId) {
            this.loading = true
            try {
                this.error = null;
                await cancelUC.execute(orderId)
            } catch (e) {
                this.error = e.message;
                throw e
            } finally {
                this.loading = false
            }
        }
    }
})