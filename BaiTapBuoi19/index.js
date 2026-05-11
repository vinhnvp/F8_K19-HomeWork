const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
]
const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
]


const findTopRevenue = (productsArr, ordersArr) => {

    // Hashmap total quantity with id
    const quantityMapper = {}
    for (let ordIdx = 0; ordIdx < ordersArr.length; ordIdx++) {
        const items = ordersArr[ordIdx].items
        for (let soldIdx = 0; soldIdx < items.length; soldIdx++) {
            const item = items[soldIdx]
            // If productId hasn't existed in quantityMapper --> Add new key + quantity
            // If productId has existed in quantityMapper --> Add quantity
            if (!quantityMapper[item.productId]) {
                quantityMapper[item.productId] = item.quantity
            } else {
                quantityMapper[item.productId] = quantityMapper[item.productId] + item.quantity
            }
        }
    }

    let topRevenue = 0
    let topProductNames = []

    for (let productIdx = 0; productIdx < productsArr.length; productIdx++) {
        const product = productsArr[productIdx]

        // Get total sold quantity from quantityMapper
        // If an id exists in "products" but doesn't exit in "quantityMapper" --> totalSold = 0
        const totalSold = quantityMapper[product.id] || 0
        const revenue = totalSold * product.price

        // Compare and assign higher one to "topRevenue" to find the highest
        if (revenue > topRevenue) {
            topRevenue = revenue
            topProductNames = [product.name]
            // In case of 2 or more products are at the same top revenue --> add product name to array
            // topRevenue > 0 --> Avoid adding name in case of there is no order in a particular duration
        } else if (revenue === topRevenue && topRevenue > 0) {
            topProductNames.push(product.name)
        }
    }
    return {
        topProducts: topProductNames,
        revenue: topRevenue
    }
}
const result = findTopRevenue(products,orders)
if (result.topProducts.length > 0) {
    console.log(`Sản phẩm top là ${result.topProducts.join(', ')} với doanh thu là: ${result.revenue}$`)
} else {
    console.log("Chưa bán được sản phẩm nào!")
}
