const products = [
    { id: 1, name: 'MacBook Pro', price: 2000, category: 'Laptop' },
    { id: 2, name: 'iPhone 15', price: 1000, category: 'Phone' },
    { id: 3, name: 'Bàn phím cơ', price: 150, category: 'Accessories' },
    { id: 4, name: 'Màn hình Dell', price: 500, category: 'Monitor' }
];

const orders = [
    { orderId: 'ORD01', productId: 2, quantity: 2, status: 'completed' },
    { orderId: 'ORD02', productId: 1, quantity: 1, status: 'pending' },
    { orderId: 'ORD03', productId: 4, quantity: 3, status: 'completed' },
    { orderId: 'ORD04', productId: 3, quantity: 1, status: 'canceled' },
    { orderId: 'ORD05', productId: 2, quantity: 1, status: 'completed' }
];


const completedOrderDetails = orders
    .filter((order) => order.status === 'completed')
    .map((order) => {
        // Find product by productId of completed orders
        const product = products.find(product => product.id === order.productId)
        // If product can't be found, return null for that order
        if (!product) {
            return {
                orderId: order.orderId,
                productName: null,
                revenue: null
            }
        }
        // If product is found, map required key:value into array
        return {
            orderId: order.orderId,
            productName: product.name,
            revenue: product.price * order.quantity
        };
    })
console.log(completedOrderDetails)