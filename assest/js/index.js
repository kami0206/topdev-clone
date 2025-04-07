import Dropdown from './src/component/dropdown.js';
import Modal from './src/component/modal.js';
import { createCardElem, createSkeletonCard, createBlogElem, createSkeletonBlogElem } from './create.js';
import BaseAPI from './src/api/api.js';
import { MOCK_API_URL } from './src/config/env.js';

// Khởi tạo instance API
const instance = new BaseAPI().init({
    url: MOCK_API_URL,
    headers: { "Content-Type": "application/json" },
    isUseFilter: true,
});


// Hàm tải các mục skeleton (placeholder) khi chờ dữ liệu
function loadSkeletonItems(elem, count, createSkeletonFunction, className = 'default-class') {
    elem.innerHTML = '';
    for (let i = 0; i < count; i++) {
        let skeletonElement = createSkeletonFunction();
        skeletonElement.classList.add(className);
        elem.appendChild(skeletonElement);
    }
}

// Hàm tải các mục thực tế từ dữ liệu
function loadItems(elem, itemList, createItemFunction, className = 'default-class') {
    elem.innerHTML = '';
    for (let i = 0; i < itemList.length; i++) {
        let itemElement = createItemFunction(itemList[i]);
        itemElement.classList.add(className);
        elem.appendChild(itemElement);
    }
}

async function getJobs(location = 'all', btnElem = null) {
    const featuredJobList = document.querySelector('#featured-job-list');
    loadSkeletonItems(featuredJobList, 8, createSkeletonCard, 'col');

    try {
        const response = await instance.get('jobs');
        console.log('API Response:', response); // Kiểm tra toàn bộ dữ liệu
        if (!response || response.length === 0) {
            console.error('No jobs found or failed to load jobs');
            return;
        }

        // Lọc dữ liệu dựa trên location
        let filteredJobs = response;
        if (location !== 'all') {
            filteredJobs = response.filter(job => {
                console.log('Job Location:', job.location, 'Filtering for:', location); // Debug từng job
                return job.location?.slug === location; // Hoặc thử job.location?.toLowerCase() === location
            });
        }

        console.log('Filtered Jobs:', filteredJobs); // Kiểm tra kết quả lọc

        const buttonNavs = document.querySelector('#featured-job-list-navs');
        const activeButton = buttonNavs.querySelector('button.active');
        if (activeButton) {
            activeButton.classList.remove('active');
        }

        if (!btnElem) {
            btnElem = buttonNavs.querySelector('button');
        }

        btnElem.classList.add('active');
        loadItems(featuredJobList, filteredJobs, createCardElem, 'col');
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
}

// Hàm lấy danh sách việc làm hot
async function getHotJobs() {
    const owlCarouselHotJob = document.querySelector('.js-owl-carousel-hot-job');
    loadSkeletonItems(owlCarouselHotJob, 4, createSkeletonCard);

    try {
        $('.js-owl-carousel-hot-job').owlCarousel({
            loop: true,
            margin: 32,
            autoWidth: true,
            center: true,
            items: 1,
            dots: false,
            nav: true,
        });

        const response = await instance.get('jobs');
        $('.js-owl-carousel-hot-job').owlCarousel('destroy');
        loadItems(owlCarouselHotJob, response, createCardElem);
        $('.js-owl-carousel-hot-job').owlCarousel({
            loop: true,
            margin: 32,
            autoWidth: true,
            center: true,
            items: 1,
            dots: false,
            nav: true,
        });
    } catch (error) {
        console.error('Error fetching hot jobs:', error);
    }
}

// Hàm lấy danh sách blog
async function getBlogs() {
    const owlCarouselBlog = document.querySelector('.js-owl-carousel-blog');
    loadSkeletonItems(owlCarouselBlog, 4, createSkeletonBlogElem);

    try {
        $('.js-owl-carousel-blog').owlCarousel({
            margin: 16,
            nav: true,
            dots: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 },
            },
        });

        const response = await instance.get('blogs');
        $('.js-owl-carousel-blog').owlCarousel('destroy');
        loadItems(owlCarouselBlog, response, createBlogElem);
        $('.js-owl-carousel-blog').owlCarousel({
            margin: 16,
            nav: true,
            dots: true,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 },
            },
        });
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
}
$('.js-owl-carousel-brand').owlCarousel({
    loop: true,
    margin: 32,
    autoWidth: true,
    nav: false,
    dots: false,
});
$('.js-owl-carousel-featured-companies').owlCarousel({
    loop: true,
    margin: 32,
    autoWidth: true,
    nav: false,
    dots: false,
});
$('.js-owl-carousel-card-job-dots').owlCarousel({
    loop: true,
    margin: 32,
    autoWidth: true,
    center: true,
    items: 1,
    dots: true,
});
window.handleClickSearchBtn = function () {
    const searchInput = document.querySelector('#js-job-search-input');
    const searchValue = searchInput?.value?.trim();

    const selectLocation = document.querySelector('#js-select-location');
    const selectLocationValue = selectLocation?.value?.trim();

    if (!searchValue && !selectLocationValue) {
        alert('Vui lòng nhập từ khóa hoặc chọn vị trí để tìm kiếm!');
        return;
    }

    const searchResultElem = document.querySelector('#js-search-jobs-result');
    const resultListElem = document.querySelector('#js-search-result-list');

    if (!searchResultElem || !resultListElem) {
        console.error('Không tìm thấy phần tử #js-search-jobs-result hoặc #js-search-result-list');
        return;
    }

    searchResultElem.classList.remove('d-none');
    loadSkeletonItems(resultListElem, 8, createSkeletonCard, 'col');

    instance.get('jobs')
        .then((response) => {
            let filteredResults = response || [];

            // Lọc kết hợp từ khóa và vị trí
            filteredResults = filteredResults.filter(job => {
                const matchesSearch = !searchValue || (
                    job.title?.toLowerCase().includes(searchValue.toLowerCase()) ||
                    job.description?.toLowerCase().includes(searchValue.toLowerCase())
                );

                const matchesLocation = !selectLocationValue || selectLocationValue === 'all' || 
                    job.location?.slug === selectLocationValue;

                return matchesSearch && matchesLocation;
            });

            if (filteredResults.length === 0) {
                resultListElem.innerHTML = '<p class="text-start">Không tìm thấy kết quả phù hợp</p>';
            } else {
                loadItems(resultListElem, filteredResults, createCardElem, 'col');
            }
        })
        .catch(error => {
            console.error('Error fetching jobs:', error);
            resultListElem.innerHTML = '<p class="text-start">Có lỗi xảy ra khi tải dữ liệu</p>';
        });
};
function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}
const searchResultElem = document.querySelector('#js-search-jobs-result');
const resultListElem = document.querySelector('#js-search-result-list');
const selectLocationElem = document.querySelector('#js-select-location');
const searchInput = document.querySelector('#js-job-search-input');
const searchBtn = document.querySelector('#js-btn-search');
const loading = searchBtn ? searchBtn.querySelector('#loading') : null;

