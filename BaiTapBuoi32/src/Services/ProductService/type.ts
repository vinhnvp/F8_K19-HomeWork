import {Product} from "../../Models/Product";

export interface ProductServiceI {
    addProduct(product: Product): void
    updateProduct(id: number, data: {}): void
    deleteProduct(id: string): void
    findById(id: string): void
    findByName(keyword: string): void
    getAllProducts(): Product[]
    printProducts(): void
}