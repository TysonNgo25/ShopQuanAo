// Lấy giỏ hàng từ localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Lấy form checkout
const checkoutForm = document.getElementById("checkout-form");

// Lắng nghe sự kiện submit từ form
checkoutForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Ngừng hành động mặc định của form

  // Lấy thông tin người nhận từ form
  const name = document.getElementById("name").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const paymentMethod = document.getElementById("payment").value;

  // Tạo đối tượng đơn hàng
  const order = {
    name: name,
    address: address,
    phone: phone,
    paymentMethod: paymentMethod,
    products: cart, // Giỏ hàng của người dùng
    date: new Date().toISOString(), // Ngày giờ hiện tại
  };

  // Lấy lịch sử mua hàng từ localStorage (nếu có)
  const orderHistory = JSON.parse(localStorage.getItem("orderHistory")) || [];

  // Thêm đơn hàng mới vào lịch sử
  orderHistory.push(order);

  // Lưu lại lịch sử đơn hàng vào localStorage
  localStorage.setItem("orderHistory", JSON.stringify(orderHistory));

  // Xóa giỏ hàng sau khi hoàn tất thanh toán
  localStorage.removeItem("cart");

  // Thông báo người dùng đã đặt hàng thành công
  alert("Đặt hàng thành công!");

  // Chuyển hướng người dùng tới trang Profile để xem lịch sử mua hàng
  window.location.href = "profile.html"; // Bạn có thể thay đổi URL theo nhu cầu
});
