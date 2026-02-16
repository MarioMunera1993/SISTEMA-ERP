import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/storage`;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getStorage = () => axios.get(API_URL, { headers: authHeader() });
const saveStorage = (storageData) => axios.post(API_URL, storageData, { headers: authHeader() });
const deleteStorage = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
    getStorage,
    saveStorage,
    deleteStorage
};
