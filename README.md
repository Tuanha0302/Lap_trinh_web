## Cài đặt Apache Web server
### Bước 1: Tắt IIS (Nếu đang chạy)
1. Mở CMD với quyền Administrator
2. Gõ lệnh: iisreset/stop
<img width="1115" height="643" alt="Ảnh chụp màn hình 2025-10-25 104722" src="https://github.com/user-attachments/assets/ca66ed5b-f274-4762-aa64-287f6a138c31" />

-> Mục đích: tắt Internet Information Services (IIS) để tránh chiếm port 80 của Apache
### Bước 2: Cài đặt Apache 
1. Tải Apache tại trang: https://www.apachelounge.com/download/ (chọn bản Windows 64-bit, ví dụ: httpd-2.4.58-win64-VS17.zip)
2. Giải nén file ZIP ra thư mục: E:\Apache24
<img width="707" height="587" alt="Ảnh chụp màn hình 2025-10-25 105013" src="https://github.com/user-attachments/assets/89eb1c55-5a7b-4fd1-8ca9-fb7ae6c3ad27" />

### Bước 3: Cấu hình Apache
1. Mở file E:\Apache24\conf\httpd.conf này bằng Notepad.
<img width="1919" height="1020" alt="Ảnh chụp màn hình 2025-10-25 105112" src="https://github.com/user-attachments/assets/9e860dc9-59c0-48f1-8eaf-ca8df0385b63" />

-> Tìm dòng #Include conf/extra/httpd-vhosts.conf bỏ dấu # đi để bật VirtualHost
<img width="1432" height="708" alt="image" src="https://github.com/user-attachments/assets/91c649f2-ce82-4b6c-ac54-7a81e0bfa906" />

2. Mở file E:\Apache24\conf\extra\httpd-vhosts.conf này bằng Notepad, thêm đoạn sau vào cuối file (giả sử tên bạn là Ngụy Đình Tuấn Hà → nguydinhtuanha.com):
<img width="1678" height="714" alt="image" src="https://github.com/user-attachments/assets/68024b82-476e-48a3-a46f-42abb4b9dae1" />

<img width="1141" height="544" alt="image" src="https://github.com/user-attachments/assets/3a45ad32-6be5-4ad3-8558-bbda3746f221" />

### Bước 4: Tạo thư mục code web
- Tạo thư mục: E:\Apache\Apache24\nguydinhtuanha
<img width="1114" height="584" alt="image" src="https://github.com/user-attachments/assets/b4333bd3-b5f7-4a65-b05d-ea9599caf15c" />

### Bước 5: Fake domain trong file hosts
1. Mở file: C:\Windows\System32\drivers\etc\hosts
2. Thêm dòng: 127.0.0.1 nguydinhtuanha.com
<img width="1138" height="535" alt="image" src="https://github.com/user-attachments/assets/0a0af35b-d06b-4b94-99cf-39ea76e1caef" />

### Bước 6: Cài đặt và khởi động Apache
1. Mở CMD (Admin) gõ:
- E:\Apache\Apache24\bin\httpd.exe -k install
- E:\Apache\Apache24\bin\httpd.exe -k start
2. Truy cập: http://nguydinhtuanha.com
- Nếu thấy hiện dòng như này là thành công.
<img width="1910" height="967" alt="image" src="https://github.com/user-attachments/assets/1f2b8b76-d355-4efc-b67b-81db5cb86b54" />

## Cài đặt Node.js và Node-RED
### Bước 1: Cài Node.js 
1. Tải file: https://nodejs.org/dist/v20.19.5/node-v20.19.5-x64.msi
2. Khi cài, chọn đường dẫn: E:\nodejs
<img width="620" height="476" alt="Ảnh chụp màn hình 2025-10-25 122845" src="https://github.com/user-attachments/assets/8f5d2911-178c-443c-99c0-310a9e753dab" />

### Bước 2: Cài Node-RED  
1. Mở CMD chạy lệnh 'npm install -g --unsafe-perm node-red --prefix "D:\nodejs\nodered"'
<img width="897" height="209" alt="image" src="https://github.com/user-attachments/assets/8264e263-6b6c-421c-950d-a1c65496d42c" />

