let cart = [];

async function loadAllBooks() {
  try {
    const res = await fetch("http://localhost:1880/sach");
    const data = await res.json();
    displayBooks(data);
  } catch (err) {
    console.error(err);
    alert("Không thể tải dữ liệu sách từ Node-RED!");
  }
}

function displayBooks(data) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  if (!data || data.length === 0) {
    bookList.innerHTML = `<p class="no-result">Không tìm thấy sách.</p>`;
    return;
  }

  data.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <div class="book-title">${book.TenSach}</div>
      <div class="book-meta">
        <p>📖 Tác giả: ${book.TacGia}</p>
        <p>🏷️ Thể loại: ${book.MaTheLoai}</p>
        <p>💰 Giá: ${book.GiaBan?.toLocaleString()} VNĐ</p>
        <p>📦 Số lượng: <span class="book-qty">${book.SoLuong}</span></p>
      </div>
      <div class="image-wrap">
        <img src="${book.HinhAnh || 'https://via.placeholder.com/150?text=No+Image'}"
             class="book-image"
             alt="${book.TenSach}"
             onerror="this.src='https://via.placeholder.com/150?text=No+Image';">
      </div>
      <div class="book-desc">${book.MoTa || "Không có mô tả."}</div>
      <div class="card-footer">
        <button class="buy-btn" onclick='addToCart(${JSON.stringify(book)})'>🛒 Chọn mua</button>
      </div>
    `;
    bookList.appendChild(card);
  });
}

document.getElementById("searchBtn").addEventListener("click", function () {
  const keyword = document.getElementById("keyword").value.trim().toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    const title = card.querySelector(".book-title").textContent.toLowerCase();
    const info = card.querySelector(".book-meta").textContent.toLowerCase();
    card.style.display = (title.includes(keyword) || info.includes(keyword)) ? "flex" : "none";
  });
});

document.getElementById("keyword").addEventListener("keypress", e => {
  if (e.key === "Enter") document.getElementById("searchBtn").click();
});

document.getElementById("homeBtn").addEventListener("click", () => {
  document.getElementById("keyword").value = "";
  loadAllBooks();
});

document.getElementById("invoiceBtn").addEventListener("click", () => {
  updateInvoice();
  document.getElementById("invoiceModal").classList.remove("hidden");
});

document.getElementById("closeInvoice").addEventListener("click", () => {
  document.getElementById("invoiceModal").classList.add("hidden");
});

function addToCart(book) {
  if (book.SoLuong <= 0) {
    alert("⚠️ Sách này đã hết hàng!");
    return;
  }
  cart.push(book);
  updateCartCount();
  alert(`✅ Đã thêm "${book.TenSach}" vào hóa đơn!`);
}

function updateInvoice() {
  const list = document.getElementById("invoice-items");
  const totalEl = document.getElementById("invoice-total");
  list.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    list.innerHTML = "<p>Chưa có sách nào.</p>";
    totalEl.textContent = "";
    return;
  }

  cart.forEach((book, i) => {
    total += book.GiaBan;
    const div = document.createElement("div");
    div.textContent = `${i + 1}. ${book.TenSach} - ${book.GiaBan.toLocaleString()} VNĐ`;
    list.appendChild(div);
  });

  totalEl.textContent = `Tổng cộng: ${total.toLocaleString()} VNĐ`;
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

document.getElementById("checkoutBtn").addEventListener("click", async () => {
  const name = document.getElementById("buyer-name").value.trim();
  const phone = document.getElementById("buyer-phone").value.trim();
  const email = document.getElementById("buyer-email").value.trim();
  const address = document.getElementById("buyer-address").value.trim();
  const note = document.getElementById("buyer-note").value.trim();

  if (!name || !phone || !email || !address) {
    alert("⚠️ Vui lòng nhập đầy đủ thông tin người mua!");
    return;
  }

  if (cart.length === 0) {
    alert("🛒 Giỏ hàng trống!");
    return;
  }

  for (let book of cart) {
    try {
      await fetch(`http://localhost:1880/update-soluong`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          MaSach: book.MaSach,
          SoLuongMua: 1
        })
      });
    } catch (e) {
      console.error("Lỗi cập nhật số lượng:", e);
    }
  }

  alert(`💳 Thanh toán thành công! Cảm ơn quý khánh ${name}! đã mua sách của chúng tôi`);
  cart = [];
  updateCartCount();
  document.getElementById("invoiceModal").classList.add("hidden");
  loadAllBooks();
});

window.onload = loadAllBooks;
