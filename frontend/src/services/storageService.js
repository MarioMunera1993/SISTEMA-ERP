import axios from 'axios';

const API_URL = 'http://localhost:8080/api/storage';

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
