import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const STATS_API_URL = `${API_BASE_URL}/stats`;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getDashboardStats = () => {
    return axios.get(`${STATS_API_URL}/dashboard`, { headers: authHeader() });
};

const statsService = {
    getDashboardStats
};

export default statsService;
