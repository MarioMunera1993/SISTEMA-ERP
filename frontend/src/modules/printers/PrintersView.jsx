import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import printerService from '../../services/printerService';
import catalogService from '../../services/catalogService';
import PrinterForm from './components/PrinterForm';
import PrinterCard from './components/PrinterCard';
import Toast from '../../components/common/Toast';

const PrintersView = () => {
    const navigate = useNavigate();
    const [printers, setPrinters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState(null);
    const [toast, setToast] = useState(null);

    // Estados para los catálogos
    const [types, setTypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [branches, setBranches] = useState([]);

    const loadData = async () => {
        try {
            const [printersRes, typesRes, statusesRes, branchesRes] = await Promise.all([
                printerService.getPrinters(),
                catalogService.getTypes(),
                catalogService.getStatuses(),
                catalogService.getBranches()
            ]);
            setPrinters(printersRes.data);
            setTypes(typesRes.data);
            setStatuses(statusesRes.data);
            setBranches(branchesRes.data);
        } catch (error) {
            console.error("Error cargando datos:", error);
            setToast({ message: "Error cargando datos: " + (error.response?.data || error.message), type: "error" });
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (printerData) => {
        try {
            if (selectedPrinter) {
                await printerService.updatePrinter(selectedPrinter.id, printerData);
                setToast({ message: "Impresora actualizada correctamente", type: "success" });
            } else {
                await printerService.createPrinter(printerData);
                setToast({ message: "Impresora creada correctamente", type: "success" });
            }
            setIsEditing(false);
            setSelectedPrinter(null);
            loadData();
        } catch (error) {
            setToast({ message: error.response?.data || "Error al guardar", type: "error" });
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar esta impresora del inventario?")) {
            try {
                await printerService.deletePrinter(id);
                setToast({ message: "Impresora eliminada", type: "success" });
                loadData();
            } catch (error) {
                setToast({ message: "Error al eliminar: " + (error.response?.data || error.message), type: "error" });
            }
        }
    };

    const filteredPrinters = printers.filter(p =>
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.responsiblePerson?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fadeIn">
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">Módulo de Impresoras</h1>
                    <p className="text-gray-500 font-medium">Gestión profesional de inventario.</p>
                </div>
                <button
                    onClick={() => navigate('/printers/inventory')}
                    className="bg-orange-600 text-white font-black px-6 py-3 rounded-xl hover:bg-orange-700 transition-all flex items-center gap-2 shadow-lg shadow-orange-200"
                >
                    📋 VER INVENTARIO DETALLADO
                </button>
            </header>

            {/* Renderizamos el Formulario */}
            <PrinterForm
                onSave={handleSave}
                editingPrinter={selectedPrinter}
                types={types}
                statuses={statuses}
                branches={branches}
                onCancel={() => { setIsEditing(false); setSelectedPrinter(null); }}
            />

            {/* Buscador */}
            <div className="mb-8 max-w-md">
                <input
                    type="text" placeholder="🔍 Buscar por serie, marca o responsable..."
                    className="w-full p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grilla de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPrinters.map(p => (
                    <PrinterCard
                        key={p.id}
                        printer={p}
                        types={types}
                        statuses={statuses}
                        branches={branches}
                        onEdit={(printer) => { setSelectedPrinter(printer); setIsEditing(true); window.scrollTo(0, 0); }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {filteredPrinters.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-medium italic">No se encontraron impresoras en el inventario.</p>
                </div>
            )}

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        </div>
    );
};

export default PrintersView;