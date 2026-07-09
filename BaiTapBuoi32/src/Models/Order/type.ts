import {Customer} from "../Customer"
import {OrderItem} from "./order_item"
import {Product} from "../Product"

export interface OrderItemI {
    getProduct(): Product
    getQuantity(): number
    getPrice(): number
    getTotal(): number
}

export enum OrderStatus {
    NEW = "NEW",
    PAID = "PAID",
    CANCELLED = "CANCELLED"
}

export interface OrderI {
    getId(): string
    getCustomer(): Customer
    getItems(): OrderItem[]
    getCreatedAt(): Date
    getStatus(): OrderStatus

    setStatus(status: OrderStatus): void
    addItem(item: OrderItem): void
    removeItem(productId: string): void
    calculateTotal(): number
    printInvoice(): string
}