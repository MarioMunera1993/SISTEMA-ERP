import React from 'react';

const PhoneCard = ({ phone, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-blue-500/5 transition-all group animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
                        <span className="text-white text-xl">📞</span>
                    </div>
                    <div>
                        <h4 className="font-black text-gray-800 text-lg uppercase leading-tight">
                            {phone.brand}
                        </h4>
                        <p className="text-blue-600 font-bold text-xs tracking-widest uppercase">
                            {phone.model}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => onEdit(phone)}
                        className="p-2 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Editar"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(phone.id)}
                        className="p-2 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Eliminar"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex justify-between items-end border-b border-gray-50 pb-3">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Serie</span>
                    <span className="font-mono text-xs font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md uppercase">
                        {phone.serialNumber}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-2xl">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Extensión</span>
                        <span className="text-sm font-bold text-gray-800">{phone.extension || '---'}</span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-2xl">
                        <span className="text-[9px] font-black text-gray-400 uppercase block mb-1">Placa</span>
                        <span className="text-sm font-bold text-gray-800">{phone.inventoryTag}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-2xl">
                    <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-xs">👤</span>
                    </div>
                    <div>
                        <span className="text-[9px] font-black text-gray-400 uppercase block leading-none">Responsable</span>
                        <span className="text-xs font-black text-blue-900 uppercase">{phone.responsiblePerson || 'Sin asignar'}</span>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase border ${phone.status?.name === 'En Uso' ? 'bg-green-100 text-green-700 border-green-200' :
                            phone.status?.name === 'Dañado' ? 'bg-red-100 text-red-700 border-red-200' :
                                'bg-gray-100 text-gray-600 border-gray-200'
                        }`}>
                        {phone.status?.name || 'Inventario'}
                    </span>
                    <div className="flex flex-col items-end">
                        <span className="text-[8px] font-black text-gray-300 uppercase">IP Address</span>
                        <span className="text-[10px] font-mono font-bold text-gray-500">{phone.ipAddress || '0.0.0.0'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhoneCard;
