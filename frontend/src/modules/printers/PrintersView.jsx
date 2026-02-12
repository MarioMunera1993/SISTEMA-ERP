import React, { useState, useEffect } from 'react';
import printerService from '../../services/printerService';
import catalogService from '../../services/catalogService'; // 👈 Importamos el nuevo servicio
import PrinterForm from './components/PrinterForm';
import PrinterCard from './components/PrinterCard';

const PrintersView = () => {
    const [printers, setPrinters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPrinter, setSelectedPrinter] = useState(null);

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
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (printerData) => {
        try {
            if (isEditing) {
                await printerService.updatePrinter(printerData.id, printerData);
            } else {
                await printerService.createPrinter(printerData);
            }
            setIsEditing(false);
            setSelectedPrinter(null);
            loadData();
        } catch (error) {
            alert(error.response?.data || "Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este equipo?")) {
            await printerService.deletePrinter(id);
            loadData();
        }
    };

    const filteredPrinters = printers.filter(p =>
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.responsiblePerson?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-800">Módulo de Impresoras</h1>
                <p className="text-gray-500 font-medium">Gestión profesional de inventario.</p>
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
                    <p className="text-gray-400 font-medium italic">No se encontraron equipos en el inventario.</p>
                </div>
            )}
        </div>
    );
};

export default PrintersView;