import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/ram`;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getRams = () => axios.get(API_URL, { headers: authHeader() });
const saveRam = (ramData) => axios.post(API_URL, ramData, { headers: authHeader() });
const deleteRam = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
    getRams,
    saveRam,
    deleteRam
};
