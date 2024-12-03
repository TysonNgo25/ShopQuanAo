const products = [
  {
    name: "Piqué Biker Jacket",
    price: "$67.24",
    image: "img/product/product-2.jpg",
    link: "shop-details-1.html",
    category: "clothing",
  },
  {
    name: "Black Sneaker",
    price: "$43.48",
    image: "img/product/product-3.jpg",
    link: "shop-details-2.html",
    category: "shoes",
  },
  {
    name: "Brown Hooded Shirt Jacket",
    price: "$60.9",
    image: "img/product/product-4.jpg",
    link: "shop-details-3.html",
    category: "clothing",
  },
  {
    name: "Gray Fringed Scarf",
    price: "$98.49",
    image: "img/product/product-6.jpg",
    link: "shop-details-4.html",
    category: "accessories",
  },
  {
    name: "Fringed Black Scarf",
    price: "$85.99",
    image: "img/product/product-7.jpg",
    link: "shop-details-5.html",
    category: "bags",
  },
  {
    name: "Black Floral Graphic T-shirt",
    price: "$67.24",
    image: "img/product/product-9.jpg",
    link: "shop-details-7.html",
    category: "clothing",
  },
  {
    name: "Perfume Set",
    price: "$43.48",
    image: "img/product/product-10.jpg",
    link: "shop-details-8.html",
    category: "accessories",
  },
  {
    name: "Navy Henley T-shirt",
    price: "$26.28",
    image: "img/product/product-8.jpg",
    link: "shop-details-6.html",
    category: "clothing",
  },
  {
    name: "White Utility Backpack",
    price: "$60.9",
    image: "img/product/product-11.jpg",
    link: "shop-details-9.html",
    category: "bags",
  },
  {
    name: "Camouflage Hooded Jacket",
    price: "$98.49",
    image: "img/product/product-12.jpg",
    link: "shop-details-10.html",
    category: "clothing",
  },
  {
    name: "Brown Leather Backpack",
    price: "$49.66",
    image: "img/product/product-13.jpg",
    link: "shop-details-11.html",
    category: "bags",
  },
  {
    name: "Gold Rectangular Cufflinks",
    price: "$26.28",
    image: "img/product/product-14.jpg",
    link: "shop-details-12.html",
    category: "accessories",
  },
];
function highlightLink(link) {
  // Xóa lớp 'active' khỏi tất cả các liên kết
  const links = document.querySelectorAll('a');
  links.forEach(function(link) {
    link.classList.remove('active');
  });
  
  // Thêm lớp 'active' vào liên kết vừa được click
  link.classList.add('active');
}
