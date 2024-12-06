document.addEventListener("DOMContentLoaded", function () {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Cập nhật giao diện giỏ hàng
  function updateCartUI() {
    const cartTableBody = document.querySelector(
      ".shopping__cart__table tbody"
    );
    const cartSubtotal = document.querySelector(
      ".cart__total ul li:nth-last-child(2) span"
    );
    const cartTotal = document.querySelector(
      ".cart__total ul li:last-child span"
    );

    if (cart.length === 0) {
      cartTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="text-center">Your cart is empty!</td>
        </tr>`;
      if (cartTotal) cartTotal.textContent = "$0.00";

      return;
    }

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
        <td class="cart__price">$${(item.price * item.quantity).toFixed(2)}</td>
        <td class="cart__close">
          <button class="remove-btn" data-index="${index}">×</button>
        </td>
      </tr>`
      )
      .join("");

    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const subtotalPrice = totalPrice;
    const totalElement = document.getElementById("total");
    if (totalElement) totalElement.textContent = `$${totalPrice.toFixed(2)}`;
    if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    if (cartSubtotal) cartSubtotal.textContent = `$${subtotalPrice.toFixed(2)}`;
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

  // Xử lý thêm từ trang shopping-detail
  const addCartDetailButton = document.querySelector(".buttonn");
  if (addCartDetailButton) {
    addCartDetailButton.addEventListener("click", function (event) {
      event.preventDefault(); // Ngăn chặn hành vi mặc định

      const productElement = addCartDetailButton.closest(
        ".product__details__content"
      );
      const name = productElement.querySelector("h4").textContent.trim();
      const price = parseFloat(addCartDetailButton.dataset.price);
      const imageElement = productElement.querySelector(".set-bg");
      const image = imageElement ? imageElement.dataset.setbg : null;

      const id = `detail-${name}-${price}`.replace(/\s+/g, "-").toLowerCase();
      const product = { id, name, price, image };

      addToCart(product);

      alert("Sản phẩm đã được thêm vào giỏ hàng!");
    });
  }

  // Xử lý cập nhật số lượng và xóa sản phẩm trong giỏ hàng
  const cartTableBody = document.querySelector(".shopping__cart__table tbody");

  if (cartTableBody) {
    cartTableBody.addEventListener("click", function (e) {
      const target = e.target;
      const index = target.dataset.index;

      if (target.classList.contains("remove-btn")) {
        const confirmDelete = confirm(
          "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
        );
        if (confirmDelete) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartUI();
        } else {
          console.log("Sản phẩm không bị xóa.");
        }
      } else if (target.classList.contains("qty-btn")) {
        const action = target.dataset.action;
        if (action === "increase") {
          cart[index].quantity++;
        } else if (action === "decrease" && cart[index].quantity > 1) {
          cart[index].quantity--;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartUI();
      }
    });
  }

  // Hiển thị giỏ hàng trên trang shopping-cart.html
  if (window.location.pathname.includes("shopping-cart.html")) {
    updateCartUI();
  }

  // Chuyển đến trang checkout
  const checkoutButton = document.querySelector(".primary-btn");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", function (event) {
      if (cart.length === 0) {
        alert("Giỏ hàng bạn đang trống,vui lòng thêm sản phẩm.");
        event.preventDefault();
        return;
      }
      window.location.href = "checkout.html";
    });
  }
});

