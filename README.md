# Bài thực hành số 2
## I. Thông tin cá nhân
**Họ và tên:** Võ Sỹ Ngọc

**MSSV:** 24120393

**Email (HCMUS):** 24120393@student.hcmus.edu.vn

**Email (cá nhân):** ngocyoyolove197@gmail.com

## II. Giới thiệu sản phẩm
Bài thực hành này thực hiện xây dựng một ứng dụng ghi chú đơn giản.

- Hỗ trợ thêm, chỉnh sửa, ghim, tìm lọc và xoá ghi chú.
- Ứng dụng đồng thời hỗ trợ to-do tương tự như ghi chú, kèm thêm hiển thị trạng thái (lí do vì ghi chú và lịch trình về bản chất là giống nhau)

## III. Cài đặt thư viện
### 1. Clone Repository

```
git clone https://github.com/Acrylite/note-web-app-393
cd note-web-app-393
```

### 2. Thiết lập và kích hoạt môi trường ảo

- Trên Windows:
```
python -m venv venv
.\venv\Scripts\activate
```

- Trên Linux/MacOS:
```
python -m venv venv
source venv/bin/activate
```

### 3. Cài đặt thư viện

```
pip install -r requirements.txt
```

### 4. Thiết lập file .env

Mục đích: Cho phép nhập thông tin như Firebase API key và private key mà không cần phải nhập trực tiếp ở mã nguồn.

Cách cài đặt được hướng dẫn cụ thể trong từng file `.env.example`:
- Frontend: [.env.example](https://github.com/Acrylite/note-web-app-393/blob/main/frontend/.env.example)
- Backend: [.env.example](https://github.com/Acrylite/note-web-app-393/blob/main/backend/app/.env.example)

## IV. Chạy thử chương trình

- Khởi động server Uvicorn (backend):

```
uvicorn backend.app.main:app --reload
```

- Khởi động Vite + React (frontend):

```
cd frontend
npm run dev
```

## V. Video demo

(sẽ thêm vào sau khi thi giữa kì :sob:)