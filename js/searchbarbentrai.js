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




function filterByPrice(min, max) {
  // Chuyển đổi giá thành số để so sánh
  const filteredProducts = products.filter(product => {
    const price = parseFloat(product.price.replace('$', ''));
    return price >= min && price <= max;
  });
  
  // Hiển thị các sản phẩm lọc được
  displayProducts(filteredProducts);
}

function displayProducts(productsToDisplay) {
  const productListDiv = document.getElementById("product-list");
  productListDiv.innerHTML = ''; // Xóa nội dung cũ trước khi hiển thị sản phẩm mới

  productsToDisplay.forEach(product => {
    const productHTML = `
      <div class="product">
        <img src="${product.image}" alt="${product.name}">
        <h3><a href="${product.link}">${product.name}</a></h3>
        <p>${product.price}</p>
      </div>
    `;
    productListDiv.innerHTML += productHTML;
  });
}







