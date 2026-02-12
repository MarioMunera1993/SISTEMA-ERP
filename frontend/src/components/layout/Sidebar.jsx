import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const menuItems = [
        { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
        { name: 'Impresoras', path: '/printers', icon: '🖨️' },
        { name: 'Computadores', path: '/computers', icon: '💻' },
        { name: 'Teléfonos', path: '/phones', icon: '📱' },
    ];

    return (
        <nav className="bg-slate-800 text-white w-64 min-h-screen p-6 hidden md:block fixed">
            <h2 className="text-2xl font-bold mb-8 text-cyan-400 text-center uppercase tracking-wider">
                Grupo Roldan
            </h2>
            <ul className="space-y-4">
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-blue-600 shadow-lg shadow-blue-900/50'
                                    : 'hover:bg-slate-700 text-gray-400 hover:text-white'
                                }`
                            }
                        >
                            <span className="text-xl">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
