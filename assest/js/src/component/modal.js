// modal.js
const Modal = () => {
    // Lấy các phần tử
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    const closeBtn = loginModal?.querySelector('.close-btn');

    // Hàm hiển thị modal
    const showModal = () => {
        if (loginModal) {
            loginModal.style.display = 'block';
            document.body.classList.add('modal-open');
        }
    };

    // Hàm đóng modal
    const hideModal = () => {
        if (loginModal) {
            loginModal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    };

    // Khởi tạo sự kiện
    const init = () => {
        if (!loginButton || !loginModal || !closeBtn) return;

        // Gắn sự kiện mở modal
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Ngăn hành động mặc định nếu cần
            showModal();
        });

        // Gắn sự kiện đóng modal
        closeBtn.addEventListener('click', hideModal);

        // Đóng modal khi nhấp ra ngoài
        window.addEventListener('click', (event) => {
            if (event.target === loginModal) {
                hideModal();
            }
        });
    };

    return { init, showModal, hideModal };
};

// Export module để sử dụng trong index.js
export default Modal;