import React, { useState, useEffect } from 'react';

const PhoneForm = ({ onSave, editingPhone, onCancel, branches, statuses }) => {
    const initialFormState = {
        brand: '',
        model: '',
        serialNumber: '',
        inventoryTag: '',
        extension: '',
        ipAddress: '',
        responsiblePerson: '',
        purchaseDate: '',
        branchId: '',
        statusId: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingPhone) {
            setFormData({
                ...editingPhone,
                branchId: editingPhone.branch?.id || '',
                statusId: editingPhone.status?.id || ''
            });
        } else {
            setFormData(initialFormState);
        }
    }, [editingPhone]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { branchId, statusId, ...cleanData } = formData;

        const dataToSave = {
            ...cleanData,
            branch: branchId ? { id: parseInt(branchId) } : null,
            status: statusId ? { id: parseInt(statusId) } : null,
            purchaseDate: formData.purchaseDate || null
        };

        await onSave(dataToSave);
        if (!editingPhone) setFormData(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPhone ? '📝 Editar Teléfono' : '✨ Nuevo Teléfono'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="text" placeholder="Marca" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Modelo" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Número de Serie" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Placa / Inventario" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-semibold"
                    value={formData.inventoryTag}
                    onChange={(e) => setFormData({ ...formData, inventoryTag: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Extensión"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.extension}
                    onChange={(e) => setFormData({ ...formData, extension: e.target.value })}
                />
                <input
                    type="text" placeholder="Dirección IP"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.ipAddress}
                    onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                />
                <input
                    type="text" placeholder="Responsable / Usuario" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.responsiblePerson}
                    onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                />
                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 tracking-tighter">Fecha Compra</label>
                    <input
                        type="date"
                        className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    />
                </div>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.branchId}
                    onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Sede...</option>
                    {branches.map(b => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.statusId}
                    onChange={(e) => setFormData({ ...formData, statusId: e.target.value })}
                    required
                >
                    <option value="">Estado...</option>
                    {statuses.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                {editingPhone && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        Cancelar
                    </button>
                )}
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-8 py-2 rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-wide"
                >
                    {editingPhone ? 'Confirmar Actualización' : 'Guardar en Inventario'}
                </button>
            </div>
        </form>
    );
};

export default PhoneForm;
