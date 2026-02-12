import axios from 'axios';

const API_URL = 'http://localhost:8080/api/catalogs';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getTypes = () => axios.get(`${API_URL}/types`, { headers: authHeader() });
const getStatuses = () => axios.get(`${API_URL}/statuses`, { headers: authHeader() });
const getBranches = () => axios.get(`${API_URL}/branches`, { headers: authHeader() });

export default {
    getTypes,
    getStatuses,
    getBranches
};
