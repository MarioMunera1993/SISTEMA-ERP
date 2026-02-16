import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

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
const deletePrinterMaintenance = (id) => axios.delete(`${API_BASE_URL}/printer-maintenances/${id}`, { headers: authHeader() });

export default {
    getComputerMaintenances,
    getMaintenancesByComputer,
    saveComputerMaintenance,
    deleteComputerMaintenance,
    getPrinterMaintenances,
    getMaintenancesByPrinter,
    savePrinterMaintenance,
    deletePrinterMaintenance
};