//-----------------------------------------checkout------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("different-address");
  const placeOrderBtn = document.querySelector(".place-order-btn");

  function updateCheckoutUI() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const orderList = document.querySelector(".checkout__total__products");
    const totalElement = document.querySelector(
      ".checkout__total__all li:last-child span"
    );
    const subtotalElement = document.querySelector(
      ".checkout__total__all li:first-child span"
    );

    if (cart.length === 0) {
      orderList.innerHTML = "<li>No items in cart</li>";
      subtotalElement.textContent = "$0.00";
      totalElement.textContent = "$0.00";
      return;
    }

    let totalPrice = 0;

    orderList.innerHTML = cart
      .map(
        (item) => `
        <li>${item.quantity} x ${item.name} <span>$${(
          item.price * item.quantity
        ).toFixed(2)}</span></li>
      `
      )
      .join("");

    totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }

  placeOrderBtn.addEventListener("click", function () {
    let recipient, phone, address;
    const selectedMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    ).value;

    if (checkbox.checked) {
      recipient = document.getElementById("other-full-name").value;
      phone = document.getElementById("other-phone-number").value;
      address = document.getElementById("other-address").value;
       // Kiểm tra nếu có bất kỳ trường nào bị bỏ trống
       if (!recipient || !phone || !address) {
        alert("Vui lòng nhập đầy đủ thông tin người nhận!");
        return;
       }
    } else {
      recipient = localStorage.getItem("fullname");
      phone = localStorage.getItem("phone");
      address = localStorage.getItem("address");

      if (!recipient || !phone || !address) {
        alert(
          "Không tìm thấy thông tin mặc định. Vui lòng cập nhật thông tin cá nhân."
        );
        return;
      }
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const orderDetails = {
      recipient,
      phone,
      address,
      paymentMethod: selectedMethod,
      totalPrice,
      items: cart,
      orderDate: new Date().toLocaleString(),
    };

    // Lưu lịch sử đơn hàng
    const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
    orderHistory.push(orderDetails);
    localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

    alert("Đặt hàng thành công, cảm ơn quý khách!");

    // Xóa giỏ hàng
    localStorage.removeItem("cart");
    window.location.href = "yourcart.html"; // Chuyển đến trang lịch sử đơn hàng
  });

  if (window.location.pathname.includes("checkout.html")) {
    updateCheckoutUI();
  }
  //-------------------------------------Thanh toán
  // Lấy các phần tử liên quan đến phương thức thanh toán
  const paymentMethods = document.querySelectorAll(
    'input[name="payment-method"]'
  );
  const bankTransferForm = document.querySelector(".bank-transfer-form"); // Form cho thanh toán chuyển khoản
  const cardPaymentForm = document.querySelector(".card-payment-form"); // Form cho thanh toán qua thẻ

  // Xử lý hiển thị form phù hợp khi người dùng chọn phương thức thanh toán
  paymentMethods.forEach((method) => {
    method.addEventListener("change", function () {
      if (this.value === "transfer") {
        // Hiển thị form chuyển khoản ngân hàng
        bankTransferForm.style.display = "block";
        cardPaymentForm.style.display = "none";
      } else if (this.value === "card") {
        // Hiển thị form nhập thông tin thẻ
        bankTransferForm.style.display = "none";
        cardPaymentForm.style.display = "block";
      } else {
        // Ẩn cả hai form nếu chọn tiền mặt
        bankTransferForm.style.display = "none";
        cardPaymentForm.style.display = "none";
      }
    });
  });
  // Lấy phương thức thanh toán đã được chọn
  const selectedMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  if (selectedMethod === "transfer") {
    // Kiểm tra xem người dùng đã nhập mã tham chiếu chuyển khoản chưa
    const reference = document.getElementById("bank-reference").value;
    if (!reference) {
      alert("Please provide a reference number for the bank transfer.");
      return;
    }
    alert("Your bank transfer order has been placed!");
  } else if (selectedMethod === "card") {
    // Lấy thông tin thẻ từ form
    const cardNumber = document.getElementById("card-number").value;
    const cardHolder = document.getElementById("card-holder").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    document
      .getElementById("card-number")
      .addEventListener("input", function (e) {
        const value = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
        e.target.value = value.replace(/(\d{4})/g, "$1 ").trim(); // Thêm khoảng trắng sau mỗi 4 số
      });

    document
      .getElementById("expiry-date")
      .addEventListener("input", function (e) {
        const value = e.target.value.replace(/\D/g, ""); // Chỉ giữ lại số
        if (value.length <= 2) {
          e.target.value = value; // Nếu dưới 2 số, không thêm dấu "/"
        } else {
          e.target.value = value.slice(0, 2) + "/" + value.slice(2, 4); // Định dạng MM/YY
        }
      });
  }
});
