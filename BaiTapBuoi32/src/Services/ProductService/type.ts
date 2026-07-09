import {Product} from "../../Models/Product";

export interface ProductServiceI {
    addProduct(product: Product): void
    updateProduct(id: number, data: {name?:string; price?:number; stock?:number}): void
    deleteProduct(id: string): void
    findById(id: string): Product | undefined
    findByName(keyword: string): Product | undefined
    getAllProducts(): Product[]
    printProducts(): string
}