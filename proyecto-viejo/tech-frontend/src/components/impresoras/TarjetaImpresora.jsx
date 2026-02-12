const TarjetaImpresora = ({ imp, sedes, estados, alEditar }) => {
  // Buscamos el nombre de la sede para mostrar texto y no ID
  const nombreSede = sedes.find(s => s.id === parseInt(imp.idSede))?.nombre || 'No definida';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500 h-full flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-blue-600">{imp.marca} {imp.modelo}</h2>
        <div className="text-gray-600 mt-2 space-y-1">
          <p><strong>Placa:</strong> {imp.numeroImpresora}</p>
          <p><strong>Serie:</strong> {imp.numeroSerie}</p>
          <p><strong>Sede:</strong> {nombreSede}</p>
          <p><strong>Estado:</strong> {imp.idEstado === 1 ? '✅ Activo' : '⚠️ Mantenimiento'}</p>
        </div>
        
        <div className="mt-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${imp.esColor ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
            {imp.esColor ? '🌈 Color' : '🌑 B/N'}
          </span>
        </div>
      </div>

      <button
        onClick={() => alEditar(imp)}
        className="mt-4 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded font-bold transition-colors"
      >
        Editar
      </button>
    </div>
  );
};

export default TarjetaImpresora;