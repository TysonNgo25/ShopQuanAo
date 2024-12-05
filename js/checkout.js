document.getElementById("different-address").addEventListener("change", function () {
    const addressFields = document.querySelectorAll("#different-address-fields input");
    
    if (this.checked) {
      addressFields.forEach((field) => {
        field.disabled = false; // Bật các trường nhập
      });
    } else {
      addressFields.forEach((field) => {
        field.disabled = true; // Tắt các trường nhập
        field.value = ""; // Xóa dữ liệu đã nhập
      });
    }
  });
  const textarea = document.getElementById('order-note');

// Hàm để tự động điều chỉnh chiều cao của textarea
textarea.addEventListener('input', function() {
  this.style.height = 'auto'; // Đặt lại chiều cao ban đầu
  this.style.height = (this.scrollHeight) + 'px'; // Cập nhật chiều cao mới dựa trên nội dung
});
