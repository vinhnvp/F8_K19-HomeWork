# Bài tập Javascript - Buổi 18

## Bài 1: Shallow Copy với Spread Operator
### Câu 1: 
* `student.name`: **Không** bị thay đổi.
### Câu 2:
* `student.parent.name`: **Có** bị thay đổi.

### 2. Giải thích
* Khi dùng **spread operator** là `mentor = {...student}` thì chỉ có các key:value ở lớp ngoài cùng
    được sao chép ra một vùng nhớ mới và lưu địa chỉ mới vào mentor (tức `mentor.name` sẽ tham chiếu tới
    địa chỉ mới, không trùng với địa chỉ của `student.name`. Do đó khi thay đổi value của `mentor.name`
    không ảnh hưởng đến value của `student.name`
* Việc dùng `mentor = {...student}` chỉ sao chép nông lớp key:value ngoài cùng (tức value kiểu nguyên thủy và địa chỉ tham chiếu object con)
  Vì thế, object `parent` không được tạo vùng nhớ trong `mentor` mới mà chỉ trỏ tới chung địa object `parent` gốc trong `student`. Việc sửa
  vùng nhớ `mentor.parent.name` ảnh hưởng đến cả `student.parent.name` 
* **Ví dụ trực quan**: việc sao chép shallow đang tạo 2 con đường dẫn đến 1 ngôi nhà là "parent" chứ không phải 2 ngôi nhà "parent" riêng,
  vì thế việc sửa ngôi nhà thì nếu đi đường nào đến (`student.parent.name` hay `mentor.parent.name`) đều thấy ngôi nhà đó đã bị sửa.

---

## Bài 2: Deep Copy với JSON.stringify & JSON.parse
### Câu 1:
* `student.parent.name`: **Không** bị ảnh hưởng.

### Câu 2:
* Cách này khác với **spread operator** vì: khi ta biến object `student` thành chuỗi thì đã cắt đứt tất cả
  liên hệ với object gốc `student`. Sau đó mới dùng `JSON.parse` để biến chuỗi độc lập này thành một object
  thì object này được lưu ra vùng nhớ hoàn toàn mới (từ gốc đến ngọn, từ key:value thông thường đến các
  object con nằm trong nó). Vì không còn liên hệ với nhau nên sửa `mentor.parent.name` không ảnh hưởng
  đến value của `student.parent.name`
* Khác ví dụ trước, deep copy bằng cách chuỗi hóa object gốc và biến đổi chuỗi thành object thì tạo ra
  2 con đường dẫn đến 2 ngôi nhà hoàn toàn riêng biệt, chỉ là đặc điểm của 2 ngôi nhà giống nhau
  hoàn toàn, việc sửa ngôi nhà này không làm thay đổi ngôi nhà còn lại)

---

## Bài 3: Shallow Copy trên Mảng (Array)
### Câu 1:
Mảng gốc không bị thay đổi, việc dùng spread `newStudents = [...students]` sẽ tạo một vùng nhớ 
mới cho mảng newStudents và việc thêm bớt phần tử newStudents không ảnh hưởng đến mảng students.

### Câu 2:
* Khi sao chép nông một mảng chứa object, chỉ có các địa chỉ tham chiếu của object con được sao chép vào mảng mới.
* Các phần tử (ví dụ: `index 0, 1`) của cả 2 mảng vẫn đang trỏ chung vào cùng một vùng nhớ dữ liệu của object con. Vì vậy, khi sửa giá trị bên trong object con, sự thay đổi sẽ xuất hiện ở cả 2 mảng.

---

## Bài 4: Truy cập qua Object lồng nhau
### Câu 1: 
Kết quả: `999`

### Câu 2:
* Tương tự bài 1, khi thực hiện shallow copy, chỉ có lớp thuộc tính ngoài cùng (ví dụ: `name: "hoang"`) được cấp địa chỉ mới.
* Các object con (từ `address` trở đi) chỉ được sao chép lại địa chỉ tham chiếu sang `newUser`. Cả `user` và `newUser` dùng chung các object con này chứ không tạo vùng nhớ riêng.
* Do đó, việc thay đổi giá trị tại `location` (từ `123` thành `999`) thông qua bất kỳ biến nào cũng sẽ cập nhật vào vùng nhớ dùng chung duy nhất đó.