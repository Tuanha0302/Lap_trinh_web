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
