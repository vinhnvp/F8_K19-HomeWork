import {Customer} from "./Models/Customer"
import {CustomerI} from "./Models/Customer/type"
import {ProductI} from "./Models/Product/type";
import {Product} from "./Models/Product";

const Customer1: CustomerI = new Customer("Vinh", "0973464865", "Binh Tan, HCM")
const Customer2: CustomerI = new Customer("Diep", "0961528941", "Tan Phu, HCM")

const Product1: ProductI = new Product("Iphone 11", 12000000, 20)
const Product2: ProductI = new Product("Iphone 15", 19500000, 65)

