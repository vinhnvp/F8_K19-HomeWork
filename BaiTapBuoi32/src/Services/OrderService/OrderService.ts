import {Customer} from "../../Models/Customer"
import {Order} from "../../Models/Order/order"
import {OrderStatus} from "../../Models/Order/type"
import {OrderServiceI} from "./type"
import {ProductService} from "../ProductService/ProductService"
import {CustomerService} from "../CustomerService/CustomerService"
import {OrderItem} from "../../Models/Order/order_item";

export class OrderService implements OrderServiceI {
    private orders : Order[] = []
    private productService: ProductService

    constructor(productService: ProductService) {
        this.productService = productService
    }

    findOrder(orderId: string): Order | undefined {
        return this.orders.find(order => order.getId() === orderId)
    }

    getOrders(): Order[] {
        return this.orders
    }

    createOrder(customer: Customer): Order {
        const newOrder = new Order(customer)
        this.orders.push(newOrder)
        return newOrder
    }

    addProduct(orderId: string, productId: string, quantity: number): void {
        const order = this.findOrder(orderId)
        const product = this.productService.findById(productId)

        if (!order) {
            console.log("Order not found")
            return
        }

        if (!product) {
            console.log("Product not found")
            return
        }

        if (order.getStatus() !== OrderStatus.NEW) {
            console.log(`Order status: ${order.getStatus()}, can't add product`)
            return
        }

        if (product.getStock() < quantity) {
            console.log(`Not enough product in stock (Stock: ${product.getStock()})`)
            return
        }

        const orderItem = new OrderItem(product, quantity)
        order.addItem(orderItem)
    }

    removeProduct(orderId: string, productId: string): void {
        const order = this.findOrder(orderId)
        if (order && order.getStatus() === OrderStatus.NEW) {
            order.removeItem(productId)
        }
    }

    checkout(orderId: string): void {
        const order = this.findOrder(orderId)
        if (!order) {
            console.log("Order not found")
            return
        }
        if (order.getStatus() !== OrderStatus.NEW) {
            console.log(`Order status ${order.getStatus()}`)
            return
        }

        order.getItems().forEach(item => {
            item.getProduct().decreaseStock(item.getQuantity())
        })
        order.setStatus(OrderStatus.PAID)
        console.log(`Paid - Order: ${order.getId()} `)
    }

    cancelOrder(orderId: string): void {
        const order = this.findOrder(orderId)
        if (order && order.getStatus() === OrderStatus.NEW) {
            order.setStatus(OrderStatus.CANCELLED)
        } else {
            console.log("Can't cancel this order")
        }
    }

    printOrders(): string {
        const rowsHtml = this.orders.map(o => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${o.getId()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${o.getCustomer().getName()}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">${o.calculateTotal().toLocaleString()}đ</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">
                    <span style="color: ${o.getStatus() === OrderStatus.PAID ? 'green' : (o.getStatus() === OrderStatus.CANCELLED ? 'red' : 'orange')}; font-weight: bold;">
                        ${o.getStatus()}
                    </span>
                </td>
            </tr>
        `).join("");

        return `
            <div style="font-family: Arial, sans-serif; margin-bottom: 30px;">
                <h3 style="color: #e67e22;">🧾 DANH SÁCH ĐƠN HÀNG TỔNG QUÁT</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f4f4f4;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Mã Đơn</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Khách Hàng</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Tổng Tiền</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: center;">Trạng Thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="4" style="text-align:center; padding: 8px;">Chưa có đơn hàng nào.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }
}