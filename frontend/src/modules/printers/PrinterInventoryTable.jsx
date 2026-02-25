import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import printerService from '../../services/printerService';

const PrinterInventoryTable = () => {
    const [printers, setPrinters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadPrinters();
    }, []);

    const loadPrinters = async () => {
        try {
            const res = await printerService.getPrinters();
            setPrinters(res.data);
        } catch (error) {
            console.error("Error cargando inventario de impresoras:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPrinters = printers.filter(p => {
        const query = searchTerm.toLowerCase();
        return (
            p.brand?.toLowerCase().includes(query) ||
            p.model?.toLowerCase().includes(query) ||
            p.serialNumber?.toLowerCase().includes(query) ||
            p.responsiblePerson?.toLowerCase().includes(query) ||
            p.branch?.name?.toLowerCase().includes(query) ||
            p.consumable?.toLowerCase().includes(query)
        );
    });

    if (loading) return <div className="p-8 text-center font-bold text-gray-500">Cargando inventario de impresoras...</div>;

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <button
                        onClick={() => navigate('/printers')}
                        className="text-orange-600 font-bold flex items-center gap-2 mb-2 hover:underline"
                    >
                        ← Volver a Vista de Tarjetas
                    </button>
                    <h1 className="text-2xl font-black text-gray-800">Inventario Detallado de Impresoras</h1>
                    <p className="text-gray-500 font-medium text-sm">Listado completo de equipos de impresión.</p>
                </div>

                <div className="w-full md:w-72">
                    <input
                        type="text"
                        placeholder="🔍 Buscar impresora..."
                        className="w-full p-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 shadow-sm transition-all"
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
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Marca/Modelo</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Serie</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Sede</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">IP</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Responsable</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400">Consumible</th>
                                <th className="px-4 py-3 text-[10px] font-black uppercase text-gray-400 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredPrinters.map(p => (
                                <tr key={p.id} className="hover:bg-orange-50/30 transition-colors">
                                    <td className="px-4 py-4 font-bold text-gray-800 uppercase text-xs">
                                        {p.brand} {p.model}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-medium text-gray-500 tracking-tighter uppercase whitespace-nowrap">
                                        {p.serialNumber}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-gray-600 uppercase">
                                        {p.branch?.name || "N/A"}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-blue-600 font-mono">
                                        {p.ip || "---"}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-black text-gray-800 uppercase">
                                        {p.responsiblePerson || "---"}
                                    </td>
                                    <td className="px-4 py-4 text-xs font-bold text-orange-600 uppercase">
                                        {p.consumable || "N/A"}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <span className={`text-[10px] font-black px-2 py-1 rounded-full uppercase border ${p.status?.name === 'Activo' || p.status?.name === 'En Uso' ? 'bg-green-100 text-green-700 border-green-200' :
                                            p.status?.name === 'Dañado' || p.status?.name === 'Inactivo' ? 'bg-red-100 text-red-700 border-red-200' :
                                                'bg-gray-100 text-gray-600 border-gray-200'
                                            }`}>
                                            {p.status?.name || "Sin estado"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredPrinters.length === 0 && (
                    <div className="p-20 text-center text-gray-400 font-medium italic">
                        No se encontraron impresoras.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PrinterInventoryTable;
