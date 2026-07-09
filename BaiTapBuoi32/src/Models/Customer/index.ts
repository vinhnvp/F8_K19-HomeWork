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

    getId(): string {return this.id}
    getName(): string {return this.name}
    getPhone(): string {return this.phone}
    getAddress(): string {return this.address}

    updateName(name: string): void {
        this.name = name
    }
    updatePhone(phone: string): void {
        this.phone = phone
    }
    updateAddress(address: string): void {
        this.address = address
    }
}