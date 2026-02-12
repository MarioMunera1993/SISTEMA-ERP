import { useState, useEffect } from 'react';

// Recibe como "props" las listas de catalogos y las funciones de control
const FormularioImpresora = ({ sedes, tipos, estados, alGuardar, editando, datosEditar, cancelarEdicion }) => {
    // Estado local para el formulario
    const [formData, setFormData] = useState({
        marca: '', modelo: '', numeroImpresora: '', numeroSerie: '',
        esColor: false, idSede: '', idTipo: '', idEstado: ''
    });

    // Efecto para cargar datos cuando entramos en modo edición
    useEffect(() => {
        if (editando && datosEditar) {
            setFormData(datosEditar);
        } else {
            // Si no estamos editando, limpiamos el formulario
            setFormData({
                marca: '', modelo: '', numeroImpresora: '', numeroSerie: '',
                esColor: false, idSede: '', idTipo: '', idEstado: ''
            });
        }
    }, [editando, datosEditar]);

    const handleSubmit = (e) => {
        e.preventDefault();
        alGuardar(formData); // Ejecuta la función del padre

        // Si NO estamos editando, limpiamos el formulario localmente
        if (!editando) {
            setFormData({
                marca: '', modelo: '', numeroImpresora: '', numeroSerie: '',
                esColor: false, idSede: '', idTipo: '', idEstado: ''
            });
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {editando ? 'Editar Impresora' : 'Registrar Nueva Impresora'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* INPUT: MARCA */}
                <input
                    type="text"
                    placeholder="Marca (Ej: HP)"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.marca}
                    onChange={(e) => setFormData({ ...formData, marca: e.target.value.toUpperCase() })}
                    required
                />
                {/* INPUT: MODELO */}
                <input
                    type="text"
                    placeholder="Modelo (Ej: LaserJet Pro MFP M427fdw)"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value.toUpperCase() })}
                    required
                />
                {/* INPUT: PLACA */}
                <input
                    type="text"
                    placeholder="Número de Placa (Ej: 123456)"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.numeroImpresora}
                    onChange={(e) => setFormData({ ...formData, numeroImpresora: e.target.value })}
                    required
                />
                
                {/* INPUT: SERIE */}
                <input
                    type="text"
                    placeholder="Número de Serie (Ej: ABC123456)"
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.numeroSerie}
                    onChange={(e) => setFormData({ ...formData, numeroSerie: e.target.value.toUpperCase() })}
                    required
                />

                {/* SELECT: TIPO */}
                <select
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                    value={formData.idTipo}
                    onChange={(e) => setFormData({ ...formData, idTipo: e.target.value })}
                    required
                >
                    <option value="">Selecciona un Tipo</option>
                    {tipos.map(t => <option key={t.id} value={t.id}>{t.nombre}</option>)}
                </select>

                {/* CHECKBOX: COLOR */}
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="esColor"
                        className="mr-2"
                        checked={formData.esColor}
                        onChange={(e) => setFormData({ ...formData, esColor: e.target.checked })}
                    />
                    <label htmlFor="esColor" className="text-gray-700">¿Es a Color?</label>
                </div>

                {/* SELECT: SEDE */}
                <select
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                    value={formData.idSede}
                    onChange={(e) => setFormData({ ...formData, idSede: e.target.value })}
                    required
                >
                    <option value="">Selecciona una Sede</option>
                    {sedes.map(s => <option key={s.id} value={s.id}>{s.nombre}</option>)}
                </select>

                {/* SELECT: ESTADO */}
                <select
                    className="p-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none bg-white"
                    value={formData.idEstado}
                    onChange={(e) => setFormData({ ...formData, idEstado: e.target.value })}
                    required
                >
                    <option value="">Selecciona un Estado</option>
                    {estados.map(e => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>

                {/* SELECT: S */}
                <div className="md:col-span-2 flex flex-col gap-2">
                    <button type="submit" className={`font-bold py-2 px-4 rounded-md text-white transition-colors ${editando ? 'bg-orange-500 hover:bg-orange-600' : 'bg-cyan-500 hover:bg-blue-700'}`}>
                        {editando ? 'Actualizar Cambios' : 'Guardar Impresora'}
                    </button>

                    {editando && (
                        <button type="button" onClick={cancelarEdicion} className="text-gray-500 text-sm underline">
                            Cancelar edición
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default FormularioImpresora;