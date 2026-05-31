const fetchProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products')
        const data = await response.json()
        return data
    }
    catch (error) {
        console.log('Failed while fetching products', error);
        return []
    }
}

let activeCategory = null
let allProducts = []
let cart = []

const init = async () => {
    allProducts = await fetchProducts()
    renderProductList(allProducts)
    renderCategories(allProducts)
    updateProductHeader('Tất cả sản phẩm', allProducts.length)
    activeCategory = document.querySelector('[data-category="all"]')
    onCategoryClick()
    addToCart()
}
init()

const renderProductCard = (product) => {
    return `
        <a href="#" class="w-[calc((100%-32px)/3)] flex flex-col justify-between h-auto bg-white p-4 shadow-soft rounded-2xl border border-accent hover:shadow-blue transition-shadow duration-200">
            <div>
                <div class="h-[300px] flex items-center justify-center mb-4">
                <img src="${product.image}" alt="${product.title}" class="max-w-full max-h-full object-contain">
                </div>
                <h3 class="font-semibold line-clamp-2" title="${product.title}">
                    ${product.title}
                </h3>
            </div>
            <div>
                <div class="py-2 border-b">
                    <span class="mdi mdi-star text-yellow-500 text-lg"></span>
                    <span class="font-semibold text-dark">${product.rating.rate}</span>
                    <span class="text-grey">(${product.rating.count})</span>
                </div>
                <div class="pt-4 flex items-center justify-between">
                    <span class="text-xl font-bold text-primary">$${product.price}</span>
                    <div class="add2cart-btn w-10 h-10 flex items-center justify-center bg-dark rounded-xl hover:bg-primary transition-bg duration-200" 
                         data-product-id="${product.id}">
                        <span class="mdi mdi-cart-outline text-white text-xl"></span>
                    </div>
                </div>
            </div>
        </a>
        `
}

const renderProductList = async (products) => {
    const productList = document.querySelector('.product-list')
    productList.innerHTML = products
        .map(product => renderProductCard(product))
        .join('')
}

const renderCategories = async (products) => {
    const categories = {}
    products.forEach(product => {
        const category = product.category
        if (categories[category]) {
            categories[category] ++
        } else {
            categories[category] = 1
        }
    })

    const productCategories =  document.querySelector('.product-categories')
    const allProductsTag = document.createElement('li')
    allProductsTag.classList.add('flex', 'justify-between', 'py-2',
        'px-4', 'rounded-xl', 'cursor-pointer', 'text-grey', 'capitalize',
        'hover:text-primary', 'transition-colors', 'duration-200')
    allProductsTag.dataset.category = 'all'
    allProductsTag.innerText = 'Tất cả sản phẩm'
    productCategories.append(allProductsTag)
    allProductsTag.classList.add(
        'text-primary',
        'bg-accent'
    )

    allProductsTag.classList.remove(
        'hover:text-primary',
        'transition-colors',
        'duration-200'
    )

    for (const category in categories) {
        const categoryTag = document.createElement('li')
        categoryTag.classList.add('flex', 'justify-between', 'py-2', 'px-4', 'rounded-xl', 'text-grey', 'capitalize',
            'hover:text-primary', 'transition-colors', 'duration-200', 'cursor-pointer')
        categoryTag.dataset.category = category
        categoryTag.innerHTML = category

        const categoryQuantity = document.createElement('span')
        categoryQuantity.classList.add('px-1.5', 'rounded-full', 'bg-primary-50')
        categoryQuantity.innerText = categories[category]

        categoryTag.append(categoryQuantity)
        productCategories.append(categoryTag)
    }
}

const updateProductHeader = (title, quantity) => {
    document.querySelector('.category-name').innerText = title
    document.querySelector('.category-quantity').innerText = `${quantity}`
}

const onCategoryClick = () => {
    const categoryList = document.querySelector('.product-categories')
    categoryList.addEventListener('click', (event) => {
        const categoryTag = event.target.closest('li')
        if (!categoryTag) return
        if (categoryTag === activeCategory) return
        activeCategory?.classList.remove('text-primary', 'bg-accent')
        activeCategory?.classList.add('hover:text-primary', 'transition-colors', 'duration-200')
        categoryTag.classList.add('text-primary', 'bg-accent')
        categoryTag.classList.remove('hover:text-primary', 'transition-colors', 'duration-200')
        activeCategory = categoryTag

        const selectedCategory = categoryTag.dataset.category
        if (selectedCategory === 'all') {
            renderProductList(allProducts)
            updateProductHeader('Tất cả sản phẩm', allProducts.length)
            return
        }

        const filteredProducts = allProducts.filter(product =>
            product.category === selectedCategory
        )

        renderProductList(filteredProducts)
        updateProductHeader(selectedCategory, filteredProducts.length)
    })
}

const addToCart = () => {
    const productList = document.querySelector('.product-list')
    productList.addEventListener('click', (event) => {
        const addToCartBtn = event.target.closest('.add2cart-btn')
        event.preventDefault()
        if (!addToCartBtn) return
        const productId = Number(addToCartBtn.dataset.productId)
        const product = allProducts.find(product => product.id === productId)
        if (!product) return
        cart.push(product)
        updateCartBadge()
        console.log(cart)
    })

    const updateCartBadge = () => {
        const badge = document.querySelector('.cart-badge')
        badge.innerText = cart.length
    }
}

