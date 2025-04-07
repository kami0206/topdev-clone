function BaseAPI() {
    let baseUrl;
    let baseHeaders;

    function init({ url, headers = { "Content-Type": "application/json" }, isUseFilter = false }) {
        baseUrl = url; // Đảm bảo baseUrl là chuỗi
        baseHeaders = headers;
        return {
            get,
            post
        };
    }

    async function request(endpoint, method, bodyData = null, headers = {}) {
        try {
            const options = {
                method,
                headers: {
                    ...baseHeaders,
                    ...headers
                }
            };

            if (bodyData) {
                options.body = JSON.stringify(bodyData);
            }

            // Kiểm tra và đảm bảo baseUrl không bị hỏng
            if (!baseUrl || typeof baseUrl !== 'string') {
                throw new Error('Base URL is not properly set or is not a string');
            }

            const response = await fetch(baseUrl + endpoint, options);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            console.error('API Request Error:', err.message);
            throw err;
        }
    }

    function get(endpoint) {
        return request(endpoint, 'GET');
    }

    function post(endpoint, bodyData, headers) {
        return request(endpoint, 'POST', bodyData, headers);
    }

    return { init };
}

export default BaseAPI;