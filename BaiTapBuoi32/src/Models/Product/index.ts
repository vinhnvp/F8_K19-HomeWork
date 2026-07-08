import type {ProductI} from "./type"
// @ts-ignore
import {v7} from "uuid"

export class Product implements ProductI {
    private id: string
    private name: string
    private price: number
    private stock: number

    constructor(name: string, price: number, stock: number) {
        this.id = v7().toString()
        this.name = name
        this.price = price
        this.stock = stock
    }

    increaseStock(quantity: number): void {
        this.stock += quantity
    }
    decreaseStock(quantity: number): void {
        this.stock -= quantity
    }
    toString() {
        return `id: ${this.id}, name: ${this.name}, price: ${this.price}, stock: ${this.stock}`
    }
}