async function handleSearch() {
    const keyword = searchInput.value.trim();
    const selectedLocation = selectLocationElem.value;

    if (!keyword && selectedLocation === 'all') {
        searchResultElem.classList.add('d-none');
        return;
    }

    searchResultElem.classList.remove('d-none');
    loadSkeletonItems(resultListElem, 8, createSkeletonCard, 'col');

    searchBtn.disabled = true;
    loading.classList.remove('d-none');

    try {
        const response = await instance.get('jobs'); // Lấy tất cả dữ liệu từ API
        let filteredResults = response || [];

        filteredResults = filteredResults.filter(job => {
            const matchesSearch = !keyword || (
                job.title?.toLowerCase().includes(keyword.toLowerCase()) ||
                job.description?.toLowerCase().includes(keyword.toLowerCase())
            );

            const matchesLocation = !selectedLocation || selectedLocation === 'all' || 
                job.location?.slug === selectedLocation;

            return matchesSearch && matchesLocation;
        });

        if (filteredResults.length === 0) {
            resultListElem.innerHTML = '<p class="text-start">Không tìm thấy kết quả phù hợp</p>';
        } else {
            loadItems(resultListElem, filteredResults, createCardElem, 'col');
        }
    } catch (error) {
        console.error('Error fetching jobs:', error);
        resultListElem.innerHTML = '<p class="text-start">Có lỗi xảy ra khi tải dữ liệu</p>';
    }

    searchBtn.disabled = false;
    loading.classList.add('d-none');
}

const handleLogin = async (email, password) => {
    try {
        // Gọi API từ MockAPI để lấy danh sách users
        const users = await instance.get('users');
        console.log('Users from API:', users);

        // Kiểm tra thông tin đăng nhập
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // Đăng nhập thành công
            console.log('Login successful:', user);
            modal.hideModal(); // Đóng modal
            showProfile(user); // Hiển thị dropdown profile
        } else {
            // Đăng nhập thất bại
            alert('Email hoặc mật khẩu không đúng!');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại!');
    }
};

// Hàm hiển thị dropdown profile sau khi đăng nhập thành công
const showProfile = (user) => {
    const loginButton = document.getElementById('loginButton');
    const profileDropdown = document.getElementById('profileDropdown');
    const profileName = document.querySelector('.js-profile-name');
    const profileAvatar = document.querySelector('.js-profile-avatar');

    loginButton.style.display = 'none'; // Ẩn nút đăng nhập
    profileDropdown.style.display = 'block'; // Hiển thị dropdown
    profileName.textContent = user.name || 'User'; // Hiển thị tên người dùng
    profileAvatar.src = user.avatar || 'assest/img/default-avatar.png'; // Hiển thị avatar
};

const modal = Modal();
// Xử lý sự kiện form đăng nhập
const setupLoginForm = () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Ngăn form submit mặc định
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Vui lòng nhập đầy đủ email và mật khẩu!');
                return;
            }

            await handleLogin(email, password);
        });
    }
};
function logout() {
    const loginButton = document.getElementById('loginButton');
    const profileDropdown = document.getElementById('profileDropdown');

    profileDropdown.style.display = 'none';
    loginButton.style.display = 'block';
}

// Gắn sự kiện cho input tìm kiếm và thay đổi vị trí

// Gắn các hàm vào window để có thể gọi từ sự kiện toàn cục
window.getJobs = getJobs;
window.getHotJobs = getHotJobs;
window.getBlogs = getBlogs;
window.logout = logout;
// Gọi các hàm khi trang load
document.addEventListener('DOMContentLoaded', () => {
    modal.init(); // Khởi tạo modal
    setupLoginForm()
    getJobs('all'); 
    getHotJobs(); 
    getBlogs();
    Dropdown({
        dropdownClass: 'js-dropdown-profile',
    }).init();
    searchInput.addEventListener('input', debounce(handleSearch, 500));
    selectLocationElem.addEventListener('change', debounce(handleSearch, 500));
    
});