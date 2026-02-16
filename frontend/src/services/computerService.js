import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/computers`;

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getComputers = () => axios.get(API_URL, { headers: authHeader() });
const getComputerById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });
const saveComputer = (computerData) => axios.post(API_URL, computerData, { headers: authHeader() });
const deleteComputer = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });

export default {
    getComputers,
    getComputerById,
    saveComputer,
    deleteComputer
};
