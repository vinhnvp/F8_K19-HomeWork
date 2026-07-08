import {ProductServiceI} from "./type";
import {Product} from "../../Models/Product";

export class ProductService implements ProductServiceI {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product)
    }
    updateProduct(id: number, data: {}): void {
        const shouldUpdate = this.products.find(product => product.toString().includes(id))
        if (data.name) {
            shouldUpdate.name = data.name
        } else {

        }
    }
    deleteProduct(id: string): void {
        throw new Error("Method not implemented.");
    }
    findById(id: string): void {
        this.products.find(product => product.toString().includes(id))
    }
    findByName(keyword: string): void {
        this.products.find(product => product.toString().includes(keyword))
    }
    getAllProducts(): Product[] {
        return this.products
    }
    printProducts(): void {
        console.log(this.products)
    }

}