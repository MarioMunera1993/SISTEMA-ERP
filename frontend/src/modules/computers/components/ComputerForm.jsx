import React, { useState, useEffect } from 'react';
import ramService from '../../../services/ramService';
import storageService from '../../../services/storageService';

const ComputerForm = ({ onSave, editingComputer, onCancel, types, statuses, branches }) => {
    const initialFormState = {
        brand: '',
        model: '',
        serialNumber: '',
        processor: '',
        macLan: '',
        macWifi: '',
        teamNumber: '',
        responsiblePerson: '',
        typeId: '',
        statusId: '',
        branchId: '',
        purchaseDate: '',
        admissionDate: '',
        updateDate: '',
        ramMemories: [],
        storageDevices: []
    };

    const [formData, setFormData] = useState(initialFormState);
    const [availableRams, setAvailableRams] = useState([]);
    const [availableStorages, setAvailableStorages] = useState([]);
    const [ramSearch, setRamSearch] = useState("");
    const [storageSearch, setStorageSearch] = useState("");

    useEffect(() => {
        const loadHardware = async () => {
            const [ramRes, storageRes] = await Promise.all([
                ramService.getRams(),
                storageService.getStorage()
            ]);
            // Mostramos todos para poder ver alertas de ocupados
            setAvailableRams(ramRes.data);
            setAvailableStorages(storageRes.data);
        };
        loadHardware();
    }, [editingComputer]);

    useEffect(() => {
        if (editingComputer) {
            // Mapear IDs para los selectores si el backend devuelve objetos completos
            setFormData({
                ...editingComputer,
                typeId: editingComputer.type?.id || '',
                statusId: editingComputer.status?.id || '',
                branchId: editingComputer.branch?.id || ''
            });
        } else {
            setFormData(initialFormState);
        }
    }, [editingComputer]);

    const formatMAC = (value) => {
        // Eliminar todo lo que no sea hex y poner en mayúsculas
        const cleanValue = value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
        const limitedValue = cleanValue.slice(0, 12);

        // Agrupar de a 2 con ":"
        const matches = limitedValue.match(/.{1,2}/g);
        return matches ? matches.join(':') : limitedValue;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar MACs si se ingresaron
        const macRegex = /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/;
        if (formData.macLan && !macRegex.test(formData.macLan)) {
            alert("⚠️ El formato de MAC LAN es inválido (Ej: 00:00:00:00:00:00)");
            return;
        }
        if (formData.macWifi && !macRegex.test(formData.macWifi)) {
            alert("⚠️ El formato de MAC WIFI es inválido (Ej: 00:00:00:00:00:00)");
            return;
        }

        // Limpiamos los datos para el backend
        const { typeId, statusId, branchId, ramSearch, storageSearch, ...cleanData } = formData;

        const dataToSave = {
            ...cleanData,
            type: typeId ? { id: parseInt(typeId) } : null,
            status: statusId ? { id: parseInt(statusId) } : null,
            branch: branchId ? { id: parseInt(branchId) } : null,
            // Aseguramos nulos para fechas si están vacías
            admissionDate: editingComputer ? (formData.admissionDate || null) : null,
            purchaseDate: formData.purchaseDate || null,
            updateDate: null
        };

        await onSave(dataToSave);
        if (!editingComputer) setFormData(initialFormState);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 animate-slideDown">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {editingComputer ? '📝 Editar Computador' : '✨ Nuevo Computador'}
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
                    type="text" placeholder="Procesador (ej: Core i7 12th)" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.processor} onChange={(e) => setFormData({ ...formData, processor: e.target.value })}
                />

                <input
                    type="text" placeholder="MAC LAN (00:00:00:00:00:00)"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono text-base font-bold bg-blue-50/30"
                    value={formData.macLan} onChange={(e) => setFormData({ ...formData, macLan: formatMAC(e.target.value) })}
                    maxLength={17}
                />
                <input
                    type="text" placeholder="MAC WIFI (00:00:00:00:00:00)"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono text-base font-bold bg-blue-50/30"
                    value={formData.macWifi} onChange={(e) => setFormData({ ...formData, macWifi: formatMAC(e.target.value) })}
                    maxLength={17}
                />
                <input
                    type="text" placeholder="Número de Equipo (Interno)" required
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.teamNumber} onChange={(e) => setFormData({ ...formData, teamNumber: e.target.value })}
                />
                <input
                    type="text" placeholder="Responsable / Usuario"
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    value={formData.responsiblePerson} onChange={(e) => setFormData({ ...formData, responsiblePerson: e.target.value })}
                />

                {/* SELECTS DE CATÁLOGOS */}
                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.branchId} onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                    required
                >
                    <option value="">Seleccionar Sede...</option>
                    {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.typeId} onChange={(e) => setFormData({ ...formData, typeId: e.target.value })}
                    required
                >
                    <option value="">Tipo de Equipo...</option>
                    {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>

                <select
                    className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 bg-white font-semibold"
                    value={formData.statusId} onChange={(e) => setFormData({ ...formData, statusId: e.target.value })}
                    required
                >
                    <option value="">Estado Inicial...</option>
                    {statuses.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>

                <div className="flex flex-col">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2 mb-1 tracking-tighter">Fecha Compra</label>
                    <input
                        type="date"
                        className="p-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    />
                </div>
            </div>

            {/* GESTIÓN DE COMPONENTES */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                    <p className="text-xs font-black text-purple-400 uppercase mb-3 flex items-center gap-2">
                        🧠 Memorias RAM Instaladas
                    </p>
                    <div className="mb-3">
                        <input
                            type="text" placeholder="🔍 Buscar RAM por marca o serie..."
                            className="w-full p-2 text-xs rounded-lg border border-purple-200 outline-none focus:ring-2 focus:ring-purple-400"
                            value={ramSearch} onChange={(e) => setRamSearch(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {availableRams
                            .filter(ram =>
                                ram.brand?.toLowerCase().includes(ramSearch.toLowerCase()) ||
                                ram.serialNumber?.toLowerCase().includes(ramSearch.toLowerCase())
                            )
                            .map(ram => {
                                const isAssignedOther = ram.computerId && ram.computerId !== editingComputer?.id;
                                const isAssignedThis = ram.computerId && ram.computerId === editingComputer?.id;

                                return (
                                    <label key={ram.id} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors shadow-sm ${isAssignedOther ? 'bg-orange-50 border-orange-100 opacity-60 cursor-not-allowed' : 'bg-white border-purple-100 cursor-pointer hover:bg-purple-100'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-purple-600"
                                            disabled={isAssignedOther}
                                            checked={formData.ramMemories.some(r => r.id === ram.id)}
                                            onChange={(e) => {
                                                const newRams = e.target.checked
                                                    ? [...formData.ramMemories, ram]
                                                    : formData.ramMemories.filter(r => r.id !== ram.id);
                                                setFormData({ ...formData, ramMemories: newRams });
                                            }}
                                        />
                                        <div className="text-[10px] flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-gray-700">{ram.brand} {ram.capacity}</span>
                                                {isAssignedOther && <span className="text-orange-600 font-black uppercase text-[8px]">⚠️ Ocupada</span>}
                                                {isAssignedThis && <span className="text-green-600 font-black uppercase text-[8px]">✅ Instalada</span>}
                                                {!ram.computerId && <span className="text-blue-500 font-black uppercase text-[8px]">🆕 Disponible</span>}
                                            </div>
                                            <span className="text-gray-400 block">{ram.serialNumber}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        {availableRams.length === 0 && <p className="text-xs italic text-gray-400">No hay RAMs registradas.</p>}
                    </div>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                    <p className="text-xs font-black text-blue-400 uppercase mb-3 flex items-center gap-2">
                        💾 Unidades de Almacenamiento
                    </p>
                    <div className="mb-3">
                        <input
                            type="text" placeholder="🔍 Buscar disco por marca o serie..."
                            className="w-full p-2 text-xs rounded-lg border border-blue-200 outline-none focus:ring-2 focus:ring-blue-400"
                            value={storageSearch} onChange={(e) => setStorageSearch(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {availableStorages
                            .filter(storage =>
                                storage.brand?.toLowerCase().includes(storageSearch.toLowerCase()) ||
                                storage.serialNumber?.toLowerCase().includes(storageSearch.toLowerCase())
                            )
                            .map(storage => {
                                const isAssignedOther = storage.computerId && storage.computerId !== editingComputer?.id;
                                const isAssignedThis = storage.computerId && storage.computerId === editingComputer?.id;

                                return (
                                    <label key={storage.id} className={`flex items-center gap-3 p-2 rounded-lg border transition-colors shadow-sm ${isAssignedOther ? 'bg-orange-50 border-orange-100 opacity-60 cursor-not-allowed' : 'bg-white border-blue-100 cursor-pointer hover:bg-blue-100'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 accent-blue-600"
                                            disabled={isAssignedOther}
                                            checked={formData.storageDevices.some(s => s.id === storage.id)}
                                            onChange={(e) => {
                                                const newStorages = e.target.checked
                                                    ? [...formData.storageDevices, storage]
                                                    : formData.storageDevices.filter(s => s.id !== storage.id);
                                                setFormData({ ...formData, storageDevices: newStorages });
                                            }}
                                        />
                                        <div className="text-[10px] flex-1">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-gray-700">{storage.brand} {storage.capacity}</span>
                                                {isAssignedOther && <span className="text-orange-600 font-black uppercase text-[8px]">⚠️ Ocupado</span>}
                                                {isAssignedThis && <span className="text-green-600 font-black uppercase text-[8px]">✅ Instalado</span>}
                                                {!storage.computerId && <span className="text-blue-500 font-black uppercase text-[8px]">🆕 Disponible</span>}
                                            </div>
                                            <span className="text-gray-400 block">{storage.serialNumber}</span>
                                        </div>
                                    </label>
                                );
                            })}
                        {availableStorages.length === 0 && <p className="text-xs italic text-gray-400">No hay discos registrados.</p>}
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                {editingComputer && (
                    <button type="button" onClick={onCancel} className="px-6 py-2 text-gray-400 font-bold hover:bg-gray-50 rounded-xl transition-colors">
                        Cancelar
                    </button>
                )}
                <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all uppercase tracking-wide">
                    {editingComputer ? 'Confirmar Actualización' : 'Guardar en Inventario'}
                </button>
            </div>
        </form>
    );
};

export default ComputerForm;
