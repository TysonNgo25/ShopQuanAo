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
          <td class="cart__price">$${(item.price * item.quantity).toFixed(
            2
          )}</td>
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
  //Xử lý thêm từ trang shopping-detail
  const addCartDetailButton = document.querySelector(".buttonn");

if (addCartDetailButton) {
  addCartDetailButton.addEventListener("click", function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định

    // Lấy phần tử chứa thông tin sản phẩm
    const productElement = addCartDetailButton.closest(".product__details__content");
    
    // Lấy tên và giá của sản phẩm
    const name = productElement.querySelector("h4").textContent.trim();
    const price = parseFloat(addCartDetailButton.dataset.price);
    
    // Lấy đường dẫn hình ảnh từ thuộc tính data-setbg
    const imageElement = productElement.querySelector(".set-bg");
    const image = imageElement ? imageElement.dataset.setbg : null; // Lấy giá trị từ data-setbg
    
    // Tạo ID duy nhất cho sản phẩm
    const id = `detail-${name}-${price}`.replace(/\s+/g, "-").toLowerCase();
    
    // Tạo đối tượng sản phẩm
    const product = { id, name, price, image };
    
    // Thêm sản phẩm vào giỏ hàng
    addToCart(product);
    
    // Xác nhận sản phẩm đã được thêm vào giỏ hàng
    alert(`Sản phẩm đã được thêm vào giỏ hàng!`);
  });
}

  

  


  


  

  // Xử lý cập nhật số lượng và xóa sản phẩm trong giỏ hàng
  const cartTableBody = document.querySelector(".shopping__cart__table tbody");

  if (cartTableBody) {
    cartTableBody.addEventListener("click", function (e) {
      const target = e.target;
      const index = target.dataset.index;
  
      // Xử lý khi người dùng nhấn nút "remove-btn"
      if (target.classList.contains("remove-btn")) {
        // Hiển thị hộp thoại xác nhận trước khi xóa
        const confirmDelete = confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (confirmDelete) {
          // Nếu người dùng nhấn "OK", xóa sản phẩm khỏi giỏ hàng
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartUI(); // Cập nhật lại giao diện giỏ hàng
        } else {
          // Nếu người dùng nhấn "Cancel", không làm gì
          console.log("Sản phẩm không bị xóa.");
        }
      }
  
      // Xử lý khi người dùng nhấn nút tăng giảm số lượng
      else if (target.classList.contains("qty-btn")) {
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
    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
      alert(
        "Giỏ hàng bạn đang trống,vui lòng thêm sản phẩm."
      );
      // Ngừng hành động mặc định (nếu checkoutButton là <a> hoặc form)
      event.preventDefault(); // Ngừng hành động mặc định
      return;
    }
    // Nếu giỏ hàng không trống, tiếp tục chuyển đến trang checkout
    window.location.href = "checkout.html";
  });
}

  

  // Hiển thị giỏ hàng trên checkout.html
  if (window.location.pathname.includes("checkout.html")) {
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
        ).toFixed(2)}</span></li>`
      )
      .join("");

    totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    subtotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    totalElement.textContent = `$${totalPrice.toFixed(2)}`;
  }
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

  // Xử lý logic khi nhấn nút "PLACE ORDER"
  const placeOrderBtn = document.querySelector(".place-order-btn");
  placeOrderBtn.addEventListener("click", function () {
    // Hiển thị thông báo xác nhận
    const confirmPayment = confirm("Bạn có muốn thanh toán không?");

    if (!confirmPayment) {
      return; // Nếu người dùng không xác nhận, dừng hành động
    }

    // Lấy phương thức thanh toán đã được chọn
    const selectedMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    ).value;

    const recipient = document.getElementById("first-name").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    // Kiểm tra xem người dùng đã điền đầy đủ thông tin giao hàng chưa
    if (!recipient || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin giao hàng.");
      return;
    }

    // Lưu thông tin giao hàng vào localStorage
    const orderDetails = {
      recipient: recipient,
      phone: phone,
      address: address,
      paymentMethod: selectedMethod,
    };
    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

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

      // Kiểm tra xem người dùng đã nhập đầy đủ thông tin thẻ chưa
      if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
        alert("Please provide complete card information.");
        return;
      }
      alert("Your card payment has been processed!");
    } else {
      // Xử lý khi chọn thanh toán bằng tiền mặt
      alert("Your cash payment order has been placed!");
    }
  });

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
});
function logout() {
  localStorage.removeItem("cart"); // Xóa giỏ hàng
  localStorage.clear(); // Xóa tất cả dữ liệu nếu cần
  alert("Đăng xuất thành công!");
}