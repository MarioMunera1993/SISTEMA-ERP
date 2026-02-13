import React from 'react';

const RamCard = ({ ram, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => onEdit(ram)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    ✏️
                </button>
                <button onClick={() => onDelete(ram.id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                    🗑️
                </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <div className="bg-purple-50 p-3.5 rounded-xl text-purple-600 text-3xl group-hover:scale-110 transition-transform">🧠</div>
                <div>
                    <h4 className="font-black text-gray-800 text-xl uppercase tracking-tight leading-none">{ram.brand}</h4>
                    <p className="text-gray-500 text-base font-semibold">{ram.model}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 font-black uppercase text-[9px] block">Capacidad</span>
                    <span className="text-gray-800 font-black text-lg">{ram.capacity}</span>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="text-gray-400 font-black uppercase text-[9px] block">Tipo</span>
                    <span className="text-gray-800 font-black text-lg">{ram.type}</span>
                </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-50">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Serie:</span>
                    <span className="text-gray-700 font-bold tracking-wide">{ram.serialNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Estado:</span>
                    <span className={`font-black text-[11px] px-2 py-0.5 rounded-full border ${ram.computerId ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                        {ram.computerId ? '📦 EN USO' : '🏠 EN BODEGA'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RamCard;
