import React, { useState, useEffect } from 'react';
import ramService from '../../services/ramService';
import RamForm from './components/RamForm';
import RamCard from './components/RamCard';

const RamView = () => {
    const [rams, setRams] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRam, setSelectedRam] = useState(null);

    const loadData = async () => {
        try {
            const res = await ramService.getRams();
            setRams(res.data);
        } catch (error) {
            console.error("Error cargando RAMs:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (ramData) => {
        try {
            await ramService.saveRam(ramData);
            setSelectedRam(null);
            loadData();
        } catch (error) {
            alert(error.response?.data || "Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar esta memoria de bodega?")) {
            await ramService.deleteRam(id);
            loadData();
        }
    };

    const filteredRams = rams.filter(r =>
        r.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.capacity?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fadeIn">
            <header className="mb-8">
                <h1 className="text-3xl font-black text-gray-800 tracking-tight">Inventario de Memorias RAM</h1>
                <p className="text-gray-500 font-medium text-lg">Control de repuestos y componentes instalados.</p>
            </header>

            <RamForm onSave={handleSave} editingRam={selectedRam} onCancel={() => setSelectedRam(null)} />

            <div className="mb-8 max-w-sm">
                <input
                    type="text" placeholder="🔍 Filtrar RAM por marca, serie o capacidad..."
                    className="w-full p-3.5 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-purple-500 outline-none font-semibold"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredRams.map(r => (
                    <RamCard key={r.id} ram={r} onEdit={setSelectedRam} onDelete={handleDelete} />
                ))}
            </div>

            {filteredRams.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 mt-8">
                    <p className="text-gray-400 font-medium italic text-lg">No hay memorias registradas.</p>
                </div>
            )}
        </div>
    );
};

export default RamView;
