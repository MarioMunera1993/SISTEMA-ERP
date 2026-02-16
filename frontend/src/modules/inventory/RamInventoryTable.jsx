import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ramService from '../../services/ramService';

const RamInventoryTable = () => {
    const [rams, setRams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadRams();
    }, []);

    const loadRams = async () => {
        try {
            const res = await ramService.getRams();
            setRams(res.data);
        } catch (error) {
            console.error("Error cargando inventario de RAM:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRams = rams.filter(r => {
        const query = searchTerm.toLowerCase();
        return (
            r.brand?.toLowerCase().includes(query) ||
            r.serialNumber?.toLowerCase().includes(query) ||
            r.capacity?.toLowerCase().includes(query) ||
            r.type?.toLowerCase().includes(query) ||
            r.observations?.toLowerCase().includes(query) ||
            r.computerId?.toString().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center font-bold text-gray-500">Cargando inventario de RAM...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <button
                        onClick={() => navigate('/ram')}
                        className="text-blue-600 font-bold flex items-center gap-2 mb-2 hover:underline"
                    >
                        ← Volver a Vista de Tarjetas
                    </button>
                    <h1 className="text-2xl font-black text-gray-800">Inventario Detallado de RAM</h1>
                    <p className="text-gray-500 font-medium text-sm">Listado completo de memorias instaladas y en stock.</p>
                </div>

                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="🔍 Buscar RAM..."
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Marca</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Capacidad</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Tipo</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Velocidad</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Serie</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">PC Asociado</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Observaciones</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredRams.map(r => (
                                <tr key={r.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-gray-800 uppercase text-xs">
                                        {r.brand}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-blue-600">
                                        {r.capacity}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-600">
                                        {r.type}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-purple-600">
                                        {r.speed ? `${r.speed} MHz` : '---'}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-500 tracking-tighter uppercase whitespace-nowrap">
                                        {r.serialNumber}
                                    </td>
                                    <td className="px-4 py-4">
                                        {r.computerId ? (
                                            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2 py-1 rounded-lg">
                                                ID EQUIPO: {r.computerId}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 italic">No asociado</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-[10px] text-gray-500 font-medium max-w-[150px] truncate">
                                        {r.observations || "---"}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${r.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {r.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredRams.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        No se encontraron memorias RAM.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RamInventoryTable;
