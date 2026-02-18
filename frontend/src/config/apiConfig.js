// Detectar automáticamente la IP del servidor
const getApiBaseUrl = () => {
    // Si estamos en desarrollo (Vite), podemos usar localhost o la IP
    // Si estamos en producción (JAR), window.location.host ya tiene la IP:8080 del servidor
    const hostname = window.location.hostname;
    return `http://${hostname}:8080/api`;
};

const API_BASE_URL = getApiBaseUrl();
const UPLOADS_URL = `http://${window.location.hostname}:8080/uploads`;

export { API_BASE_URL, UPLOADS_URL };
export default API_BASE_URL;
