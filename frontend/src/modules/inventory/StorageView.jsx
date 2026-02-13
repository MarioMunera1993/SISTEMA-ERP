import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import storageService from '../../services/storageService';
import StorageForm from './components/StorageForm';
import StorageCard from './components/StorageCard';

const StorageView = () => {
    const navigate = useNavigate();
    const [storages, setStorages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStorage, setSelectedStorage] = useState(null);

    const loadData = async () => {
        try {
            const res = await storageService.getStorage();
            setStorages(res.data);
        } catch (error) {
            console.error("Error cargando Discos:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (storageData) => {
        try {
            await storageService.saveStorage(storageData);
            setSelectedStorage(null);
            loadData();
        } catch (error) {
            alert(error.response?.data || "Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Eliminar este disco de bodega?")) {
            await storageService.deleteStorage(id);
            loadData();
        }
    };

    const filteredStorage = storages.filter(s =>
        s.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.capacity?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fadeIn">
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800 tracking-tight leading-tight">Módulo de Unidades de Almacenamiento</h1>
                    <p className="text-gray-500 font-medium text-lg">Control de stock de Discos Duros y SSDs.</p>
                </div>
                <button
                    onClick={() => navigate('/storage/inventory')}
                    className="bg-purple-600 text-white font-black px-6 py-3 rounded-xl hover:bg-purple-700 transition-all flex items-center gap-2 shadow-lg shadow-purple-200"
                >
                    📋 VER INVENTARIO DETALLADO
                </button>
            </header>

            <StorageForm onSave={handleSave} editingStorage={selectedStorage} onCancel={() => setSelectedStorage(null)} />

            <div className="mb-8 max-w-sm">
                <input
                    type="text" placeholder="🔍 Buscar disco por marca, serie o capacidad..."
                    className="w-full p-3.5 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none font-semibold text-gray-700"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredStorage.map(s => (
                    <StorageCard key={s.id} storage={s} onEdit={setSelectedStorage} onDelete={handleDelete} />
                ))}
            </div>

            {filteredStorage.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100 mt-8">
                    <p className="text-gray-400 font-medium italic text-lg">No hay unidades de almacenamiento registradas.</p>
                </div>
            )}
        </div>
    );
};

export default StorageView;
