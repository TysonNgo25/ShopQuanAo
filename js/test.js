
const products = [
    {
      name: "Piqué Biker Jacket",
      price: "$67.24",
      image: "img/product/product-2.jpg",
      link: "shop-details-1.html"
    },
    {
      name: "Black Sneaker",
      price: "$43.48",
      image: "img/product/product-3.jpg",
      link: "shop-details-2.html"
    },
    {
      name: "Brown Hooded Shirt Jacket",
      price: "$60.9",
      image: "img/product/product-4.jpg",
      link: "shop-details-3.html"
    },
    {
      name: "Gray Fringed Scarf",
      price: "$98.49",
      image: "img/product/product-6.jpg",
      link: "shop-details-4.html"
    },
    {
      name: "Fringed Black Scarf",
      price: "$85.99",
      image: "img/product/product-7.jpg",
      link: "shop-details-5.html"
    },
    {
        name:"Black Floral Graphic T-shirt",
        price: "$67.24",
        image: "img/product/product-9.jpg",
        link: "shop-details-7.html" 
    },
    {
        name:"Perfume Set",
        price:"$43.48",
        image:"img/product/product-10.jpg",
        link:"shop-details-8.html"
    },
    {
        name:"Navy Henley T-shirt",
        price:"$26.28",
        image:"img/product/product-8.jpg",
        link:"shop-details-6.html"
    },
    {
        name:"White Utility Backpack",
        price:"$60.9",
        image:"img/product/product-11.jpg",
        link:"shop-details-9.html"
    },
    {
        name:"Camouflage Hooded Jacket",
        price:"$98.49",
        image:"img/product/product-12.jpg",
        link:"shop-details-10.html"
    },
    {
        name:"Brown Leather Backpack",
        price:"$49.66",
        image:"img/product/product-13.jpg",
        link:"shop-details-11.html"
    },
    {
        name:"Gold Rectangular Cufflinks",
        price:"$26.28",
        image:"img/product/product-14.jpg",
        link:"shop-details-12.html"
    }

  ];
  
  // Hàm tìm kiếm sản phẩm
  function searchProducts() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = products.filter(product => product.name.toLowerCase().includes(query));
  
    const resultsList = document.getElementById("searchResultsList");
    resultsList.innerHTML = ''; // Xóa kết quả cũ
  
    if (searchResults.length > 0) {
      // Hiển thị kết quả tìm kiếm
      searchResults.forEach(product => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("product__item");
  
        resultItem.innerHTML = `
          <div class="product__item__pic">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product__item__text">
            <h6>${product.name}</h6>
            <a href="${product.link}" class="add-cart">+ View Details</a>
            <h5>${product.price}</h5>
          </div>
        `;
  
        resultsList.appendChild(resultItem);
      });
  
      // Hiển thị vùng kết quả
      document.getElementById("searchResults").style.display = "block";
    } else {
      // Nếu không có kết quả tìm kiếm
      resultsList.innerHTML = "<p>No products found</p>";
      document.getElementById("searchResults").style.display = "block";
    }
  }

