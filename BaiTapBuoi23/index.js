const meta = {
    invoiceNo: "WM-20260521-0001",
    saleDate: "2026/05/21",
    currency: "VND",
    paymentMethod: "Cash"
  }

const seller = {
    name: "WinMark 2 Hai Bà Trưng",
    address: "2 Bà Trưng - Hoàn Kiếm - HN",
    phone: "012345678",
    representative: "Đại diện WinMark"
  }

const customer = {
    name: "Nguyễn Văn A",
    age: 20,
    address: "Hà Đông, Hà Nội"
  }

const items = [
    {
      no: 1,
      name: "Áo thun",
      size: "XL",
      quantity: 1,
      price: 200000
    },
    {
      no: 2,
      name: "Áo khoác",
      size: "XL",
      quantity: 2,
      price: 200000
    }
  ]

const promotion = {
    description: "Khuyến mãi 50% cho khách hàng thân thiết",
    discountPercent: 50
  }


const formatMoney = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: meta.currency}).format(amount);
};

const fillReceiptDetails = (receipt) => {
    const receiptId = document.querySelector("#receipt-id");
    const receiptDate = document.querySelector("#receipt-date");

    if (receipt) {
        receiptId.innerText = receipt.invoiceNo
        receiptDate.innerText = receipt.saleDate
    } else {
        receiptId.innerText = ""
        receiptDate.innerText = ""
    }
}

const fillSellerDetails = (sellerInfo) => {
    const storeNames = document.getElementsByClassName("store-name")
    const storeAddress = document.querySelector(".receipt-seller-details_address-text")
    const storePhone = document.querySelector(".receipt-seller-details_phone-nums")

    if (sellerInfo.name) {
        for (const storeName of storeNames) { storeName.innerText = sellerInfo.name }
    } else {
        for (const storeName of storeNames) { storeName.innerText = "Chưa cập nhật tên cửa hàng" }
    }
    sellerInfo.address ? storeAddress.innerText = sellerInfo.address : storeAddress.innerText = "Chưa cập nhật địa chỉ"
    sellerInfo.phone ? storePhone.innerText = sellerInfo.phone : storeAddress.innerText = "Chưa cập nhật SĐT"
}

const fillCustomerDetails = (customerInfo) => {
    const customerName = document.querySelector(".receipt-buyer-details_name")
    const customerAge = document.querySelector(".receipt-buyer-details_age")
    const customerAddress = document.querySelector(".receipt-buyer-details_address-text")

    customerInfo.name ? customerName.innerText = customerInfo.name : customerName.innerText = "Chưa cập nhật"
    customerInfo.age ? customerAge.innerText  += " " + customerInfo.age : customerAge.innerText = "Chưa cập nhật"
    customerInfo.address ? customerAddress.innerText = customerInfo.address : customerAddress.innerText = "Chưa cập nhật"

}

const fillProductDetails = (products,promotions) => {
    const productDetails = document.querySelector(".products-details_items")
    const promotionTag = document.querySelector(".products-sum_promo")
    const promotionDesc = document.querySelector(".products-sum_promo-program")
    const promotionValue = document.querySelector(".products-sum_details-promo-value")
    const totalValue = document.querySelector(".products-sum_details-total-value")
    const totalPayable = document.querySelector(".products-sum_total-value")
    let accumulate = 0

    if (products.length > 0) {
        const rowsHTML = products.map(product => {
            const totalPrice = product.price * product.quantity
            accumulate += totalPrice
            return `<tr>
                        <td>${product.no}</td>
                        <td>${product.name}</td>
                        <td>${product.size}</td>
                        <td>${product.quantity}</td>
                        <td>${formatMoney(product.price)}</td>
                        <td>${formatMoney(totalPrice)}</td>
                    </tr>`
            }).join('')
        productDetails.innerHTML = rowsHTML
        totalValue.innerText = formatMoney(accumulate)
    }

    if (promotions) {
        const discountValue = promotions.discountPercent / 100 * accumulate
        promotionTag.style.display = "flex"
        promotionDesc.innerText = promotions.description
        promotionValue.innerText = formatMoney(discountValue)
        totalPayable.innerText = formatMoney(accumulate - discountValue)
    } else {
        promotionTag.style.display = "none"
        promotionValue.innerText = "0đ"
        totalPayable.innerText = formatMoney(accumulate)
    }
}

fillReceiptDetails(meta)
fillSellerDetails(seller)
fillCustomerDetails(customer)
fillProductDetails(items, promotion)


