import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api/stats";

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getDashboardStats = () => {
    return axios.get(`${API_BASE_URL}/dashboard`, { headers: authHeader() });
};

const statsService = {
    getDashboardStats
};

export default statsService;
