import { Customer } from "../../Models/Customer";
import {CustomerServiceI} from "./type";

export class CustomerService implements CustomerServiceI {
    private customers: Customer[] = []

    addCustomer(customer: Customer): void {
        this.customers.push(customer)
    }

    findById(id: string): Customer | undefined {
        return this.customers.find(customer => customer.getId() === id)
    }

    findByPhone(phone: string): Customer | undefined {
        return this.customers.find(customer => customer.getPhone() === phone)
    }

    updateCustomer(id: string, data: {name?: string; phone?: string; address?: string }): void {
        const customer = this.findById(id)
        if (customer) {
            if (data.name !== undefined) customer.updateName(data.name)
            if (data.phone !== undefined) customer.updatePhone(data.phone)
            if (data.address !== undefined) customer.updateAddress(data.address)
        }
    }

    deleteCustomer(id: string): void {
        this.customers = this.customers.filter(customer => customer.getId() === id)
    }

    getAllCustomers(): Customer[] {
        return this.customers
    }

    printCustomers(): string {
        const rowsHtml = this.customers.map(c => `
            <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${c.getId()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${c.getName()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${c.getPhone()}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${c.getAddress()}</td>
            </tr>
        `).join("");

        return `
            <div style="font-family: Arial, sans-serif; margin-bottom: 30px;">
                <h3 style="color: #2980b9;">👥 DANH SÁCH KHÁCH HÀNG</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background-color: #f4f4f4;">
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Mã KH</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Họ Tên</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Số Điện Thoại</th>
                            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Địa Chỉ</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowsHtml || '<tr><td colspan="4" style="text-align:center; padding: 8px;">Chưa có khách hàng nào.</td></tr>'}
                    </tbody>
                </table>
            </div>
        `;
    }
}

