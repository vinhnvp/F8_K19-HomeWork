import {ProductServiceI} from "./type";
import {Product} from "../../Models/Product";

export class ProductService implements ProductServiceI {
    private products: Product[] = [];

    addProduct(product: Product): void {
        this.products.push(product)
    }
    deleteProduct(id: string): void {
        throw new Error("Method not implemented.");
    }
    updateProduct(id: string, data: {name?:string; price?:number; stock?:number}): void {
        const product = this.products.find(product => product.toString().includes(String(id)))
        if (product) {
            if (data.name !== undefined) product.setName(data.name)
            if (data.price !== undefined) product.setPrice(data.price)
            if (data.stock !== undefined) product.setStock(data.stock)
        }
    }
    findById(id: string): Product | undefined {
        return this.products.find(product => product.getId() === id)
    }
    findByName(keyword: string): Product | undefined {
        return this.products.find(product => product.getName().toLowerCase().includes(keyword.toLowerCase()))
    }
    getAllProducts(): Product[] {
        return this.products
    }
    printProducts(): string {
        const rowsHtml = this.products.map(p => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${p.getId()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${p.getName()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${p.getPrice().toLocaleString()}đ</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${p.getStock()}</td>
            </tr>
        `).join("");

        return `
            <div style="font-family: Arial, sans-serif; margin-bottom: 30px;">
                <h3 style="color: #2c3e50;">📦 DANH SÁCH SẢN PHẨM</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f4f4f4;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Mã SP</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Tên sản phẩm</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Giá bán</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Tồn kho</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="4" style="text-align:center; padding: 8px;">Chưa có sản phẩm nào.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }

}