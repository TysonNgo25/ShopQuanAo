// Lưu thông tin người dùng vào localStorage khi đăng ký
// Hàm đăng ký người dùng
function registerUser() {
  const username = document.getElementById("registerUsername");
  const password = document.getElementById("registerPassword");
  const email = document.getElementById("registerEmail");
  const phone = document.getElementById("registerPhone");
  const address = document.getElementById("registerAddress"); // Thêm trường Address
  const fullname = document.getElementById("registerFullname");

  if (username && password && email && phone && address && fullname) {
    if (
      username.value &&
      password.value &&
      email.value &&
      phone.value &&
      address.value &&
      fullname.value
    ) {
      localStorage.setItem("username", username.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("phone", phone.value);
      localStorage.setItem("address", address.value);
      localStorage.setItem("fullname", fullname.value);

      alert("Đăng ký thành công!");
      window.location.href = "login.html";
    } else {
      alert("Vui lòng điền đầy đủ thông tin!");
    }
  } else {
    console.error("One or more input elements not found.");
  }
}

// Xử lý đăng nhập
function loginUser() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("password").value;

  const storedUsername = localStorage.getItem("username");
  const storedPassword = localStorage.getItem("password");

  if (username === storedUsername && password === storedPassword) {
    alert("Đăng nhập thành công!");
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("loggedInUser", username); // Lưu tên người dùng
    window.location.href = "index.html"; // Chuyển hướng về trang chính
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
}

// Kiểm tra đăng nhập trước khi thêm vào giỏ hàng
function addToCart() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    alert("Sản phẩm đã được thêm vào giỏ hàng.");
  } else {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
    window.location.href = "login.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#userMenu");
  if (loginButton) {
    checkLoginStatus();
  } else {
    console.error("Element #userMenu not found in the DOM.");
  }
});

function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginButton = document.querySelector("#userMenu");

  if (isLoggedIn === "true") {
    // Cập nhật giao diện menu dropdown
    loginButton.innerHTML = `
          <div class="user-menu">
              <span>${loggedInUser}</span>
              <ul class="user-options">
                  <li><a href="profile.html">Profile</a></li>
                  <li><a href="yourcart.html">Your cart</a></li>
                  <li><button onclick="logout()" style="border:none; background:none; color:white; cursor:pointer;">LOG OUT</button></li>
              </ul>
          </div>
      `;

    // CSS để hỗ trợ dropdown
    addDropdownStyles();
  } else {
    loginButton.innerHTML = `<a href="login.html">Sign in</a>`;
  }
}

function addDropdownStyles() {
  const style = document.createElement("style");
  style.innerHTML = `
      .user-menu {
          position: relative;
          display: inline-block;
      }

      .user-options {
          display: none;
          position: absolute;
          background-color: #333;
          min-width: 160px;
          box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
          z-index: 9999;
          list-style: none;
          padding: 0;
          margin: 0;
      }

      .user-options li {
          padding: 10px 20px;
          line-height: 1.5;
          text-align: left;
      }

      .user-options li a, .user-options li button {
          color: white;
          text-decoration: none;
          display: block;
          width: 100%;
          font-size: 14px;
      }

      .user-options li:hover {
          background-color: #575757;
      }

      .user-menu:hover .user-options {
          display: block;
      }
  `;
  document.head.appendChild(style);
}

function logout() {
  const isConfirmed = confirm("Bạn có chắc chắn muốn đăng xuất không?");
  if (isConfirmed) {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    alert("Đã đăng xuất thành công!");
    window.location.href = "login.html";
  } else {
    alert("Hủy đăng xuất!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];
  const cartTableBody = document.querySelector("#cart-table tbody");

  if (orderHistory.length === 0) {
    cartTableBody.innerHTML = `<tr><td colspan="4" class="text-center">Không có đơn hàng nào.</td></tr>`;
    return;
  }

  const latestOrder = orderHistory[orderHistory.length - 1]; // Hiển thị đơn hàng mới nhất

  // Hiển thị thông tin đơn hàng
  const { recipient, phone, address, paymentMethod, totalPrice, items } =
    latestOrder;
  document.getElementById("recipient").textContent = recipient;
  document.getElementById("phone").textContent = phone;
  document.getElementById("address").textContent = address;
  document.getElementById("payment-method").textContent =
    paymentMethod;
  document.getElementById("total").textContent = `$${totalPrice.toFixed(2)}`;

  // Hiển thị các sản phẩm trong đơn hàng
  cartTableBody.innerHTML = items
    .map(
      (item, index) => `
            <tr>
              <td class="product__cart__item">
                <div class="product__cart__item__pic">
                  <img src="${item.image}" alt="${item.name}" />
                </div>
                <div class="product__cart__item__text">
                  <h6>${item.name}</h6>
                </div>
              </td>
              <td class="quantity__item">
                <div class="quantity">
                  <span>${item.quantity}</span>
                </div>
              </td>
              <td class="cart__price">$${(item.price * item.quantity).toFixed(
                2
              )}</td>
            </tr>`
    )
    .join("");
});
