import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import phoneService from '../../services/phoneService';

const PhoneInventoryTable = () => {
    const [phones, setPhones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPhones();
    }, []);

    const loadPhones = async () => {
        try {
            const res = await phoneService.getPhones();
            setPhones(res.data);
        } catch (error) {
            console.error("Error cargando inventario:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPhones = phones.filter(p => {
        const query = searchTerm.toLowerCase();
        return (
            p.brand?.toLowerCase().includes(query) ||
            p.model?.toLowerCase().includes(query) ||
            p.serialNumber?.toLowerCase().includes(query) ||
            p.responsiblePerson?.toLowerCase().includes(query) ||
            p.inventoryTag?.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center font-bold text-gray-500">Cargando inventario de teléfonos...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <button
                        onClick={() => navigate('/phones')}
                        className="text-blue-600 font-bold flex items-center gap-2 mb-2 hover:underline"
                    >
                        ← Volver a Vista de Tarjetas
                    </button>
                    <h1 className="text-2xl font-black text-gray-800">Inventario Detallado de Teléfonos</h1>
                    <p className="text-gray-500 font-medium text-sm">Listado técnico con auditoría de cambios.</p>
                </div>

                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="🔍 Buscar en la tabla..."
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
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Placa</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Marca/Modelo</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Extensión</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">IP</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Responsable</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Sede</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Modificado Por</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPhones.map(p => (
                                <tr key={p.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-4 py-4 font-black text-blue-600 text-[10px]">
                                        {p.inventoryTag}
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-800 uppercase text-xs">
                                        {p.brand} {p.model}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-gray-700">
                                        {p.extension || '---'}
                                    </td>
                                    <td className="px-4 py-4 text-sm font-black text-blue-600">
                                        {p.ipAddress || '---'}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-800 uppercase">
                                        {p.responsiblePerson}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-500 uppercase">
                                        {p.branch?.name || '---'}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-purple-600 uppercase italic">
                                                {p.modifiedBy || 'System'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${p.status?.name === 'En Uso' ? 'bg-green-100 text-green-700 border-green-200' :
                                            p.status?.name === 'Dañado' ? 'bg-red-100 text-red-700 border-red-200' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {p.status?.name || 'Sin estado'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPhones.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        No se encontraron teléfonos para mostrar.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PhoneInventoryTable;
