function initDropdowns() {
    const dropdownToggles = document.querySelectorAll(".js-dropdown-toggle");

    function closeAllDropdowns() {
        document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
            dropdown.classList.remove("open");
        });
    }

    dropdownToggles.forEach((toggle) => {
        const dropdownMenu = toggle.nextElementSibling;

        toggle.addEventListener("click", function (event) {
            event.stopPropagation(); // Ngăn chặn sự kiện click lan ra ngoài
            closeAllDropdowns(); // Đóng các dropdown khác
            toggle.parentElement.classList.toggle("open"); // Toggle class 'open'
        });
    });

    // Đóng dropdown khi click ra ngoài
    document.addEventListener("click", closeAllDropdowns);
}

// Khởi chạy function khi DOM sẵn sàng
document.addEventListener("DOMContentLoaded", initDropdowns);
