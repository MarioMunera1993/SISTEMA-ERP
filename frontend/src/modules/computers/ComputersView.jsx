import React, { useState, useEffect } from 'react';
import computerService from '../../services/computerService';
import catalogService from '../../services/catalogService';
import ComputerForm from './components/ComputerForm';
import ComputerCard from './components/ComputerCard';

const ComputersView = () => {
    const [computers, setComputers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedComputer, setSelectedComputer] = useState(null);

    // Estados para los catálogos
    const [types, setTypes] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [branches, setBranches] = useState([]);

    const loadData = async () => {
        try {
            const [computersRes, typesRes, statusesRes, branchesRes] = await Promise.all([
                computerService.getComputers(),
                catalogService.getTypes(),
                catalogService.getStatuses(),
                catalogService.getBranches()
            ]);
            setComputers(computersRes.data);
            setTypes(typesRes.data);
            setStatuses(statusesRes.data);
            setBranches(branchesRes.data);
        } catch (error) {
            console.error("Error cargando datos de computadores:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (computerData) => {
        try {
            await computerService.saveComputer(computerData);
            setIsEditing(false);
            setSelectedComputer(null);
            loadData();
        } catch (error) {
            const errorMsg = error.response?.data || "Error al guardar el computador. Verifique los datos e intente nuevamente.";
            alert(errorMsg);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este computador del inventario? (Borrado lógico)")) {
            try {
                await computerService.deleteComputer(id);
                loadData();
            } catch (error) {
                alert("Error al eliminar");
            }
        }
    };

    const filteredComputers = computers.filter(c => {
        const query = searchTerm.toLowerCase();
        const matchesMain =
            c.brand?.toLowerCase().includes(query) ||
            c.serialNumber?.toLowerCase().includes(query) ||
            c.responsiblePerson?.toLowerCase().includes(query) ||
            c.teamNumber?.toLowerCase().includes(query);

        const matchesRam = c.ramMemories?.some(ram => ram.serialNumber?.toLowerCase().includes(query));
        const matchesStorage = c.storageDevices?.some(s => s.serialNumber?.toLowerCase().includes(query));

        return matchesMain || matchesRam || matchesStorage;
    });

    return (
        <div className="animate-fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-800">Módulo de Computadores</h1>
                <p className="text-gray-500 font-medium">Gestión avanzada de equipos y componentes.</p>
            </header>

            {/* Formulario */}
            <ComputerForm
                onSave={handleSave}
                editingComputer={selectedComputer}
                types={types}
                statuses={statuses}
                branches={branches}
                onCancel={() => { setIsEditing(false); setSelectedComputer(null); }}
            />

            {/* Buscador */}
            <div className="mb-8 max-w-md">
                <input
                    type="text" placeholder="🔍 Buscar por marca, serie, responsable o Nº de equipo..."
                    className="w-full p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Grilla de Tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredComputers.map(c => (
                    <ComputerCard
                        key={c.id}
                        computer={c}
                        types={types}
                        statuses={statuses}
                        branches={branches}
                        onEdit={(computer) => { setSelectedComputer(computer); setIsEditing(true); window.scrollTo(0, 0); }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {filteredComputers.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-medium italic">No se encontraron computadores en el inventario.</p>
                </div>
            )}
        </div>
    );
};

export default ComputersView;
