$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
      items: 4, // Số lượng item hiển thị
      loop: true, // Lặp lại carousel
      margin: 20, // Khoảng cách giữa các item
      nav: true, // Hiển thị nút điều hướng
      dots: true, // Hiển thị các chấm điều hướng
      autoplay: true, // Tự động chạy
      autoplayTimeout: 3000, // Thời gian giữa các lần chạy (ms)
      responsive: {
        576: {
          items: 1, // Hiển thị 1 item trên màn hình nhỏ
        },
        768: {
          items: 2, // Hiển thị 2 item trên màn hình trung bình
        },
        1024: {
          items: 4, // Hiển thị 3 item trên màn hình lớn
        },
      },
    });
  });