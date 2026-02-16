import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const API_URL = `${API_BASE_URL}/users`;
const ROLES_URL = `${API_BASE_URL}/roles`;

// Helper for auth headers
const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: `Bearer ${user.token}` };
    }
    return {};
};

const getUsers = async () => {
    const response = await axios.get(API_URL, { headers: getAuthHeader() });
    return response.data;
};

const getRoles = async () => {
    const response = await axios.get(ROLES_URL, { headers: getAuthHeader() });
    return response.data;
};

const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData, { headers: getAuthHeader() });
    return response.data;
};

const updateUser = async (id, userData) => {
    const response = await axios.put(`${API_URL}/${id}`, userData, { headers: getAuthHeader() });
    return response.data;
};

const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`, { headers: getAuthHeader() });
    return response.data;
};

const userService = {
    getUsers,
    getRoles,
    registerUser,
    updateUser,
    deleteUser
};

export default userService;
