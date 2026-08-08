# Hangie Flower Shop — Website V2

Bản V2 giữ cấu trúc website miễn phí HTML/CSS/JavaScript nhưng đã nâng cấp cho việc sử dụng thật.

## Có gì mới?
- Finder theo **người nhận + dịp + ngân sách**
- Giá chỉ cần nhập ở `price`; website tự phân nhóm ngân sách
- Dữ liệu sản phẩm tách riêng trong `products.js`
- Có kích thước, hoa chính, người nhận, trạng thái còn/hết, mẫu nổi bật
- Nút **Đặt mẫu này qua Zalo** tự tạo nội dung có mã mẫu + tên + giá
- Khu vực Mẫu được yêu thích
- Facebook dùng một biến duy nhất trong `script.js`
- SEO cơ bản: description, robots, theme-color, Open Graph
- Responsive cho điện thoại/tablet/desktop

## Cấu trúc
- `index.html` — giao diện
- `style.css` — giao diện và responsive
- `script.js` — logic lọc, popup, Zalo
- `products.js` — nơi bạn quản lý danh sách hoa
- `assets/logo.png` — logo Hangie
- `assets/banner.png` — banner Hangie
- `assets/flowers/` — ảnh mẫu demo

## Thêm một sản phẩm
Mở `products.js` và thêm object vào `PRODUCTS`.

```js
{
  id: "HG011",
  name: "Tên mẫu",
  price: 390000,
  image: "assets/flowers/hg011.jpg",
  occasions: ["Sinh nhật", "Tốt nghiệp"],
  colors: ["Xanh", "Trắng"],
  type: "Bó hoa",
  size: "20 × 30 cm",
  flowers: ["Hoa hồng", "Baby"],
  recipient: ["Bạn bè", "Người yêu"],
  description: "Mô tả mẫu hoa.",
  featured: true,
  available: true
}
```

### Giá
Chỉ nhập:
`price: 390000`

Không cần `budget`. Website tự xác định nhóm:
- Dưới 200K
- 200–300K
- 300–500K
- 500–700K
- 700K–1TR
- Trên 1TR

### Trạng thái
- `available: true` → Đang nhận đơn
- `available: false` → Tạm hết mẫu

### Mẫu nổi bật
- `featured: true` → có thể xuất hiện ở khu vực Mẫu được yêu thích.

## Ảnh sản phẩm
Hiện package dùng SVG demo để website chạy ngay vì chưa có ảnh bó hoa thật trong file nguồn.
Khi có ảnh thật, đặt ảnh vào:
`assets/flowers/`

Ví dụ:
`assets/flowers/hg011.jpg`

và sửa:
`image: "assets/flowers/hg011.jpg"`

Khuyến nghị ảnh 1:1, khoảng 800×800 đến 1200×1200 px.

## Facebook
Mở `script.js`:
```js
const FACEBOOK_URL = "";
```
Dán link Fanpage thật vào giữa dấu ngoặc:
```js
const FACEBOOK_URL = "https://www.facebook.com/ten-fanpage";
```

Hiện không tự đoán link Fanpage để tránh gắn nhầm trang.

## Địa chỉ và hotline
Hiện website đang dùng:
- Hotline/Zalo: 0972 660 723
- Địa chỉ: Hồ Văn Tư, Trường Thọ, Thủ Đức

Nếu cần đổi, tìm trực tiếp trong `index.html`.

## Chạy thử
Giải nén → mở `index.html` bằng Chrome.

## Đưa lên GitHub Pages
1. Tạo repository public.
2. Upload toàn bộ file trong thư mục này.
3. `Settings` → `Pages`.
4. Chọn branch `main`, folder `/ (root)`.
5. Save.
6. Chờ GitHub xuất bản.

Website sẽ có dạng:
`https://TEN-GITHUB.github.io/TEN-REPOSITORY/`

Sau khi có URL chính thức, thêm canonical vào `<head>`:
```html
<link rel="canonical" href="https://...">
```

## Lưu ý về Zalo
Website có thể tạo đường dẫn `zalo.me` kèm text đặt mẫu. Khả năng hiển thị nội dung soạn sẵn phụ thuộc vào ứng dụng/trình duyệt và Zalo; nếu thiết bị không hỗ trợ, khách vẫn có thể mở Zalo và copy mã mẫu.

## Giai đoạn tiếp theo
Khi có nhiều sản phẩm, có thể nâng cấp sang:
- trang chi tiết có URL riêng
- Open Graph động theo sản phẩm
- Google Search Console
- sitemap
- Firebase/Supabase hoặc admin dashboard nếu cần quản lý sản phẩm không cần sửa code.

\n## V2.1\n- `config.js`: quản lý tập trung hotline, Zalo, Facebook, địa chỉ và URL website.\n- Popup có **Sao chép mã mẫu**.\n- Mẫu hết hàng vẫn có nút **Hỏi Hangie về mẫu này**.\n- Thêm structured data `Florist`, Open Graph/Twitter card và chuẩn bị canonical.\n- Sau khi có URL GitHub Pages, điền `siteUrl` trong `config.js`.\n

## V2.2 — Zalo đặt mẫu
Zalo cá nhân không đảm bảo nhận tham số `?text=` từ website để tự điền nội dung vào ô chat. Vì vậy V2.2 dùng cách ổn định hơn:
1. Khách bấm **Đặt mẫu này qua Zalo**.
2. Website tự sao chép nội dung, ví dụ: `Em muốn đặt mẫu HG001 - Blue Dream - 350.000đ.`
3. Website mở Zalo của shop.
4. Khách chỉ cần **dán** nội dung vào khung chat và gửi.
