import React, { useState, useEffect } from 'react';

const RamForm = ({ onSave, editingRam, onCancel }) => {
    const initialFormState = {
        brand: '',
        capacity: '',
        type: '',
        speed: '',
        serialNumber: '',
        observations: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingRam) {
            setFormData(editingRam);
        } else {
            setFormData(initialFormState);
        }
    }, [editingRam]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        if (!editingRam) setFormData(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingRam ? '🧠 Editar Memoria RAM' : '✨ Nueva Memoria RAM'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <input
                    type="text" placeholder="Marca" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Capacidad (ej: 8GB)" required
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
                    <option value="DDR3">DDR3</option>
                    <option value="DDR3L">DDR3L</option>
                    <option value="DDR4">DDR4</option>
                    <option value="DDR5">DDR5</option>
                </select>
                <input
                    type="text" placeholder="Velocidad (ej: 3200MHz)"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.speed}
                    onChange={(e) => setFormData({ ...formData, speed: e.target.value })}
                />
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
                {editingRam && (
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-wide">
                    {editingRam ? 'Actualizar RAM' : 'Añadir a Bodega'}
                </button>
            </div>
        </form>
    );
};

export default RamForm;
