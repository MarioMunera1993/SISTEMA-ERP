import React, { useState, useEffect } from 'react';
import printerService from '../../services/printerService';
import { UPLOADS_URL } from '../../config/apiConfig';

const PrinterMaintenances = () => {
    const [printers, setPrinters] = useState([]);
    const [maintenances, setMaintenances] = useState([]);
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [historySearchTerm, setHistorySearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        maintenanceDate: new Date().toISOString().split('T')[0],
        observations: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        loadPrinters();
        loadAllMaintenances();
    }, []);

    const loadPrinters = async () => {
        const res = await printerService.getPrinters();
        setPrinters(res.data);
    };

    const loadAllMaintenances = async () => {
        setLoading(true);
        const res = await maintenanceService.getPrinterMaintenances();
        setMaintenances(res.data);
        setLoading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!selectedPrinter) return alert("Haga clic en una impresora para seleccionarla.");

        try {
            const maintenanceData = {
                ...formData,
                printer: { id: selectedPrinter.id }
            };
            await maintenanceService.savePrinterMaintenance(maintenanceData, selectedFile);
            setFormData({ maintenanceDate: new Date().toISOString().split('T')[0], observations: '' });
            setSelectedFile(null);
            setSelectedPrinter(null);
            loadAllMaintenances();
            alert("Mantenimiento guardado con éxito.");
        } catch (error) {
            console.error(error);
            alert("Error al guardar mantenimiento.");
        }
    };

    const filteredPrinters = printers.filter(p =>
        p.printerNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredMaintenances = maintenances.filter(m => {
        const query = historySearchTerm.toLowerCase();
        return (
            m.printer?.printerNumber?.toLowerCase().includes(query) ||
            m.printer?.brand?.toLowerCase().includes(query) ||
            m.observations?.toLowerCase().includes(query) ||
            m.maintenanceDate?.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-6 animate-fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-800">Mantenimientos de Impresoras</h1>
                <p className="text-gray-500 font-medium">Historial técnico de equipos de impresión.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Panel de Registro */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                        <h3 className="text-xl font-bold text-gray-800 mb-6">🖨️ Registrar Mantenimiento</h3>

                        <div className="mb-4">
                            <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">1. Buscar Impresora</label>
                            <input
                                type="text" placeholder="🔍 No. Interno o Marca..."
                                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none font-semibold text-sm"
                                value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {searchTerm && (
                            <div className="max-h-48 overflow-y-auto mb-6 space-y-2 pr-2">
                                {filteredPrinters.map(p => (
                                    <button
                                        key={p.id}
                                        onClick={() => setSelectedPrinter(p)}
                                        className={`w-full p-2 text-left rounded-xl border transition-all text-xs font-bold uppercase ${selectedPrinter?.id === p.id ? 'bg-orange-600 text-white border-orange-600 shadow-lg shadow-orange-200' : 'bg-white border-gray-100 hover:bg-gray-50 text-gray-700'}`}
                                    >
                                        <div className="flex justify-between">
                                            <span>#{p.printerNumber}</span>
                                            <span>{p.brand}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}

                        {selectedPrinter && (
                            <div className="bg-orange-50 border border-orange-100 p-3 rounded-2xl mb-6 flex items-center gap-3 animate-slideDown">
                                <div className="bg-orange-600 text-white p-2 rounded-lg text-xs">✅</div>
                                <div className="text-[10px]">
                                    <span className="font-black text-orange-700 block uppercase">Equipo Seleccionado</span>
                                    <span className="text-orange-600 font-bold">{selectedPrinter.brand} {selectedPrinter.model} (S/N: {selectedPrinter.serialNumber})</span>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 mb-1 block">2. Detalles</label>
                                <input
                                    type="date" required
                                    className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none text-sm font-semibold"
                                    value={formData.maintenanceDate}
                                    onChange={(e) => setFormData({ ...formData, maintenanceDate: e.target.value })}
                                />
                            </div>
                            <textarea
                                placeholder="Observaciones técnicas..." required
                                className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:ring-2 focus:ring-orange-500 outline-none text-sm font-semibold min-h-[100px]"
                                value={formData.observations}
                                onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                            ></textarea>

                            <div className="bg-orange-50/50 p-4 rounded-2xl border-2 border-dashed border-orange-100">
                                <label className="text-[9px] font-black text-orange-400 uppercase mb-2 block tracking-widest text-center">Adjuntar Evidencia (PDF/IMG)</label>
                                <input
                                    type="file" accept=".pdf,image/*"
                                    onChange={(e) => setSelectedFile(e.target.files[0])}
                                    className="text-[10px] text-gray-400 font-bold file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-black file:bg-orange-600 file:text-white hover:file:bg-orange-700"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedPrinter}
                                className="w-full bg-orange-600 text-white p-4 rounded-2xl font-black shadow-lg shadow-orange-200 hover:bg-orange-700 disabled:bg-gray-200 disabled:shadow-none transition-all uppercase tracking-wide flex items-center justify-center gap-2"
                            >
                                💾 GUARDAR MANTENIMIENTO
                            </button>
                        </form>
                    </div>
                </div>

                {/* Historial */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[500px]">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                            <h3 className="text-xl font-bold text-gray-800">📋 Historial Reciente</h3>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <input
                                    type="text"
                                    placeholder="🔍 Buscar en historial..."
                                    className="p-2 text-xs rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 w-full md:w-64 bg-white font-semibold"
                                    value={historySearchTerm}
                                    onChange={(e) => setHistorySearchTerm(e.target.value)}
                                />
                                <span className="bg-white text-[10px] font-black text-gray-400 px-3 py-1 rounded-full border border-gray-100 whitespace-nowrap">
                                    {filteredMaintenances.length} REGISTROS
                                </span>
                            </div>
                        </div>

                        {loading ? (
                            <div className="p-20 text-center font-bold text-gray-400 italic">Cargando historial técnico...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Fecha</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Equipo</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Observaciones</th>
                                            <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Adjunto</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredMaintenances.map(m => (
                                            <tr key={m.id} className="hover:bg-orange-50/30 transition-colors">
                                                <td className="px-6 py-4 text-xs font-black text-orange-600 uppercase italic">
                                                    {m.maintenanceDate}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="bg-gray-100 text-gray-700 text-[9px] font-black px-2 py-1 rounded-lg uppercase block w-fit mb-1">#{m.printer?.printerNumber}</span>
                                                    <span className="text-[10px] font-bold text-gray-800 block uppercase">{m.printer?.brand} {m.printer?.model}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-[10px] font-medium text-gray-500 max-w-xs line-clamp-2">
                                                        {m.observations}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    {m.attachmentPath ? (
                                                        <a
                                                            href={`${UPLOADS_URL}/${m.attachmentPath}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-lg hover:scale-125 transition-transform inline-block"
                                                            title="Ver Documento"
                                                        >
                                                            📄
                                                        </a>
                                                    ) : (
                                                        <span className="text-[10px] text-gray-300 italic">Sin archivo</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {maintenances.length === 0 && !loading && (
                            <div className="p-20 text-center">
                                <p className="text-gray-400 font-medium italic">No se han registrado mantenimientos aún.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrinterMaintenances;
