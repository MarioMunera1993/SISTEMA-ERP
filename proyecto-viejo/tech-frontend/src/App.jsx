import { useState, useEffect } from 'react';
import FormularioImpresora from './components/impresoras/FormularioImpresora';
import TarjetaImpresora from './components/impresoras/TarjetaImpresora';

function App() {
  // ... (Tus estados se mantienen igual) ...
  const [impresoras, setImpresoras] = useState([]);
  const [sedes, setSedes] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [estados, setEstados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [editando, setEditando] = useState(false);
  const [idEditar, setIdEditar] = useState(null);
  const [datosEditar, setDatosEditar] = useState(null);
  const [vistaActual, setVistaActual] = useState('dashboard');

  // --- LÓGICA DE DATOS Y GUARDAR (Se mantienen igual) ---
  const cargarTodo = async () => { /* ... tu fetch ... */ };
  useEffect(() => { cargarTodo(); }, []);

  const manejarGuardar = async (formData) => { /* ... tu lógica de guardado ... */ };

  const impresorasFiltradas = impresoras.filter(imp =>
    imp.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    imp.numeroSerie.toLowerCase().includes(busqueda.toLowerCase())
  );

  // --- COMPONENTE DE NAVEGACIÓN (Sidebar) ---
  const MenuNavegacion = () => (
    <nav className="bg-slate-800 text-white w-64 min-h-screen p-6 hidden md:block fixed">
      <h2 className="text-2xl font-bold mb-8 text-cyan-400 text-center">Grupo Roldan</h2>
      <ul className="space-y-4">
        <li>
          <button onClick={() => setVistaActual('dashboard')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${vistaActual === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            🏠 Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setVistaActual('impresoras')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${vistaActual === 'impresoras' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            🖨️ Impresoras
          </button>
        </li>
        <li>
          <button onClick={() => setVistaActual('computadores')}
            className={`w-full text-left p-3 rounded-lg transition-colors ${vistaActual === 'computadores' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}>
            💻 Computadores
          </button>
        </li>
      </ul>
    </nav>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* 1. BARRA LATERAL */}
      <MenuNavegacion />

      {/* 2. CONTENIDO PRINCIPAL (Nota el margen a la izquierda para no taparse con el menu) */}
      <main className="flex-1 md:ml-64 p-8">

        {/* VISTA: DASHBOARD */}
        {vistaActual === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Resumen de Inventario</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-cyan-500">
                <p className="text-sm text-gray-500 font-bold uppercase">Impresoras</p>
                <p className="text-4xl font-black text-gray-800">{impresoras.length}</p>
              </div>
              {/* Aquí irán los otros contadores después */}
            </div>
          </div>
        )}

        {/* VISTA: IMPRESORAS */}
        {vistaActual === 'impresoras' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Módulo de Impresoras</h1>
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {impresorasFiltradas.length} Equipos encontrados
              </span>
            </div>

            {/* FORMULARIO */}
            <FormularioImpresora
              sedes={sedes} tipos={tipos} estados={estados}
              alGuardar={manejarGuardar}
              editando={editando}
              datosEditar={datosEditar}
              cancelarEdicion={() => { setEditando(false); setDatosEditar(null); }}
            />

            {/* BUSCADOR */}
            <div className="mb-8 max-w-md mx-auto">
              <input
                type="text" placeholder="🔍 Buscar por serie o marca..."
                className="w-full p-3 rounded-full border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={busqueda} onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            {/* GRILLA DE TARJETAS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {impresorasFiltradas.map(imp => (
                <TarjetaImpresora
                  key={imp.id} imp={imp} sedes={sedes} estados={estados}
                  alEditar={(equipo) => { setEditando(true); setIdEditar(equipo.id); setDatosEditar(equipo); window.scrollTo(0, 0); }}
                />
              ))}
            </div>
          </div>
        )}

        {/* VISTA: COMPUTADORES (Próximamente) */}
        {vistaActual === 'computadores' && (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-xl">
            <p className="text-gray-400 text-xl font-medium">💻 Módulo de Computadores en Construcción</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;