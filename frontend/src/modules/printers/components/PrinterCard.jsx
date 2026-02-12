import React from 'react';

const PrinterCard = ({ printer, onEdit, onDelete, types, statuses, branches }) => {

    // Funciones de ayuda para obtener nombres
    const getTypeName = (id) => types.find(t => t.id === parseInt(id))?.name || "Sin tipo";
    const getStatusName = (id) => statuses.find(s => s.id === parseInt(id))?.name || "Sin estado";
    const getBranchName = (id) => branches.find(b => b.id === parseInt(id))?.name || "Sin sede";

    // Estilos dinámicos para el estado
    const statusColors = {
        "Activo": "bg-green-100 text-green-700 border-green-200",
        "Inactivo": "bg-red-100 text-red-700 border-red-200",
        "En reparación": "bg-yellow-100 text-yellow-700 border-yellow-200"
    };

    const currentStatus = getStatusName(printer.statusId);
    const statusClass = statusColors[currentStatus] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            {/* INDICADOR DE COLOR */}
            <div className={`absolute top-0 left-0 px-3 py-1 text-[9px] font-black uppercase tracking-tighter rounded-br-xl shadow-sm ${printer.isColor ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white' : 'bg-gray-800 text-white'}`}>
                {printer.isColor ? '🎨 Color' : '🏁 B/N'}
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => onEdit(printer)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    ✏️
                </button>
                <button onClick={() => onDelete(printer.id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                    🗑️
                </button>
            </div>

            <div className="flex items-center gap-4 mb-4 mt-2">
                <div className="bg-blue-50 p-3.5 rounded-xl text-blue-600 text-3xl group-hover:scale-110 transition-transform">🖨️</div>
                <div>
                    <h4 className="font-black text-gray-800 text-xl uppercase tracking-tight">{printer.brand}</h4>
                    <p className="text-gray-500 text-base font-semibold">{printer.model}</p>
                </div>
            </div>

            <div className="mb-4">
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wide ${statusClass}`}>
                    {currentStatus}
                </span>
            </div>

            <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Sede:</span>
                    <span className="text-gray-700 font-bold">{getBranchName(printer.branchId)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Responsable:</span>
                    <span className="text-gray-700 font-bold">{printer.responsiblePerson || "No asignado"}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Tipo:</span>
                    <span className="text-gray-600 font-semibold">{getTypeName(printer.typeId)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Serie:</span>
                    <span className="text-gray-700 font-bold tracking-wide">{printer.serialNumber}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">IP:</span>
                    <span className="text-blue-600 font-black">{printer.ip}</span>
                </div>
            </div>
        </div>
    );
};

export default PrinterCard;