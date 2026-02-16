import React, { useState, useEffect } from 'react';

const StorageForm = ({ onSave, editingStorage, onCancel }) => {
    const initialFormState = {
        brand: '',
        capacity: '',
        type: '',
        serialNumber: '',
        observations: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingStorage) {
            setFormData(editingStorage);
        } else {
            setFormData(initialFormState);
        }
    }, [editingStorage]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        if (!editingStorage) setFormData(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingStorage ? '💾 Editar Disco Duro' : '✨ Nuevo Disco Duro'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                    type="text" placeholder="Marca" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Capacidad (ej: 1TB SSD)" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                />
                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                >
                    <option value="">Tipo...</option>
                    <option value="SSD">SSD</option>
                    <option value="HDD">HDD</option>
                    <option value="NVMe">NVMe</option>
                    <option value="M.2 SATA">M.2 SATA</option>
                </select>
                <input
                    type="text" placeholder="Nº de Serie" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value.toUpperCase() })}
                />
            </div>

            <div className="mt-4">
                <textarea
                    placeholder="Observaciones adicionales..."
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold h-24 resize-none"
                    value={formData.observations}
                    onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                />
            </div>

            <div className="flex justify-end gap-3 mt-6">
                {editingStorage && (
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-wide">
                    {editingStorage ? 'Actualizar Disco' : 'Añadir a Bodega'}
                </button>
            </div>
        </form>
    );
};

export default StorageForm;
