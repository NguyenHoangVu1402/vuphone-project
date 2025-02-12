// 🛑 Chặn chuột phải
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
    Swal.fire({
        icon: "warning",
        title: "Cảnh báo!",
        text: "Bạn không thể sử dụng chuột phải!",
        confirmButtonText: "OK"
    });
});

// 🛑 Chặn phím F12, Ctrl+Shift+I, Ctrl+U
document.addEventListener("keydown", function(event) {
    if (event.keyCode === 123 || 
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) || 
        (event.ctrlKey && event.keyCode === 85)) {
        event.preventDefault();
        Swal.fire({
            icon: "warning",
            title: "Cảnh báo!",
            text: "Bạn không được phép sử dụng chức năng này!",
            confirmButtonText: "OK"
        });
    }
});

// 🛑 Phát hiện mở DevTools (bằng cách thay đổi kích thước cửa sổ)
function detectDevTools() {
    if (window.outerWidth - window.innerWidth > 160 || window.outerHeight - window.innerHeight > 160) {
        Swal.fire({
            icon: "error",
            title: "Phát hiện DevTools!",
            text: "Vui lòng đóng DevTools để tiếp tục.",
            confirmButtonText: "OK"
        });
    }
}

// Kiểm tra khi resize cửa sổ (phát hiện DevTools mở)
window.onresize = detectDevTools;

// 🛑 Chặn ngay khi mở DevTools bằng `debugger`
setInterval(function() {
    let before = new Date().getTime();
    debugger;
    let after = new Date().getTime();
    if (after - before > 100) {
        Swal.fire({
            icon: "error",
            title: "Phát hiện DevTools!",
            text: "Vui lòng đóng DevTools để tiếp tục.",
            confirmButtonText: "OK"
        });
    }
}, 1000);