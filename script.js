
const OCCASION_META = [
  ["Sinh nhật","🎂"],["Tốt nghiệp","🎓"],["Tỏ tình","💕"],["Kỷ niệm","❤️"],
  ["Chúc mừng","💐"],["Tặng mẹ","🌷"],["8/3","🌸"],["20/10","🌼"],
  ["20/11","📚"],["Valentine","💌"],["Khai trương","🎉"]
];

const BUDGET_META = [
  ["under-200k","Dưới 200K","Mẫu nhỏ xinh",0,199999],
  ["200-300k","200–300K","Dễ chọn · dễ tặng",200000,300000],
  ["300-500k","300–500K","Được yêu thích",300001,500000],
  ["500-700k","500–700K","Mẫu nổi bật",500001,700000],
  ["700k-1tr","700K–1TR","Thiết kế đặc biệt",700001,1000000],
  ["over-1m","Trên 1TR","Cao cấp · theo yêu cầu",1000001,Infinity]
];

const $ = id => document.getElementById(id);
const money = n => new Intl.NumberFormat("vi-VN").format(n) + "đ";

function escapeHtml(v) {
  return String(v).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}
function budgetForPrice(price) {
  return BUDGET_META.find(x => price >= x[3] && price <= x[4]);
}
function budgetLabel(price) {
  return budgetForPrice(price)?.[1] || "";
}
function uniqueNested(key) {
  return [...new Set(PRODUCTS.flatMap(p => Array.isArray(p[key]) ? p[key] : [p[key]]))];
}
function fillSelect(id, values, first) {
  const el = $(id);
  el.innerHTML = `<option value="">${first}</option>` + values.map(v => `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
}

function populateFilters() {
  const occasions = [...new Set(PRODUCTS.flatMap(p => p.occasions))];
  const recipients = uniqueNested("recipient");
  const colors = uniqueNested("colors");
  const types = uniqueNested("type");

  fillSelect("recipientFilter", recipients, "Tất cả người nhận");
  fillSelect("occasionFilter", occasions, "Tất cả dịp");
  fillSelect("colorFilter", colors, "Tất cả màu");
  fillSelect("typeFilter", types, "Tất cả kiểu");

  const budgetEl = $("budgetFilter");
  budgetEl.innerHTML =
    `<option value="">Tất cả mức giá</option>` +
    BUDGET_META.map(x =>
      `<option value="${x[0]}">${x[1]}</option>`
    ).join("");
}
    
function matchesBudget(p, key) {
  if (!key) return true;
  return budgetForPrice(p.price)?.[0] === key;
}
function tagsFor(p) {
  return [...p.occasions.slice(0,2), p.colors?.[0] || ""].filter(Boolean)
    .map(x => `<span class="tag">${escapeHtml(x)}</span>`).join("");
}
function productCard(p) {
  const status = p.available ? "" : `<span class="sold-badge">Tạm hết</span>`;
  const action = p.available ? "Xem chi tiết & đặt" : "Xem thông tin";
  return `
    <article class="product-card ${p.available ? "" : "sold-out"}">
      <div class="product-image">
        <img src="${escapeHtml(p.image)}" alt="${escapeHtml(p.name)}" loading="lazy">
        ${status}
      </div>
      <div class="product-info">
        <div class="product-code">${escapeHtml(p.id)}</div>
        <h3>${escapeHtml(p.name)}</h3>
        <div class="price">${money(p.price)}</div>
        <div class="budget-note">${escapeHtml(budgetLabel(p.price))}</div>
        <div class="product-tags">${tagsFor(p)}</div>
        <button class="card-btn" data-product="${escapeHtml(p.id)}">${action}</button>
      </div>
    </article>`;
}
function renderProducts(list, targetId = "productGrid") {
  $(targetId).innerHTML = list.map(productCard).join("");
  document.querySelectorAll(`#${targetId} .card-btn`).forEach(btn => btn.addEventListener("click", () => openModal(btn.dataset.product)));
}

function applyFilters() {
  const q = $("searchInput").value.trim().toLowerCase();
  const recipient = $("recipientFilter").value;
  const occasion = $("occasionFilter").value;
  const budget = $("budgetFilter").value;
  const color = $("colorFilter").value;
  const type = $("typeFilter").value;

  const list = PRODUCTS.filter(p => {
    const haystack = `${p.id} ${p.name} ${p.description} ${(p.flowers||[]).join(" ")}`.toLowerCase();
    return (!q || haystack.includes(q)) &&
      (!recipient || p.recipient?.includes(recipient)) &&
      (!occasion || p.occasions.includes(occasion)) &&
      matchesBudget(p, budget) &&
      (!color || p.colors?.includes(color)) &&
      (!type || p.type === type);
  });
  renderProducts(list);
  $("resultText").textContent = `Đang hiển thị ${list.length} mẫu hoa.`;
  $("emptyState").classList.toggle("hidden", list.length !== 0);
}

function resetFilters() {
  [
    "searchInput",
    "recipientFilter",
    "occasionFilter",
    "budgetFilter",
    "colorFilter",
    "typeFilter"
  ].forEach(id => {
    if ($(id)) $(id).value = "";
  });

  applyFilters();
}

function orderText(p) {
  return `Em muốn đặt mẫu ${p.id} - ${p.name} - ${money(p.price)}.`;
}

async function openZaloOrder(p) {
  const text = orderText(p);
  try {
    await navigator.clipboard.writeText(text);
    alert(`Đã sao chép nội dung đặt hàng:\n\n${text}\n\nZalo sẽ được mở. Bạn chỉ cần dán (⌘V/Ctrl+V) vào khung chat.`);
  } catch {
    alert(`Nội dung đặt hàng:\n\n${text}\n\nSau khi Zalo mở, bạn hãy sao chép nội dung này và gửi cho shop.`);
  }
  window.open(`https://zalo.me/${HANGIE.zalo}`, "_blank", "noopener");
}
function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  $("modalImage").src = p.image;
  $("modalImage").alt = p.name;
  $("modalCode").textContent = p.id;
  $("modalTitle").textContent = p.name;
  $("modalPrice").textContent = money(p.price);
  $("modalAvailability").textContent = p.available ? "● Đang nhận đơn" : "● Tạm hết mẫu";
  $("modalAvailability").className = `availability ${p.available ? "available" : "unavailable"}`;
  $("modalDetails").innerHTML = [
    ["Kiểu", p.type], ["Kích thước", p.size], ["Tone", (p.colors||[]).join(" · ")],
    ["Hoa chính", (p.flowers||[]).join(" · ")], ["Ngân sách", budgetLabel(p.price)]
  ].map(([k,v]) => `<div><span>${escapeHtml(k)}</span><strong>${escapeHtml(v||"Đang cập nhật")}</strong></div>`).join("");
  $("modalDescription").textContent = p.description;
  $("modalTags").innerHTML = [...p.occasions, ...(p.recipient||[])].map(x => `<span class="tag">${escapeHtml(x)}</span>`).join("");
  $("zaloOrder").href = `https://zalo.me/${HANGIE.zalo}`;
  $("zaloOrder").onclick = (e) => {
    e.preventDefault();
    openZaloOrder(p);
  };
  $("zaloOrder").classList.remove("disabled");
  $("zaloOrder").textContent = p.available ? "💬 Đặt mẫu này qua Zalo" : "💬 Hỏi Hangie về mẫu này";
  $("zaloOrder").setAttribute("aria-disabled", "false");
  $("productModal").classList.remove("hidden");
  document.body.classList.add("modal-open");
}
function closeModal() {
  $("productModal").classList.add("hidden");
  document.body.classList.remove("modal-open");
}
async function copyProductCode() {
  const code = $("modalCode").textContent.trim();
  try {
    await navigator.clipboard.writeText(code);
    const btn = $("copyCode");
    const old = btn.textContent;
    btn.textContent = "✓ Đã sao chép";
    setTimeout(() => btn.textContent = old, 1400);
  } catch {
    alert(`Mã mẫu: ${code}`);
  }
}
function setupShopInfo() {
  document.querySelectorAll('[data-hangie="displayPhone"]').forEach(el => el.textContent = HANGIE.displayPhone);
  document.querySelectorAll('[data-hangie="address"]').forEach(el => el.textContent = HANGIE.address);
  document.querySelectorAll('[data-hangie="phoneLink"]').forEach(el => el.href = `tel:${HANGIE.phone}`);
  document.querySelectorAll('[data-hangie="zaloLink"]').forEach(el => el.href = `https://zalo.me/${HANGIE.zalo}`);
  document.querySelectorAll('[data-hangie="facebookLink"]').forEach(el => {
    if (HANGIE.facebook) el.href = HANGIE.facebook;
    else {
      el.href = "#contact";
      el.addEventListener("click", e => {
        e.preventDefault();
        alert("Fanpage Hangie chưa được cài đặt. Hãy thêm link Facebook trong config.js.");
      });
    }
  });
  document.title = `${HANGIE.name} | ${HANGIE.tagline}`;
  const schema = $("hangieSchema");
  if (schema) {
    const data = JSON.parse(schema.textContent);
    data.name = HANGIE.name;
    data.telephone = `+84${HANGIE.phone.slice(1)}`;
    data.description = HANGIE.tagline;
    if (HANGIE.facebook) data.sameAs = [HANGIE.facebook];
    schema.textContent = JSON.stringify(data);
  }
  if (HANGIE.siteUrl) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = HANGIE.siteUrl;
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = HANGIE.siteUrl;
  }
}
function setupFacebook() {
  if (!FACEBOOK_URL) return;
  ["facebookCard","facebookFooter"].forEach(id => { const el = $(id); el.href = FACEBOOK_URL; });
}
document.addEventListener("DOMContentLoaded", () => {
  populateFilters();

  renderProducts(PRODUCTS);

  renderProducts(
  PRODUCTS.filter(p => p.featured && p.available).slice(0, 4),
  "featuredGrid"
);

  $("resetBtn").addEventListener("click", resetFilters);

  ["searchInput", "recipientFilter", "occasionFilter", "budgetFilter", "colorFilter", "typeFilter"].forEach(id => {
    $(id).addEventListener("input", applyFilters);
    $(id).addEventListener("change", applyFilters);
  });

  document.querySelectorAll("[data-close]").forEach(el =>
    el.addEventListener("click", closeModal)
  );

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });

  $("year").textContent = new Date().getFullYear();
  $("copyCode").addEventListener("click", copyProductCode);

  setupShopInfo();

  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  toggle.addEventListener("click", () => nav.classList.toggle("open"));

  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
});