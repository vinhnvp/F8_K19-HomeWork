export interface CustomerI {
    getId(): string
    getName(): string
    getPhone(): string
    getAddress(): string

    updatePhone(phone: string): void
    updateAddress(address: string): void
}