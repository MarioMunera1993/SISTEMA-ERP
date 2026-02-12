import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';

const Dashboard = () => {
    const user = authService.getCurrentUser();
    // Simulación de contadores (Luego vendrán de la API)
    const [counts, setCounts] = useState({
        printers: 0,
        computers: 0,
        phones: 0
    });

    return (
        <div className="animate-fadeIn">
            <header className="mb-10">
                <h1 className="text-3xl font-black text-gray-800">
                    Hola de nuevo, <span className="text-blue-600">{user?.username}</span> 👋
                </h1>
                <p className="text-gray-500 mt-2 font-medium">
                    Aquí tienes el resumen actualizado de tu inventario.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card Impresoras */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-blue-50 p-3 rounded-xl text-blue-600 text-2xl">🖨️</div>
                        <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">+2 este mes</span>
                    </div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Impresoras</p>
                    <p className="text-5xl font-black text-gray-800 mt-2">{counts.printers}</p>
                    <div className="mt-6 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Equipos activos</span>
                        <a href="/printers" className="text-blue-600 font-bold hover:underline">Ver todas →</a>
                    </div>
                </div>

                {/* Card Computadores */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 text-2xl">💻</div>
                        <span className="text-xs font-bold text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Actualizado hoy</span>
                    </div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Computadores</p>
                    <p className="text-5xl font-black text-gray-800 mt-2">{counts.computers}</p>
                    <div className="mt-6 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Estaciones de trabajo</span>
                        <a href="/computers" className="text-indigo-600 font-bold hover:underline">Gestionar →</a>
                    </div>
                </div>

                {/* Card Teléfonos */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div className="bg-purple-50 p-3 rounded-xl text-purple-600 text-2xl">📱</div>
                        <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full">Sin cambios</span>
                    </div>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Teléfonos IP</p>
                    <p className="text-5xl font-black text-gray-800 mt-2">{counts.phones}</p>
                    <div className="mt-6 flex justify-between items-center text-sm">
                        <span className="text-gray-500">Líneas registradas</span>
                        <a href="/phones" className="text-purple-600 font-bold hover:underline">Revisar →</a>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-blue-600 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-200">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Bienvenido a la nueva interfaz ERP</h3>
                    <p className="text-blue-100 max-w-xl">Hemos reorganizado el sistema para que sea más intuitivo y rápido. Todas las funciones están ahora en el menú lateral izquierdo.</p>
                </div>
                <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-black hover:bg-blue-50 transition-colors whitespace-nowrap">
                    CONOCE LAS NOVEDADES
                </button>
            </div>
        </div>
    );
};

export default Dashboard;