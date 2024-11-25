// register.js

function registerAccount() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Kiểm tra mật khẩu và xác nhận mật khẩu
  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
  }

  // Kiểm tra nếu tên tài khoản đã tồn tại
  if (localStorage.getItem(username)) {
      alert("Username already exists! Please choose another one.");
      return;
  }

  // Lưu thông tin người dùng vào localStorage
  localStorage.setItem(username, password);
  alert("Registration successful! Please log in.");

  // Chuyển hướng người dùng về trang đăng nhập
  window.location.href = "login.html";
}

