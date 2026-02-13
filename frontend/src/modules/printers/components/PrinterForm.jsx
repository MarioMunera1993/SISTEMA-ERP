import React, { useState, useEffect } from 'react';

const PrinterForm = ({ onSave, editingPrinter, onCancel, types, statuses, branches }) => {
    const initialFormState = {
        brand: '',
        model: '',
        serialNumber: '',
        printerNumber: '',
        ip: '',
        responsiblePerson: '',
        isColor: false,
        typeId: '',
        statusId: '',
        branchId: '',
        purchaseDate: '',
        consumable: ''
    };

    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingPrinter) {
            setFormData(editingPrinter);
        } else {
            setFormData(initialFormState);
        }
    }, [editingPrinter]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSave(formData);
        // Solo reseteamos si no estábamos editando (para permitir crear otra nueva)
        if (!editingPrinter) {
            setFormData(initialFormState);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingPrinter ? '📝 Editar Impresora' : '✨ Nueva Impresora'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <input
                    type="text" placeholder="Marca" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Modelo" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Número de Serie" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Consumible (Tóner/Tinta)"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    value={formData.consumable}
                    onChange={(e) => setFormData({ ...formData, consumable: e.target.value.toUpperCase() })}
                />
                <input
                    type="text" placeholder="Número Interno" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.printerNumber} onChange={(e) => setFormData({ ...formData, printerNumber: e.target.value })}
                />

                {/* SELECTS DE CATÁLOGOS */}
                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.typeId} onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Tipo...</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.statusId} onChange={(e) => setFormData({ ...formData, statusId: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Estado...</option>
                    {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    value={formData.branchId} onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Sede...</option>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>

                <input
                    type="text" placeholder="Persona Encargada"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.responsiblePerson} onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                />

                <input
                    type="text" placeholder="IP del Equipo"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.ip} onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                />

                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-gray-400 uppercase ml-2 mb-1">Fecha de Compra</label>
                    <input
                        type="date"
                        className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500"
                        value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    />
                </div>

                <label className="flex items-center gap-2 p-3 mt-4 lg:mt-0 cursor-pointer">
                    <input
                        type="checkbox" className="w-5 h-5 accent-blue-600"
                        checked={formData.isColor} onChange={(e) => setFormData({ ...formData, isColor: e.target.checked })}
                    />
                    <span className="text-gray-600 font-medium">¿Es a Color?</span>
                </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                {editingPrinter && (
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all">
                    {editingPrinter ? 'Confirmar Actualización' : 'Guardar en Inventario'}
                </button>
            </div>
        </form>
    );
};

export default PrinterForm;