### Bước 3: Cài NSSM (Để chạy Node-RED như service)
1. Tải file: https://nssm.cc/release/nssm-2.24.zip
2. Giải nén được file nssm.exe copy file đó vào thư mục `E:\nodejs\nodered\`

### Bước 4: Tạo file chạy Node-RED
1. Tạo file "E:\nodejs\nodered\run-nodered.cmd" với nội dung:
- @echo off
- REM fix path
- set PATH=E:\nodejs;%PATH%
- REM Run Node-RED
- node "E:\nodejs\nodered\node_modules\node-red\red.js" -u "E:\nodejs\nodered\work" %*
<img width="1433" height="756" alt="image" src="https://github.com/user-attachments/assets/1340c607-9dd5-4ea5-8cb1-892be924be45" />

### Bước 5: Cài Node-RED làm service
1. Mở CMD, chuyển đến thư mục: `E:\nodejs\nodered`
2. cài đặt service `a1-nodered` bằng lệnh: nssm.exe install a1-nodered "E:\nodejs\nodered\run-nodered.cmd"
<img width="934" height="101" alt="image" src="https://github.com/user-attachments/assets/72bc40cc-3000-40b4-bc7a-8227e3fd976a" />

3. Chạy service `a1-nodered` bằng lệnh: `nssm start a1-nodered`
<img width="592" height="108" alt="image" src="https://github.com/user-attachments/assets/893b331b-6ed8-4ad0-8214-71dbedc47963" />

## Tạo cơ sở dữ liệu 
1. Tạo các bảng cơ bản: Sách, thể loại, khách hàng, hóa đơn, chi tiết hóa đơn
- Bảng sách
<img width="564" height="251" alt="image" src="https://github.com/user-attachments/assets/bd81d4df-b59e-4a25-86cf-33cf35c3fbe7" />

- Bảng thể loại
<img width="637" height="160" alt="image" src="https://github.com/user-attachments/assets/ba811a1d-7a7a-4599-988d-8f049485442d" />

- Bảng khách hàng
<img width="686" height="240" alt="image" src="https://github.com/user-attachments/assets/7a574cd1-ff29-4f13-b63a-50aa6e2c80e0" />

- Bảng hóa đơn
<img width="642" height="180" alt="image" src="https://github.com/user-attachments/assets/9236ec73-d447-44f7-8488-3ff81d09f052" />

- Bảng chi tiết hóa đơn
<img width="628" height="186" alt="image" src="https://github.com/user-attachments/assets/845550d1-da60-47c2-b96e-f362c770f3ce" />

## Cái đặt thư viện trên nodered:
1. Truy cập giao diện nodered bằng url: http://localhost:1880
2. Cài đặt các thư viện:
- node-red-contrib-mssql-plus
- node-red-node-mysql
- node-red-contrib-telegrambot
- node-red-contrib-moment
- node-red-contrib-influxdb
- node-red-contrib-duckdns
- node-red-contrib-cron-plus
3. Sửa file `E:\nodejs\nodered\work\settings.js`:
<img width="1009" height="290" alt="image" src="https://github.com/user-attachments/assets/0e6ca13a-59c8-4f46-b66c-25a16b285a30" />

- với mã hoá mật khẩu có thể thiết lập bằng tool: https://tms.tnut.edu.vn/pw.php

4. Chạy lại nodered bằng cách: mở cmd, vào thư mục `E:\nodejs\nodered` và chạy lệnh `nssm restart a1-nodered`
<img width="610" height="131" alt="image" src="https://github.com/user-attachments/assets/9cee5a18-fb9d-4094-b8eb-4c5ee8fce622" />

5. khi đó nodered sẽ yêu cầu nhập mật khẩu mới vào được giao diện cho admin tại: http://localhost:1880 
<img width="1865" height="876" alt="Ảnh chụp màn hình 2025-10-25 142740" src="https://github.com/user-attachments/assets/3ed19b23-d7d4-4d2d-8796-0ad5a8c2a71c" />

## Tạo api back-end bằng nodered
1. Tại flow1 trên nodered, sử dụng node `http in` và `http response` để tạo api
2. Thêm node `MSSQL` để truy vấn tới cơ sở dữ liệu
3. logic flow sẽ gồm 5 node theo thứ tự sau (thứ tự nối dây):
- http in  : dùng GET cho đơn giản, URL đặt tuỳ ý, ví dụ: /Sach
- function 1: nhận yêu cầu → đọc từ khóa → tạo câu SQL → gửi cho node cơ sở dữ liệu
- MSSQL: để truy vấn dữ liệu tới CSDL, nhận tham số từ node tiền xử lý
- function 2: nhận dữ liệu SQL → xử lý → trả JSON về cho web
- http response: để phản hồi dữ liệu về client: Status Code=200, Header add : Content-Type = application/json
-> có thể thêm node `debug` để quan sát giá trị trung gian
4. Test api thông qua trình duyệt, ví dụ: http://localhost:1880/Sach
<img width="1919" height="385" alt="image" src="https://github.com/user-attachments/assets/ad0c930c-9cd2-46a1-bd86-eb92a71f991a" />

## Tạo giao diện front-end
1. Html form gồm các file : index.html, nguydinhtuanha.js, nguydinhtuanha.css
2. Cả 3 file này đặt trong thư mục: `E:\Apache24\nguydinhtuanha
3. Fullname.js: lấy dữ liệu trên form, gửi đến api nodered đã làm ở bước tạo api back-end bằng nodered, nhận về json, dùng json trả về để tạo giao diện phù hợp với kết quả truy vấn
<img width="1919" height="1032" alt="image" src="https://github.com/user-attachments/assets/0ed33e27-4735-4c12-a11d-4ace77116238" />

<img width="1917" height="1031" alt="image" src="https://github.com/user-attachments/assets/fce82ea3-ba42-4e22-be9b-4408bd4c5155" />

<img width="1919" height="1029" alt="image" src="https://github.com/user-attachments/assets/4a4ba7d0-eb87-43c8-8a0a-c7077c364df0" />

<img width="1919" height="1035" alt="image" src="https://github.com/user-attachments/assets/9c7a3c4d-f427-43da-bebd-b5bb89d9e2a5" />

<img width="1917" height="1031" alt="image" src="https://github.com/user-attachments/assets/0741a212-46d6-4b9f-8ed9-f26c70bdae53" />

## Nhận xét bài làm
- Qua việc thực hiện làm bài về nhà em đã lắm được cách cài đặt Apache, cấu hình VirtualHost và sử dụng file hosts để tạo domain giả lập. Em cũng đã hiểu thêm về Node.js và Node-RED là công cụ xây dựng backend bằng mô hình kéo thả trực quan, nhanh chóng đồng thời biết cách tạo và quản lý service bằng nssm. Em đã thực hiện được việc kết nối Node-RED với cơ sở dữ liệu MSSQL để truy vấn dữ liệu, và hiểu cách xây dựng API phản hồi JSON cho front-end. Em cũng hiểu được cách front-end giao tiếp với back-end qua API và cách hiển thị kết quả truy vấn ra giao diện web.
