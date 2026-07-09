import {OrderStatus, OrderI} from "./type"
import {Customer} from "../Customer"
import {OrderItem} from "./order_item"
// @ts-ignore
import {v7} from "uuid"

export class Order implements OrderI {
    private id: string
    private customer: Customer
    private items: OrderItem[]
    private createdAt: Date
    private status: OrderStatus

    constructor(customer: Customer) {
        this.id = v7().toString()
        this.customer = customer
        this.items = []
        this.createdAt = new Date()
        this.status = OrderStatus.NEW
    }

    getId(): string {return this.id}
    getCustomer(): Customer {return this.customer}
    getCreatedAt(): Date {return this.createdAt}
    getItems(): OrderItem[] {return this.items}
    getStatus(): OrderStatus {return this.status}

    addItem(item: OrderItem): void {
        this.items.push(item)
    }

    setStatus(status: OrderStatus): void {
        this.status = status
    }

    calculateTotal(): number {
        return this.items.reduce((total, item) => total + item.getTotal(), 0)
    }

    removeItem(productId: string): void {
        this.items = this.items.filter(item => item.getProduct().getId() !== productId)
    }

    printInvoice(): string {
        const itemsHtml = this.items.map(item => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${item.getProduct().getName()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.getQuantity()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.getPrice().toLocaleString()}đ</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${item.getTotal().toLocaleString()}đ</td>
            </tr>
        `).join("");

        const invoiceHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ccc; padding: 20px; border-radius: 8px;">
                <h2 style="text-align: center; color: #333;">HÓA ĐƠN ĐẶT HÀNG</h2>
                <div style="margin-bottom: 20px;">
                    <p style="margin: 5px 0;"><strong>Mã đơn hàng:</strong> ${this.id}</p>
                    <p style="margin: 5px 0;"><strong>Khách hàng:</strong> ${this.customer.getName()}</p>
                    <p style="margin: 5px 0;"><strong>Điện thoại:</strong> ${this.customer.getPhone()}</p>
                    <p style="margin: 5px 0;"><strong>Ngày đặt:</strong> ${this.createdAt.toLocaleString()}</p>
                    <p style="margin: 5px 0;"><strong>Trạng thái:</strong> <span style="color: ${this.status === OrderStatus.PAID ? 'green' : 'red'};">${this.status}</span></p>
                </div>
                
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                    <thead>
                        <tr style="background-color: #f9f9f9;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Sản phẩm</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Số lượng</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Đơn giá</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsHtml}
                    </tbody>
                </table>
                
                <h3 style="text-align: right; color: #d9534f; margin: 0;">TỔNG TIỀN: ${this.calculateTotal().toLocaleString()}đ</h3>
            </div>
        `;

        return invoiceHtml;
    }
}