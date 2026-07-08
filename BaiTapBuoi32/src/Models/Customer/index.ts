import type {CustomerI} from "./type"
// @ts-ignore
import {v7} from "uuid"

export class Customer implements CustomerI {
    private id: string
    private name: string
    private phone: string
    private address: string

    constructor(name: string, phone: string, address: string) {
        this.id = v7().toString()
        this.name = name
        this.phone = phone
        this.address = address
    }

    updatePhone(phone: string): void {
        this.phone = phone
    }
    updateAddress(address: string): void {
        this.address = address
    }
}