import axios from 'axios';
import API_BASE_URL from '../config/apiConfig';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
};

// Mantenimientos de Computadores
const getComputerMaintenances = () => axios.get(`${API_BASE_URL}/computer-maintenances`, { headers: authHeader() });
const getMaintenancesByComputer = (computerId) => axios.get(`${API_BASE_URL}/computer-maintenances/computer/${computerId}`, { headers: authHeader() });
const saveComputerMaintenance = (maintenanceData, file) => {
    const formData = new FormData();
    formData.append('maintenance', JSON.stringify(maintenanceData));
    if (file) {
        formData.append('file', file);
    }
    return axios.post(`${API_BASE_URL}/computer-maintenances`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};
const updateComputerMaintenance = (id, maintenanceData, file) => {
    const formData = new FormData();
    formData.append('maintenance', JSON.stringify(maintenanceData));
    if (file) {
        formData.append('file', file);
    }
    return axios.put(`${API_BASE_URL}/computer-maintenances/${id}`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};
const deleteComputerMaintenance = (id) => axios.delete(`${API_BASE_URL}/computer-maintenances/${id}`, { headers: authHeader() });

// Mantenimientos de Impresoras
const getPrinterMaintenances = () => axios.get(`${API_BASE_URL}/printer-maintenances`, { headers: authHeader() });
const getMaintenancesByPrinter = (printerId) => axios.get(`${API_BASE_URL}/printer-maintenances/printer/${printerId}`, { headers: authHeader() });
const savePrinterMaintenance = (maintenanceData, file) => {
    const formData = new FormData();
    formData.append('maintenance', JSON.stringify(maintenanceData));
    if (file) {
        formData.append('file', file);
    }
    return axios.post(`${API_BASE_URL}/printer-maintenances`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};
const updatePrinterMaintenance = (id, maintenanceData, file) => {
    const formData = new FormData();
    formData.append('maintenance', JSON.stringify(maintenanceData));
    if (file) {
        formData.append('file', file);
    }
    return axios.put(`${API_BASE_URL}/printer-maintenances/${id}`, formData, {
        headers: {
            ...authHeader(),
            'Content-Type': 'multipart/form-data'
        }
    });
};
const deletePrinterMaintenance = (id) => axios.delete(`${API_BASE_URL}/printer-maintenances/${id}`, { headers: authHeader() });

export default {
    getComputerMaintenances,
    getMaintenancesByComputer,
    saveComputerMaintenance,
    updateComputerMaintenance,
    deleteComputerMaintenance,
    getPrinterMaintenances,
    getMaintenancesByPrinter,
    savePrinterMaintenance,
    updatePrinterMaintenance,
    deletePrinterMaintenance
};
