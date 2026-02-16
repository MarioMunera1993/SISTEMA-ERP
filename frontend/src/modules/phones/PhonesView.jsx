import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import phoneService from '../../services/phoneService';
import catalogService from '../../services/catalogService';
import PhoneForm from './components/PhoneForm';
import PhoneCard from './components/PhoneCard';

const PhonesView = () => {
    const navigate = useNavigate();
    const [phones, setPhones] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [selectedPhone, setSelectedPhone] = useState(null);

    const [branches, setBranches] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const loadData = async () => {
        try {
            const [phonesRes, branchesRes, statusesRes] = await Promise.all([
                phoneService.getPhones(),
                catalogService.getBranches(),
                catalogService.getStatuses()
            ]);
            setPhones(phonesRes.data);
            setBranches(branchesRes.data);
            setStatuses(statusesRes.data);
        } catch (error) {
            console.error("Error cargando datos:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSave = async (phoneData) => {
        try {
            await phoneService.savePhone(phoneData);
            setIsEditing(false);
            setSelectedPhone(null);
            loadData();
        } catch (error) {
            alert(error.response?.data || "Error al guardar");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar este teléfono?")) {
            await phoneService.deletePhone(id);
            loadData();
        }
    };

    const filteredPhones = phones.filter(p =>
        p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.model?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.responsiblePerson?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="animate-fadeIn">
            <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-800">Módulo de Teléfonos</h1>
                    <p className="text-gray-500 font-medium">Gestión de extensiones y telefonía IP.</p>
                </div>
                <button
                    onClick={() => navigate('/phones/inventory')}
                    className="bg-blue-600 text-white font-black px-6 py-3 rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-200"
                >
                    📋 VER INVENTARIO DETALLADO
                </button>
            </header>

            <PhoneForm
                onSave={handleSave}
                editingPhone={selectedPhone}
                branches={branches}
                statuses={statuses}
                onCancel={() => { setIsEditing(false); setSelectedPhone(null); }}
            />

            <div className="mb-8 max-w-md">
                <input
                    type="text" placeholder="🔍 Buscar por serie, marca o responsable..."
                    className="w-full p-3 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPhones.map(p => (
                    <PhoneCard
                        key={p.id}
                        phone={p}
                        onEdit={(phone) => { setSelectedPhone(phone); setIsEditing(true); window.scrollTo(0, 0); }}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {filteredPhones.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
                    <p className="text-gray-400 font-medium italic">No se encontraron teléfonos en el inventario.</p>
                </div>
            )}
        </div>
    );
};

export default PhonesView;
