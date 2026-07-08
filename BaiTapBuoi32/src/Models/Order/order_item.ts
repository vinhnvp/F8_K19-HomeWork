import {OrderItemI} from "./order_item"
import {Product} from "../Product"
// @ts-ignore
import {v7} from "uuid"

export class OrderItem implements OrderItemI {
    private product: Product
    private quantity: number
    private price: number

    constructor(product: Product, quantity: number) {
        this.product = product
        this.quantity = quantity
        this.price = product.getPrice()
    }

    getProduct(): Product {return this.product}
    getQuantity(): number {return this.quantity}
    getPrice(): number {return this.price}

    getTotal(): number {
        return this.quantity * this.price
    }
}