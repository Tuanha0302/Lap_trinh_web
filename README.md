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

2. Mở file E:\Apache24\conf\extra\httpd-vhosts.conf này bằng Notepad, thêm đoạn sau vào cuối file (giả sử tên bạn là Tuấn Hà → tuanha.com):
<img width="1678" height="714" alt="image" src="https://github.com/user-attachments/assets/68024b82-476e-48a3-a46f-42abb4b9dae1" />

<img width="1426" height="701" alt="Ảnh chụp màn hình 2025-10-25 105630" src="https://github.com/user-attachments/assets/b6b6ae8e-d6b0-4dce-b4f6-4e548c804d9e" />

### Bước 4: Tạo thư mục code web
- Tạo thư mục: E:\Apache24\tuanha
<img width="1910" height="1011" alt="Ảnh chụp màn hình 2025-10-25 105738" src="https://github.com/user-attachments/assets/fc048a85-1849-4f3d-b931-56dbe3a8978f" />

### Bước 5: Fake domain trong file hosts
1. Mở file: C:\Windows\System32\drivers\etc\hosts
2. Thêm dòng: 127.0.0.1 tuanha.com
<img width="1258" height="625" alt="image" src="https://github.com/user-attachments/assets/3c9938d2-02e0-41c6-8e8f-ffacf48bf207" />

### Bước 6: Cài đặt và khởi động Apache
1. Mở CMD (Admin) gõ:
- E:\Apache\Apache24\bin\httpd.exe -k install
- E:\Apache\Apache24\bin\httpd.exe -k start
2. Truy cập: http://tuanha.com
- Nếu thấy hiện dòng "hello" là thành công.
<img width="1919" height="1024" alt="Ảnh chụp màn hình 2025-10-25 122231" src="https://github.com/user-attachments/assets/1d62314c-c0a7-44a3-9b58-fa7d512ca635" />

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











