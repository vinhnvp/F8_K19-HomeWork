export interface ProductI {
    getId(): string
    getName(): string
    getPrice(): number
    getStock(): number

    setName(name: string): void
    setPrice(price: number): void
    setStock(stock: number): void

    increaseStock(quantity: number):void
    decreaseStock(quantity: number):void
    toString():void
}