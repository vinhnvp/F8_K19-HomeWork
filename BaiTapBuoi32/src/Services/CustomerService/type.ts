import {Customer} from "../../Models/Customer";


export interface CustomerServiceI {
    addCustomer(customer: Customer): void
    updateCustomer(id: string, data: {name?:string; phone?:string; address?: string}): void
    deleteCustomer(id: string): void
    findById(id: string): Customer | undefined
    findByPhone(phone: string): Customer | undefined
    getAllCustomers(): Customer[]
    printCustomers(): string
}