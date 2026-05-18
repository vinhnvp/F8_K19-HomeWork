const employees = [
    { id: 1, name: "Alice", age: 23, status: 'working' },
    { id: 3, name: "Bob", age: 25, status: 'working' },
    { id: 6, name: "John", age: 27, status: 'working' },
    { id: 8, name: "David", age: 23, status: 'quit_job' },
    { id: 10, name: "Eve", age: 20, status: 'working' },
];


const products = [
    { id: 1, name: "Phone", price: 1200 },
    { id: 2, name: "Laptop", price: 3000  },
    { id: 3, name: "Tab", price: 2000  },
    { id: 4, name: "PC", price: 800  },
    { id: 5, name: "Monitor", price: 1500  },
]


const orders = [
    { id: 1, employeeId: 1, productId: 4, quantity: 1 },
    { id: 2, employeeId: 3, productId: 2, quantity: 4 },
    { id: 3, employeeId: 1, productId: 5, quantity: 3 },
    { id: 4, employeeId: 6, productId: 1, quantity: 2 },
    { id: 5, employeeId: 3, productId: 5, quantity: 3 },
    { id: 6, employeeId: 8, productId: 1, quantity: 1 },
    { id: 7, employeeId: 10, productId: 3, quantity: 2 },
];

// Global Maps
// Hashmap Product Info
const productsMap = {}
for (const product of products) {
    productsMap[product.id] = product
}
// Hashmap Employee Info
const employeesMap = {}
for (const employee of employees) {
    employeesMap[employee.id] = employee
}


// 1. Find working employees
const findWorkingEmployees = (employeesList) => employeesList.filter((employee) => employee.status === 'working')
console.log("1. Working employees: " , findWorkingEmployees(employees))
// Expectation: An array includes working employees objects


// 2. Find the oldest employee
const findOldestEmployees = (employeesList) => {
    if (employeesList.length < 1) return null
    let oldestEmployee = employeesList[0]
    for (const employee of employeesList) {
        if (employee.age > oldestEmployee.age) {
            oldestEmployee = employee
        }
    }
    return oldestEmployee
}
console.log("2. Oldest employee: " , findOldestEmployees(employees))
// Expectation: An object includes info of the oldest employee


// 3. Find the cheapest product
const findCheapestProduct = (productsList) => {
    if (productsList.length < 1) return null
    let cheapestProduct = productsList[0]
    for (const product of productsList) {
        if (product.price < cheapestProduct.price) {
            cheapestProduct = product
        }
    }
    return cheapestProduct
}
console.log("3. Cheapest product:", findCheapestProduct(products))


// 4. Find top product by quantity
const findTopProductByQuantity = (ordersList) => {
    const soldProductsMap = {}
    for (const order of ordersList) {
        if (!soldProductsMap[order.productId]) {
            soldProductsMap[order.productId] = order.quantity
        } else {
            soldProductsMap[order.productId] += order.quantity
        }
    }
    let topQuantity = 0
    let topId = null
    for (const productId in soldProductsMap) {
        if (soldProductsMap[productId] > topQuantity) {
            topQuantity = soldProductsMap[productId]
            topId = productId
        }
    }
    return {...productsMap[topId], topQuantity: topQuantity}
}
console.log("4. Top product by quantity:", findTopProductByQuantity(orders))


// 5. Find top product by revenue
const findTopRevenueProduct = (ordersList) => {
    const revenueMap = {}
    for (const order of ordersList) {
        const productRevenue = order.quantity * productsMap[order.productId].price
        if (!revenueMap[order.productId]) {
            revenueMap[order.productId] = productRevenue
        } else {
            revenueMap[order.productId] += productRevenue
        }
    }
    let topRevenue = 0
    let topId = null
    for (const productId in revenueMap) {
        if (revenueMap[productId] > topRevenue) {
            topRevenue = revenueMap[productId]
            topId = productId
        }
    }
    return {...productsMap[topId], totalRevenue: topRevenue}
}
console.log("5. Top product by revenue:", findTopRevenueProduct(orders))


