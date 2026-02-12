import React from 'react';
import authService from '../../services/authService';
const Dashboard = () => {
    const user = authService.getCurrentUser();
    const handleLogout = () => {
        authService.logout();
        window.location.href = '/login';
    };
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">Bienvenido al Sistema, {user?.username}</h1>
            <p className="mt-4 text-gray-600">Has iniciado sesión como: <span className="font-bold">{user?.role}</span></p>
            <button
                onClick={handleLogout}
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
            >
                Cerrar Sesión
            </button>
        </div>
    );
};
export default Dashboard;