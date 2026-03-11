>Câu 1: Selector nào có độ ưu tiên cao nhất trong CSS? <br><br>
Trả lời: ID là selector có độ ưu tiên cao nhất.

>Câu 2: Nếu một phần tử HTML có cả h1, .title, và #main cùng set color — selector nào thắng? Tại sao? <br><br>
Trả lời: Color trong #main thắng vì seletor ID mạnh nhất trong các selector.

>Câu 3: Nếu bạn thêm style="color: pink" trực tiếp vào phần tử ở Câu 2, kết quả thay đổi như thế nào? <br><br>
Trả lời: Nếu thêm style="color: pink" vào phần tử câu 2 thì inline style thắng -> màu hiển thị: pink

>Câu 4: Tại sao theme.css có thể override style từ base.css? Điều kiện để override thành công là gì? <br><br>
Trả lời: theme.css có thể override base.css dựa vào thứ tự liên kết của 2 file (link theme.css sau link base.css).
Điều kiện để override thành công ngoài thứ tự link còn phụ thuộc vào độ ưu tiên của các selector, các selector phải có 
độ ưu tiên như nhau (giống tag, class, id,...).

>Câu 5: Trong project của bạn, có hai phần tử đều dùng class .title nhưng hiển thị màu khác nhau. Giải thích tại sao. <br><br>
Trả lời: nếu 2 phần tử cùng class (.title) nhưng màu khác nhau thì có thể xem xét các selector cụ thể thế nào (Ví dụ: color trong
"h1.title" sẽ mạnh và chi tiết hơn css phần tử class ".title").

>Câu 6: Phần tử nào trong project của bạn có CSS phức tạp nhất? Liệt kê các selector tác động lên nó và giải thích selector 
nào thắng cuối cùng. <br><br>
Trả lời: Thẻ h1 trong Dashboard là phần tử phức tạp nhất (đủ tag, class, id, inline style, internal css,
external css). Nếu xét selector thì ID mạnh nhất, nhưng thẻ này có inline style (inline là thuộc tính 
không được coi là selector) nó mạnh hơn các selector nên thắng. 