// 6. Find top employee by sales quantity
const findTopEmployeeByQuantity = (ordersList) => {
    const empSalesMap = {}
    for (const order of ordersList) {
        if (!empSalesMap[order.employeeId]) {
            empSalesMap[order.employeeId] = order.quantity
        } else {
            empSalesMap[order.employeeId] += order.quantity
        }
    }
    let topEmpSaleQuantity = 0
    let topEmployeeId = null
    for (const employeeId in empSalesMap) {
        if (empSalesMap[employeeId] > topEmpSaleQuantity) {
            topEmpSaleQuantity = empSalesMap[employeeId]
            topEmployeeId = employeeId
        }
    }
    return {...employeesMap[topEmployeeId], topQuantity: topEmpSaleQuantity}
}
console.log("6. Top employee by sales quantity", findTopEmployeeByQuantity(orders))


// 7. Find top employee by revenue
const findTopEmployeeByRevenue = (ordersList) => {
    const empSalesMap = {}
    for (const order of ordersList) {
        const revenue = order.quantity * productsMap[order.productId].price
        if (!empSalesMap[order.employeeId]) {
            empSalesMap[order.employeeId] = revenue
        } else {
            empSalesMap[order.employeeId] += revenue
        }
    }
    let topRevenue = 0
    let topEmployeeId = null
    for (const employeeId in empSalesMap) {
        if (empSalesMap[employeeId] > topRevenue) {
            topRevenue = empSalesMap[employeeId]
            topEmployeeId = employeeId
        }
    }
    return {...employeesMap[topEmployeeId], topRevenue: topRevenue}
}
console.log("7. Top employee by sales revenue", findTopEmployeeByRevenue(orders))


// 8. Find top product by revenue of each employee
const findTopRevenueOfEach = (ordersList) => {
    const salesDetailMap = {}
    for (const order of ordersList) {
        const revenue = order.quantity * productsMap[order.productId].price
        if (!salesDetailMap[order.employeeId]) {
            salesDetailMap[order.employeeId] = {}
        }
        if (!salesDetailMap[order.employeeId][order.productId]) {
            salesDetailMap[order.employeeId][order.productId] = revenue
        } else {
            salesDetailMap[order.employeeId][order.productId] += revenue
        }
    }
    const results = []
    for (const employeeId in salesDetailMap) {
        const productsOfEach = salesDetailMap[employeeId]
        let maxRevenue = 0
        let topProductId = null
        for (const productId in productsOfEach) {
            if (productsOfEach[productId] > maxRevenue) {
                maxRevenue = productsOfEach[productId]
                topProductId = productId
            }
        }
        results.push({
            employee: employeesMap[employeeId].name,
            topProduct: productsMap[topProductId].name,
            revenue: maxRevenue
        })
    }
    return results
}
console.log("8. Top product by revenue of each employee:", findTopRevenueOfEach(orders))


// 9. Calculate commission
const calculateCommission = (ordersList) => {
    const empSalesMap = {}
    for (const order of ordersList) {
        const revenue = order.quantity * productsMap[order.productId].price
        if (!empSalesMap[order.employeeId]) {
            empSalesMap[order.employeeId] = revenue
        } else {
            empSalesMap[order.employeeId] += revenue
        }
    }
    const commissionList = []
    for (const empId in empSalesMap) {
         const commission = empSalesMap[empId] * 0.03
        commissionList.push({
            employeeName: employeesMap[empId].name,
            totalRevenue: empSalesMap[empId],
            commission
        })
    }
    return commissionList
}
console.log("9. Commision of each one:", calculateCommission(orders))


// 10. Sort employees by revenue
const sortEmployeesByRevenue = (ordersList) => {
    const empSalesMap = {}
    for (const order of ordersList) {
        const revenue = order.quantity * productsMap[order.productId].price
        if (!empSalesMap[order.employeeId]) {
            empSalesMap[order.employeeId] = revenue
        } else {
            empSalesMap[order.employeeId] += revenue
        }
    }
    const sortedList = []
    for (const empId in empSalesMap) {
        sortedList.push({
            employeeName: employeesMap[empId].name,
            totalRevenue: empSalesMap[empId]
        })
    }
    const quickSort = (arr) => {
        if (arr.length <= 1) {
            return arr
        }
        const mid = Math.floor(arr.length / 2)
        const pivot = arr[mid]
        const left = []
        const right = []

        for (let i = 0; i < arr.length - 1; i++) {
            if (i === mid) continue
            if (arr[i].totalRevenue > pivot.totalRevenue) {
                left.push(arr[i])
            } else {
                right.push(arr[i])
            }
        }
        return [...quickSort(left), pivot, ...quickSort(right)]
    }
    return quickSort(sortedList)
}

console.log("10. Sorted employees list by revenue:", sortEmployeesByRevenue(orders))