import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import computerService from '../../services/computerService';

const ComputerInventoryTable = () => {
    const [computers, setComputers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadComputers();
    }, []);

    const loadComputers = async () => {
        try {
            const res = await computerService.getComputers();
            setComputers(res.data);
        } catch (error) {
            console.error("Error cargando inventario:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredComputers = computers.filter(c => {
        const query = searchTerm.toLowerCase();
        return (
            c.brand?.toLowerCase().includes(query) ||
            c.model?.toLowerCase().includes(query) ||
            c.serialNumber?.toLowerCase().includes(query) ||
            c.teamNumber?.toLowerCase().includes(query) ||
            c.responsiblePerson?.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center font-bold text-gray-500">Cargando inventario detallado...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <button
                        onClick={() => navigate('/computers')}
                        className="text-blue-600 font-bold flex items-center gap-2 mb-2 hover:underline"
                    >
                        ← Volver a Vista de Tarjetas
                    </button>
                    <h1 className="text-2xl font-black text-gray-800">Inventario Detallado de Equipos</h1>
                    <p className="text-gray-500 font-medium text-sm">Listado completo con especificaciones de hardware.</p>
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
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Equipo #</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Marca/Modelo</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Serie</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Procesador</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">S.O.</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Memorias RAM</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Discos Duros</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Sede</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Responsable</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredComputers.map(c => (
                                <tr key={c.id} className="hover:bg-blue-50/30 transition-colors">
                                    <td className="px-4 py-4">
                                        <span className="bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded-lg">
                                            {c.teamNumber}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 font-bold text-gray-800 uppercase text-xs">
                                        {c.brand} {c.model}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-500 tracking-tighter uppercase whitespace-nowrap">
                                        {c.serialNumber}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-blue-600 whitespace-nowrap">
                                        {c.processor}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-purple-600 whitespace-nowrap uppercase">
                                        {c.operatingSystem || "---"}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col gap-1 min-w-[120px]">
                                            {c.ramMemories?.length > 0 ? c.ramMemories.map(ram => (
                                                <div key={ram.id} className="text-[10px] leading-tight border-l-2 border-blue-200 pl-1.5 py-0.5">
                                                    <span className="font-black text-gray-700">{ram.capacity} {ram.type} {ram.speed ? `- ${ram.speed}MHz` : ''}</span>
                                                    <div className="text-gray-400 font-medium italic">{ram.brand} - {ram.serialNumber}</div>
                                                </div>
                                            )) : <span className="text-[10px] text-gray-400 italic">Sin RAM</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex flex-col gap-1 min-w-[120px]">
                                            {c.storageDevices?.length > 0 ? c.storageDevices.map(disk => (
                                                <div key={disk.id} className="text-[10px] leading-tight border-l-2 border-purple-200 pl-1.5 py-0.5">
                                                    <span className="font-black text-gray-700">{disk.capacity} {disk.type}</span>
                                                    <div className="text-gray-400 font-medium italic">{disk.brand} - {disk.serialNumber}</div>
                                                    {disk.observations && <div className="text-purple-400 text-[9px] font-bold">Note: {disk.observations}</div>}
                                                </div>
                                            )) : <span className="text-[10px] text-gray-400 italic">Sin disco</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-600 uppercase">
                                        {c.branch?.name || "N/A"}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-gray-800 uppercase">
                                        {c.responsiblePerson || "---"}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${c.status?.name === 'En Uso' ? 'bg-green-100 text-green-700 border-green-200' :
                                            c.status?.name === 'Dañado' ? 'bg-red-100 text-red-700 border-red-200' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {c.status?.name || "Sin estado"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredComputers.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        No se encontraron equipos para mostrar.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComputerInventoryTable;
