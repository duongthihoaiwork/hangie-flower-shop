// HANGIE PRODUCT CATALOG
// Add/edit products here. "price" is the only price value needed;
// the website automatically assigns the correct budget range.

const PRODUCTS = [
  {
    id: "HG001",
    name: "Bó Sophia",
    price: 350000,
    image: "assets/flowers/HG001.jpg",
    occasions: ["Tốt nghiệp", "Sinh nhật", "Kỉ niệm"],
    colors: ["Hồng"],
    type: "Bó hoa",
    size: "20 × 30 cm",
    flowers: ["Hồng Sophia"],
    recipient: ["Bạn bè", "Người yêu"],
    description: "Bó hoa tone hồng nhẹ nhàng, phù hợp tặng bạn bè, người yêu trong dịp sinh nhật, tốt nghiệp và chúc mừng.",
    featured: true,
    available: true
  },
  {
    id: "HG002",
    name: "Hoa garden mix tone hồng",
    price: 450000,
    image: "assets/flowers/HG002.jpg",
    occasions: ["Sinh nhật", "Tỏ tình", "Kỷ niệm", "Tốt nghiệp"],
    colors: ["Hồng", "Trắng"],
    type: "Bó hoa",
    size: "22 × 32 cm",
    flowers: ["Hoa hồng", "Baby", "Đồng tiền"],
    recipient: ["Người yêu", "Bạn bè", "Gia đình"],
    description: "Thiết kế ngọt ngào, mềm mại dành cho những lời yêu thương và những ngày kỷ niệm đáng nhớ.",
    featured: true,
    available: true
  },
  {
    id: "HG003",
    name: "Bó hương dương và Gấu bông",
    price: 350000,
    image: "assets/flowers/HG003.jpg",
    occasions: ["Tốt nghiệp", "Chúc mừng"],
    colors: ["Vàng", "Trắng"],
    type: "Bó hoa",
    size: "25 × 35 cm",
    flowers: ["Hoa hướng dương", "Hoa hồng", "Gấu bông"],
    recipient: ["Bạn bè", "Người yêu"],
    description: "Tone vàng nổi bật, phù hợp làm hoa chúc mừng lễ tốt nghiệp và những cột mốc quan trọng.",
    featured: true,
    available: true
  },
  {
    id: "HG004",
    name: "Bó cẩm tú cầu mix pingpong",
    price: 200000,
    image: "assets/flowers/HG004.jpg",
    occasions: ["Sinh nhật", "Tốt nghiệp", "Chúc mừng"],
    colors: ["Trắng", "Xanh lá"],
    type: "Bó hoa",
    size: "18 × 28 cm",
    flowers: ["Cẩm tú cầu", "Pingpong", "Hồng"],
    recipient: ["Người yêu", "Bạn bè"],
    description: "Mẫu hoa nhẹ nhàng với cảm giác trong trẻo, phù hợp cho nhiều dịp tặng hoa.",
    featured: false,
    available: true
  },
  {
    id: "HG005",
    name: "Bó cẩm tú cầu mix hoa hồng",
    price: 300000,
    image: "assets/flowers/HG005.jpg",
    occasions: ["Tốt nghiệp", "Kỷ niệm", "Sinh nhật"],
    colors: ["Xanh dương", "Hồng"],
    type: "Bó hoa",
    size: "28 × 40 cm",
    flowers: ["Cẩm tú cầu", "Hoa hồng", "Đồng tiền"],
    recipient: ["Người yêu", "Bạn bè"],
    description: "Thiết kế nổi bật dành cho những dịp cần một bó hoa có điểm nhấn và cảm giác sang trọng.",
    featured: true,
    available: true
  },
  {
    id: "HG006",
    name: "Bó hồng Sophia",
    price: 450000,
    image: "assets/flowers/HG006.jpg",
    occasions: ["Tặng mẹ", "8/3", "20/10", "Tặng người yêu", "Tốt nghiệp"],
    colors: ["Hồng"],
    type: "Bó hoa",
    size: "25 × 30 cm",
    flowers: ["Hoa hồng Sophia"],
    recipient: ["Bạn bè", "Người yêu", "Mẹ"],
    description: "Bó hoa ấm áp dành tặng người yêu, bạn bè, người thân và những dịp đặc biệt.",
    featured: true,
    available: true
  },
  {
    id: "HG008",
    name: "Bó cẩm tú cầu hồng",
    price: 500000,
    image: "assets/flowers/HG008.jpg",
    occasions: ["Sinh nhật", "Chúc mừng", "Tốt nghiệp"],
    colors: ["Hồng"],
    type: "Bó hoa",
    size: "15 × 25 cm",
    flowers: ["Cẩm tú cầu hồng"],
    recipient: [ "Người yêu", "Bạn bè", "Mẹ"],
    description: "Mẫu nhỏ xinh, ngân sách dễ tiếp cận, phù hợp cho những lời chúc đơn giản nhưng tinh tế.",
    featured: false,
    available: true
  
  },
  {
    id: "HG009",
    name: "Bó cẩm tú cầu hồng",
    price: 420000,
    image: "assets/flowers/HG009.jpg",
    occasions: ["Kỷ niệm", "Tốt nghiệp", "20/11", "Chúc mừng"],
    colors: ["Hồng", "Đen"],
    type: "Bó hoa",
    size: "22 × 30 cm",
    flowers: ["Cẩm tú cầu hồng"],
    recipient: ["Người yêu", "Bạn bè", "Mẹ"],
    description: "Thiết kế nhẹ nhàng dành cho ngày kỉ niệm và các dịp đặc biệt",
    featured: false,
    available: true
  },
  {
    id: "HG010",
    name: "Bó cẩm chướng trắng",
    price: 400000,
    image: "assets/flowers/HG010.jpg",
    occasions: ["Tốt nghiệp", "Chúc mừng", "Kỷ niệm"],
    colors: ["Trắng", "Xanh"],
    type: "Bó hoa",
    size: "40 × 60 cm",
    flowers: ["Cẩm chướng trắng", "Lam tinh", "Thạch thảo"],
    recipient: ["Người yêu", "Bạn bè", "Người thân"],
    description: "Thiết kế lớn, nổi bật cho kỉ niệm, chúc mừng và các sự kiện quan trọng.",
    featured: true,
    available: true
  }
];

if (typeof module !== "undefined") module.exports = PRODUCTS;
