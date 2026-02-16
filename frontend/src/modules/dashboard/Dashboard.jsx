import React, { useState, useEffect } from 'react';
import authService from '../../services/authService';
import statsService from '../../services/statsService';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    const user = authService.getCurrentUser();
    const [stats, setStats] = useState({
        totalComputers: 0,
        totalPrinters: 0,
        totalPhones: 0,
        recentMaintenances: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const res = await statsService.getDashboardStats();
            setStats(res.data);
        } catch (error) {
            console.error("Error al cargar estadísticas", error);
        } finally {
            setLoading(false);
        }
    };

    const kpis = [
        { title: 'Computadores', count: stats.totalComputers, icon: '💻', color: 'bg-indigo-50 text-indigo-600', link: '/computers', subtitle: 'Estaciones totales' },
        { title: 'Impresoras', count: stats.totalPrinters, icon: '🖨️', color: 'bg-blue-50 text-blue-600', link: '/printers', subtitle: 'Equipos de impresión' },
        { title: 'Teléfonos', count: stats.totalPhones, icon: '📱', color: 'bg-purple-50 text-purple-600', link: '/phones', subtitle: 'Líneas IP activas' },
        { title: 'Mantenimientos', count: stats.recentMaintenances, icon: '🔧', color: 'bg-orange-50 text-orange-600', link: '/maintenances/computers', subtitle: 'Últimos 30 días' },
    ];

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="animate-fadeIn space-y-10">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-gray-800 tracking-tight">
                        Dashboard <span className="text-blue-600">Principal</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1 uppercase text-[10px] tracking-widest">
                        Bienvenido, {user?.username} • Resumen de Inventario Real
                    </p>
                </div>
                <div className="flex gap-2">
                    <span className="bg-green-100 text-green-700 text-[9px] font-black px-3 py-1 rounded-full border border-green-200 uppercase">Sistema Online</span>
                    <span className="bg-blue-100 text-blue-700 text-[9px] font-black px-3 py-1 rounded-full border border-blue-200 uppercase">{new Date().toLocaleDateString()}</span>
                </div>
            </header>

            {/* KPIs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${kpi.color} p-3 rounded-2xl text-2xl group-hover:scale-110 transition-transform`}>
                                {kpi.icon}
                            </div>
                            <NavLink to={kpi.link} className="text-gray-300 hover:text-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </NavLink>
                        </div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{kpi.title}</p>
                        <h3 className="text-4xl font-black text-gray-800 my-1">{kpi.count}</h3>
                        <p className="text-xs font-bold text-gray-400 italic">{kpi.subtitle}</p>
                    </div>
                ))}
            </div>

            {/* Accesos Rápidos & Sugerencias */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-300">
                    <div className="relative z-10">
                        <h2 className="text-3xl font-black mb-4">Gestión Inteligente de Activos</h2>
                        <p className="text-slate-400 font-medium mb-8 max-w-lg">
                            Optimiza el ciclo de vida de tus equipos. No olvides registrar los mantenimientos preventivos para evitar fallos técnicos.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <NavLink to="/maintenances/computers" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-blue-900/40 uppercase tracking-wide">
                                🛠️ Nuevo Mantenimiento
                            </NavLink>
                            <NavLink to="/computers" className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all border border-slate-700 uppercase tracking-wide">
                                📦 Revisar Inventario
                            </NavLink>
                        </div>
                    </div>
                    {/* Elemento Decorativo */}
                    <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
                    <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                        <span className="text-orange-500">⚡</span> Accesos Rápidos
                    </h3>
                    <ul className="space-y-4">
                        {[
                            { name: 'Backup de Info', desc: 'Descargar reporte PDF', icon: '📄', color: 'text-red-500' },
                            { name: 'Historial de Auditoría', desc: 'Ver quién movió qué', icon: '🔍', color: 'text-blue-500' },
                            { name: 'Config de Red', desc: 'IPs y Mac Addresses', icon: '🌐', color: 'text-green-500' },
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                                <div className="text-2xl">{item.icon}</div>
                                <div>
                                    <p className="text-sm font-black text-gray-800 group-hover:text-blue-600 transition-colors">{item.name}</p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{item.desc}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;