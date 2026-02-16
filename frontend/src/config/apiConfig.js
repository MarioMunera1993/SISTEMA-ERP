// Detectar automáticamente la IP del servidor
const getApiBaseUrl = () => {
    // Si estamos en desarrollo (Vite), podemos usar localhost o la IP
    // Si estamos en producción (JAR), window.location.host ya tiene la IP:8080 del servidor
    const host = window.location.host;
    return `http://${host}/api`;
};

const API_BASE_URL = getApiBaseUrl();

export default API_BASE_URL;
