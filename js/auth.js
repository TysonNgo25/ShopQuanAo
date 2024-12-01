// Lưu thông tin người dùng vào localStorage khi đăng ký
// Hàm đăng ký người dùng
function registerUser() {
  const username = document.getElementById("registerUsername");
  const password = document.getElementById("registerPassword");
  const email = document.getElementById("registerEmail");
  const phone = document.getElementById("registerPhone");

  if (username && password && email && phone) {
    if (username.value && password.value && email.value && phone.value) {
      localStorage.setItem("username", username.value);
      localStorage.setItem("password", password.value);
      localStorage.setItem("email", email.value);
      localStorage.setItem("phone", phone.value);
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

// Kiểm tra trạng thái đăng nhập

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const loggedInUser = localStorage.getItem("loggedInUser");
  const loginButton = document.querySelector("#userMenu");

  if (isLoggedIn === "true") {
    loginButton.innerHTML = `
      <div class="user-menu">
        <span>${loggedInUser}</span>
        <ul class="user-options">
          <li><a href="profile.html">Profile</a></li>
           <li><a href="yourcart.html">Your cart</a></li>
          <li><button onclick="logout()" style="border:none; background:none; color:white; cursor:pointer;">Log Out</button></li>
        </ul>
      </div>
    `;

    // Thêm CSS để hiển thị menu dạng dropdown khi hover
    const style = document.createElement("style");
    style.innerHTML = `
      .user-menu {
        position: relative;
        display: inline-block;
        color: white;
      }

      .user-options {
        display: none;
        position: absolute;
        background-color: #333;
        min-width: 160px;
        box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
        z-index: 1;
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
      }

      .user-options li {
        padding: 10px 20px; /* Tăng chiều cao và căn lề */
        line-height: 1.5; /* Chiều cao dòng đồng đều */
        text-align: left; /* Căn chữ trái */
        display: flex;
        align-items: center; /* Căn giữa theo chiều dọc */
      }

      .user-options li a, .user-options li button {
        color: white;
        text-decoration: none;
        display: block;
        width: 100%; /* Đảm bảo phần tử chiếm toàn bộ chiều rộng */
        text-align: left;
        font-size: 14px; /* Cỡ chữ phù hợp */
      }

      .user-options li:hover {
        background-color: #575757; /* Màu nền khi hover */
      }

      .user-menu:hover .user-options {
        display: block;
      }
    `;
    document.head.appendChild(style);
  } else {
    loginButton.innerHTML = `<a href="login.html">Sign in</a>`;
  }
}

// Đăng xuất

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

function logout() {
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("loggedInUser"); // Xóa tên người dùng
  window.location.href = "index.html"; // Quay lại trang chính
}

document.addEventListener("DOMContentLoaded", () => {
  const loginButton = document.querySelector("#userMenu");
  if (loginButton) {
    checkLoginStatus();
  } else {
    console.error("Element #userMenu not found in the DOM.");
  }
});
