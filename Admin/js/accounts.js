$(document).ready(function () {
    // Lấy danh sách người dùng từ localStorage hoặc khởi tạo mảng rỗng nếu không có
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Hiển thị danh sách người dùng
    renderUserList();

    // Thêm người dùng mới
    $("#addUserBtn").click(function () {
        const name = $("#newUserName").val();
        const email = $("#newUserEmail").val();
        const role = $("#newUserRole").val();

        if (name && email && role) {
            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                role: role,
                isLocked: false
            };
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            renderUserList();  // Tải lại danh sách người dùng
            alert('Thêm người dùng thành công!');
        } else {
            alert('Vui lòng điền đầy đủ thông tin!');
        }
    });

    // Xử lý khóa người dùng
    $(document).on("click", ".lock-user", function () {
        const userId = $(this).data('user-id');
        lockUser(userId);
    });

    // Xử lý chỉnh sửa thông tin người dùng
    $(document).on("click", ".edit-user", function () {
        const userId = $(this).data('user-id');
        editUser(userId);
    });

    // Hàm khóa người dùng
    function lockUser(userId) {
        if (confirm("Bạn có chắc chắn muốn khóa tài khoản này?")) {
            const user = users.find(u => u.id === userId);
            if (user) {
                user.isLocked = true;
                localStorage.setItem('users', JSON.stringify(users));
                alert('Tài khoản đã bị khóa!');
                renderUserList();
            }
        }
    }

    // Hàm chỉnh sửa thông tin người dùng
    function editUser(userId) {
        const user = users.find(u => u.id === userId);
        if (user) {
            // Hiển thị thông tin người dùng lên form để chỉnh sửa
            $("#editUserId").val(user.id);
            $("#editUserName").val(user.name);
            $("#editUserEmail").val(user.email);
            $("#editUserRole").val(user.role);

            // Mở modal hoặc form chỉnh sửa
            $('#editUserModal').modal('show');
        }
    }

    // Lưu thông tin chỉnh sửa từ form
    $("#saveEditBtn").click(function () {
        const userId = $("#editUserId").val();
        const updatedName = $("#editUserName").val();
        const updatedEmail = $("#editUserEmail").val();
        const updatedRole = $("#editUserRole").val();

        // Cập nhật thông tin người dùng trong danh sách
        const user = users.find(u => u.id === parseInt(userId));
        if (user) {
            user.name = updatedName;
            user.email = updatedEmail;
            user.role = updatedRole;

            // Cập nhật lại localStorage
            localStorage.setItem('users', JSON.stringify(users));
            renderUserList();
            $('#editUserModal').modal('hide');
            alert('Thông tin người dùng đã được cập nhật!');
        }
    });

    // Hàm hiển thị danh sách người dùng
    function renderUserList() {
        const tableBody = $("tbody");
        tableBody.empty();  // Xóa dữ liệu cũ

        // Lặp qua danh sách người dùng và tạo các dòng trong bảng
        users.forEach(user => {
            const userRow = `<tr>
                <th scope="row">${user.id}</th>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td><span class="badge ${user.isLocked ? 'badge-danger' : 'badge-success'}">${user.isLocked ? 'Đã khóa' : 'Đang hoạt động'}</span></td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit-user" data-user-id="${user.id}">Sửa</a>
                    <button class="btn btn-danger btn-sm lock-user" data-user-id="${user.id}">Khóa</button>
                </td>
            </tr>`;
            tableBody.append(userRow);
        });
    }

    // Khởi tạo dữ liệu mẫu (chỉ chạy lần đầu tiên nếu chưa có dữ liệu)
    if (users.length === 0) {
        users = [
            { id: 1, name: 'Admin User', email: 'admin@domain.com', role: 'Admin', isLocked: false },
            { id: 2, name: 'Editor User', email: 'editor@domain.com', role: 'Editor', isLocked: true }
        ];
        localStorage.setItem('users', JSON.stringify(users));
    }
});
