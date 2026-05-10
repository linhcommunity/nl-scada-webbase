# NL SCADA WebBase

Giao diện giám sát SCADA thời gian thực, xây dựng bằng **Svelte + Vite**.

## Tính năng chính
- Đăng nhập, quản lý phiên, phân quyền (admin, operator, viewer)
- Quản lý Site, thành viên
- Quản lý thiết bị (Gateway) và điểm dữ liệu (Tag)
- Giám sát dữ liệu thời gian thực qua WebSocket
- Biểu đồ lịch sử dữ liệu
- Giao diện tối ưu cho nhà máy (High Performance HMI)

## Cài đặt

```bash
npm install
npm run dev
```
Truy cập http://localhost:5173

## Cấu trúc thư mục

src/
├── lib/           # API client, WebSocket, utils
├── stores/        # Svelte stores (auth, theme, alarm)
├── components/    # Thành phần giao diện dùng chung
├── widgets/       # Widget chuyên biệt cho SCADA
├── pages/         # Các trang (routes)
├── App.svelte     # Root component
└── main.js        # Entry point
