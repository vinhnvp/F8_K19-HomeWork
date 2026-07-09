import {Customer} from "./Models/Customer"
import {CustomerI} from "./Models/Customer/type"
import {ProductI} from "./Models/Product/type"
import {Product} from "./Models/Product"
import {ProductService} from "./Services/ProductService/ProductService";
import {CustomerService} from "./Services/CustomerService/CustomerService";
import {OrderService} from "./Services/OrderService/OrderService";

const productService = new ProductService()
const customerService = new CustomerService()
const orderService = new OrderService(productService)

// Customer test
const cus1 = new Customer("Nguyễn Văn A", "0901234567", "Hà Nội")
const cus2 = new Customer("Trần Thị B", "0987654321", "TP.HCM")

customerService.addCustomer(cus1)
customerService.addCustomer(cus2)

customerService.updateCustomer(cus1.getId(), { address: "Đà Nẵng" })

console.log(cus1)

// Product test
const p1 = new Product("Laptop Dell XPS", 30000000, 10)
const p2 = new Product("Chuột Logitech", 500000, 50)
const p3 = new Product("Bàn phím cơ", 1500000, 5)

productService.addProduct(p1)
productService.addProduct(p2)
productService.addProduct(p3)

productService.updateProduct(p2.getId(), { price: 450000 })

console.log(p2)

// Test success order
const order1 = orderService.createOrder(cus1);

orderService.addProduct(order1.getId(), p1.getId(), 1)
orderService.addProduct(order1.getId(), p2.getId(), 2)
orderService.addProduct(order1.getId(), p3.getId(), 1)
orderService.removeProduct(order1.getId(), p3.getId())
orderService.checkout(order1.getId());

console.log(order1)

// Test failed order
const order2 = orderService.createOrder(cus2)

orderService.addProduct(order2.getId(), p3.getId(), 10)
orderService.addProduct(order2.getId(), p3.getId(), 2)
orderService.cancelOrder(order2.getId())
orderService.addProduct(order2.getId(), p1.getId(), 1)