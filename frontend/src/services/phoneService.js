import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/phones`;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getPhones = () => axios.get(API_URL, { headers: authHeader() });
const getPhoneById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });
const savePhone = (phoneData) => {
    if (phoneData.id) {
        return axios.put(`${API_URL}/${phoneData.id}`, phoneData, { headers: authHeader() });
    }
    return axios.post(API_URL, phoneData, { headers: authHeader() });
};
const deletePhone = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
    getPhones,
    getPhoneById,
    savePhone,
    deletePhone
};
