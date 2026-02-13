import React from 'react';

const ComputerCard = ({ computer, onEdit, onDelete, types, statuses, branches }) => {

    const getTypeName = (id) => types.find(t => t.id === parseInt(id))?.name || "Sin tipo";
    const getStatusName = (id) => statuses.find(s => s.id === parseInt(id))?.name || "Sin estado";
    const getBranchName = (id) => branches.find(b => b.id === parseInt(id))?.name || "Sin sede";

    const statusColors = {
        "Activo": "bg-green-100 text-green-700 border-green-200",
        "Inactivo": "bg-red-100 text-red-700 border-red-200",
        "En reparación": "bg-yellow-100 text-yellow-700 border-yellow-200"
    };

    const currentStatus = computer.status?.name || getStatusName(computer.statusId);
    const statusClass = statusColors[currentStatus] || "bg-gray-100 text-gray-700 border-gray-200";

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all group relative overflow-hidden">
            {/* INDICADOR TÉCNICO */}
            <div className="absolute top-0 left-0 px-3 py-1 bg-gray-800 text-white text-[9px] font-black uppercase tracking-tighter rounded-br-xl shadow-sm">
                Nº EQUIPO: {computer.teamNumber}
            </div>

            {/* BOTONES DE ACCIÓN */}
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                <button onClick={() => onEdit(computer)} className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors">
                    ✏️
                </button>
                <button onClick={() => onDelete(computer.id)} className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                    🗑️
                </button>
            </div>

            <div className="flex items-center gap-4 mb-4 mt-4">
                <div className="bg-indigo-50 p-3.5 rounded-xl text-indigo-600 text-3xl group-hover:scale-110 transition-transform">💻</div>
                <div>
                    <h4 className="font-black text-gray-800 text-xl uppercase tracking-tight leading-none">{computer.brand}</h4>
                    <p className="text-gray-500 text-base font-semibold">{computer.model}</p>
                </div>
            </div>

            <div className="mb-4">
                <span className={`text-[11px] font-black px-2.5 py-1 rounded-full border uppercase tracking-wide ${statusClass}`}>
                    {currentStatus}
                </span>
            </div>

            <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Responsable:</span>
                    <span className="text-gray-900 font-black">{computer.responsiblePerson || "SIN ASIGNAR"}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Procesador:</span>
                    <span className="text-gray-700 font-bold">{computer.processor}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Sede:</span>
                    <span className="text-gray-700 font-bold">{computer.branch?.name || getBranchName(computer.branchId)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Tipo:</span>
                    <span className="text-gray-600 font-bold">{computer.type?.name || getTypeName(computer.typeId)}</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-gray-50 pt-2">
                    <span className="text-gray-400 font-black uppercase text-[10px]">Serie:</span>
                    <span className="text-gray-700 font-black tracking-wide">{computer.serialNumber}</span>
                </div>

                {/* MAC ADDRESSES */}
                <div className="grid grid-cols-2 gap-2 border-t border-gray-50 pt-2">
                    <div className="flex flex-col">
                        <span className="text-gray-400 font-black uppercase text-[8px]">MAC LAN:</span>
                        <span className="text-[10px] font-mono text-gray-600">{computer.macLan || "N/A"}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-gray-400 font-black uppercase text-[8px]">MAC WIFI:</span>
                        <span className="text-[10px] font-mono text-gray-600">{computer.macWifi || "N/A"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComputerCard;
