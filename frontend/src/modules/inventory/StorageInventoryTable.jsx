import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storageService from '../../services/storageService';

const StorageInventoryTable = () => {
    const [storage, setStorage] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadStorage();
    }, []);

    const loadStorage = async () => {
        try {
            const res = await storageService.getStorage();
            setStorage(res.data);
        } catch (error) {
            console.error("Error cargando inventario de discos:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredStorage = storage.filter(s => {
        const query = searchTerm.toLowerCase();
        return (
            s.brand?.toLowerCase().includes(query) ||
            s.serialNumber?.toLowerCase().includes(query) ||
            s.capacity?.toLowerCase().includes(query) ||
            s.type?.toLowerCase().includes(query) ||
            s.observations?.toLowerCase().includes(query) ||
            s.computerId?.toString().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center font-bold text-gray-500">Cargando inventario de discos...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <button
                        onClick={() => navigate('/storage')}
                        className="text-purple-600 font-bold flex items-center gap-2 mb-2 hover:underline"
                    >
                        ← Volver a Vista de Tarjetas
                    </button>
                    <h1 className="text-2xl font-black text-gray-800">Inventario Detallado de Discos</h1>
                    <p className="text-gray-500 font-medium text-sm">Listado completo de unidades de almacenamiento.</p>
                </div>

                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="🔍 Buscar disco..."
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-purple-500 shadow-sm transition-all"
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
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Serie</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">PC Asociado</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Observaciones</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredStorage.map(s => (
                                <tr key={s.id} className="hover:bg-purple-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-gray-800 uppercase text-xs">
                                        {s.brand}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-purple-600">
                                        {s.capacity}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-600">
                                        {s.type}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-500 tracking-tighter uppercase whitespace-nowrap">
                                        {s.serialNumber}
                                    </td>
                                    <td className="px-4 py-4">
                                        {s.computerId ? (
                                            <span className="bg-purple-100 text-purple-700 text-[10px] font-black px-2 py-1 rounded-lg">
                                                ID EQUIPO: {s.computerId}
                                            </span>
                                        ) : (
                                            <span className="text-[10px] text-gray-400 italic">No asociado</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4 text-[10px] text-gray-500 font-medium max-w-[150px] truncate">
                                        {s.observations || "---"}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${s.isActive ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {s.isActive ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredStorage.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        No se encontraron unidades de almacenamiento.
                    </div>
                )}
            </div>
        </div>
    );
};

export default StorageInventoryTable;
