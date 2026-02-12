import axios from 'axios';

const API_URL = 'http://localhost:8080/api/printers';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

const getPrinters = () => axios.get(API_URL, { headers: authHeader() });
const getPrinterById = (id) => axios.get(`${API_URL}/${id}`, { headers: authHeader() });
const createPrinter = (printerData) => axios.post(API_URL, printerData, { headers: authHeader() });
const deletePrinter = (id) => axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
const updatePrinter = (id, printerData) => axios.post(API_URL, { ...printerData, id }, { headers: authHeader() });

export default {
    getPrinters,
    getPrinterById,
    createPrinter,
    deletePrinter,
    updatePrinter
};