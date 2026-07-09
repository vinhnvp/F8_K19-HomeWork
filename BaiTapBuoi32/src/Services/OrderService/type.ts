import {Customer} from "../../Models/Customer";
import {Order} from  "../../Models/Order/order"

export interface OrderServiceI {
    createOrder(customer: Customer): Order
    addProduct(orderId: string, productId: string, quantity: number): void
    removeProduct(orderId: string, productId: string): void
    checkout(orderId:string): void
    cancelOrder(orderId: string): void
    findOrder(orderId: string): Order | undefined
    getOrders(): Order[]
    printOrders(): string
}