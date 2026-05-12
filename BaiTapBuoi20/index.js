/* Exercise 1: Find second value (under top value) */
const numbers = [9, 8, 3, 5, 6, 2, 7, 9];
const findSecondMax = (numbersArr) => {
    let secondValue = null,
        topValue = null
    if (numbersArr.length < 2) {
        return null
    }
    for (let i = 0; i < numbersArr.length; i++) {
        const current = numbersArr[i]
        if (topValue === null || current > topValue) {
            secondValue = topValue
            topValue = current
        } else if (current < topValue && (secondValue === null || current > secondValue)) {
            secondValue = current
        }
    }
    return secondValue
}
console.log(findSecondMax(numbers))
// Expected result: 8



/* Exercise 2: Merge 2 arrays - Quicksort */
const classA = [15, 2, 8, 10];
const classB = [8, 11, 2, 5, 9];

const mergeUniqueStudents = (class1, class2) => {
    const mergedClasses = [...class1, ...class2]
    const studentsMap = {}
    const uniqueStudent = []
    for (const student of mergedClasses) {
        if (!studentsMap[student]) {
            studentsMap[student] = true
            uniqueStudent.push(student)
        }
    }
    // Step 1 & 2: [15, 2, 8, 10, 11, 5, 9]

    const quickSortStudents = (arr) => {
        if (arr.length <= 1) { return arr }
        const mid = Math.floor(arr.length / 2),
            pivot = arr[mid],
            left = [],
            right = []

        for (let j = 0; j < arr.length; j++) {
            if (j === mid) { continue }
            if (arr[j] < pivot) { left.push(arr[j]) }
            else { right.push(arr[j]) }
        }
        return [...quickSortStudents(left), pivot, ...quickSortStudents(right)]
    }
    return quickSortStudents(uniqueStudent)
    // Step 3: Quick Sort -> [2, 5, 8, 9, 10, 11, 15]
}
console.log(mergeUniqueStudents(classA, classB))

