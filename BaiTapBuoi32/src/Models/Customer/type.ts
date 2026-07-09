export interface CustomerI {
    getId(): string
    getName(): string
    getPhone(): string
    getAddress(): string

    updateName(name: string): void
    updatePhone(phone: string): void
    updateAddress(address: string): void
}