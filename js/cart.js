document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cập nhật giao diện giỏ hàng
  function updateCartUI() {
    const cartTableBody = document.querySelector(
      ".shopping__cart__table tbody"
    );
    const cartTotal = document.querySelector(".cart__total span");
    const subtotal = document.querySelector(
      ".cart__total ul li:first-child span"
    );

    if (cart.length === 0) {
      cartTableBody.innerHTML = `
          <tr>
            <td colspan="4" class="text-center">Your cart is empty!</td>
          </tr>`;
      subtotal.textContent = "$0.00";
      cartTotal.textContent = "$0.00";
      return;
    }

    let totalPrice = 0;

    cartTableBody.innerHTML = cart
      .map(
        (item, index) => `
        <tr>
          <td class="product__cart__item">
            <div class="product__cart__item__pic">
              <img src="${item.image}" alt="${item.name}" />
            </div>
            <div class="product__cart__item__text">
              <h6>${item.name}</h6>
              <h5>$${item.price.toFixed(2)}</h5>
            </div>
          </td>
          <td class="quantity__item">
            <div class="quantity">
              <button class="qty-btn" data-action="decrease" data-index="${index}">-</button>
              <span>${item.quantity}</span>
              <button class="qty-btn" data-action="increase" data-index="${index}">+</button>
            </div>
          </td>
          <td class="cart__price">$${(item.price * item.quantity).toFixed(
            2
          )}</td>
          <td class="cart__close">
            <button class="remove-btn" data-index="${index}">×</button>
          </td>
        </tr>`
      )
      .join("");

    // Tính tổng tiền
    totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    subtotal.textContent = `$${totalPrice.toFixed(2)}`;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Thêm sản phẩm vào giỏ hàng
  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} has been added to your cart!`);
  }

  // Xử lý thêm sản phẩm từ trang shop
  const addCartButtons = document.querySelectorAll(".add-cart");
  addCartButtons.forEach((button, index) => {
    button.addEventListener("click", function () {
      const productElement = button.closest(".product__item");
      const name = productElement.querySelector("h6").textContent;
      const price = parseFloat(
        productElement.querySelector("h5").textContent.replace("$", "")
      );
      const image = productElement.querySelector(".set-bg").dataset.setbg;
      const product = { id: index, name, price, image };
      addToCart(product);
    });
  });

  // Xử lý cập nhật số lượng và xóa sản phẩm trong giỏ hàng
  const cartTableBody = document.querySelector(".shopping__cart__table tbody");
  if (cartTableBody) {
    cartTableBody.addEventListener("click", function (e) {
      const target = e.target;
      const index = target.dataset.index;

      if (target.classList.contains("remove-btn")) {
        cart.splice(index, 1);
      } else if (target.classList.contains("qty-btn")) {
        const action = target.dataset.action;
        if (action === "increase") {
          cart[index].quantity++;
        } else if (action === "decrease" && cart[index].quantity > 1) {
          cart[index].quantity--;
        }
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  }

  // Hiển thị giỏ hàng
  if (window.location.pathname.includes("shopping-cart.html")) {
    updateCartUI();
  }
});
