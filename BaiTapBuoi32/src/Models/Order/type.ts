export interface OrderItemI {
    getProduct(): Product
    getQuantity(): number
    getPrice(): number
    getTotal(): number
}

export enum OrderStatus {
    NEW = "NEW",
    PAID = "PAID",
    CANCELED = "CANCELED"
}

export interface OrderI {
    getId(): string
    getCustomer(): string
    getItems(): OrderItem[]
    getCreatedAt(): Date
    getStatus(): OrderStatus

    setStatus(status: OrderStatus): void
    addItem(item: OrderItem): void
    removeItem(productId: string): void
    calculateTotal(): number
    printInvoice(): string
}