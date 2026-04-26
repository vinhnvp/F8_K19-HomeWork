// Bài 1: Viết một hàm isEvenNumber(number)
function isEvenNumber(number) {
    let remainder = number % 2
    return remainder === 0
}
console.log(isEvenNumber(10)); // Kết quả mong đợi: true
console.log(isEvenNumber(7));  // Kết quả mong đợi: false


// Bài 2: Tính tiền điện bậc thang
function getElectricityBill(kwh) {
    if (typeof kwh !== 'number' || kwh < 0) {
        return console.log('Vui lòng nhập số điện chính xác')
    }
    const electricLv1 = 1678,
          electricLv2 = 1734,
          electricLv3 = 2014,
          electricLv4 = 2536,
          electricLv5 = 2834,
          electricLv6 = 2927
    const totalLv1 = 50 * electricLv1
    const totalLv2 = 50 * electricLv2
    const totalLv3 = 100 * electricLv3
    const totalLv4 = 100 * electricLv4
    const totalLv5 = 100 * electricLv5

    let electricFee = 0
    if (kwh <= 50) {
        electricFee = kwh * electricLv1
    } else if (kwh <= 100) {
        electricFee = totalLv1 + (kwh-50) * electricLv2
    } else if (kwh <= 200) {
        electricFee = totalLv1 + totalLv2 + (kwh-100) * electricLv3
    } else if (kwh <= 300) {
        electricFee = totalLv1 + totalLv2 + totalLv3 + (kwh-200) * electricLv4
    } else if (kwh <= 400) {
        electricFee = totalLv1 + totalLv2 + totalLv3 + totalLv4 + (kwh-300) * electricLv5
    } else {
        electricFee = totalLv1 + totalLv2 + totalLv3 + totalLv4 + totalLv5 + (kwh-400) * electricLv6
    }
    return electricFee
}
console.log(getElectricityBill(70)); // Mong đợi: (50 * 1678) + (20 * 1734) = 118580
console.log(getElectricityBill(120)); // Mong đợi: (50 * 1678) + (50 * 1734) + (20 * 2014) = 210880


// Bài 3: Dọn dẹp dữ liệu tên người dùng (String)
function cleanName(name, keyword) {
    const cleanedName = name.trim().toLowerCase()
    const cleanedKeyword = keyword.toLowerCase()
    return cleanedName.includes(cleanedKeyword)
}
console.log(cleanName('   NGUYEN Van An   ', 'an')); // Mong đợi: true (vì 'nguyen van an' có chứa 'an')
console.log(cleanName('   Tran Thi B ', 'hoang')); // Mong đợi: false
