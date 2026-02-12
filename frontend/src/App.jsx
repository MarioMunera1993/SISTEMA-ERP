import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './modules/dashboard/Dashboard';
import MainLayout from './components/layout/MainLayout';
import PrintersView from './modules/printers/PrintersView'; // 👈 Añade esta línea
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<Login />} />

          {/* Rutas Privadas (Protegidas por Layout) */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Aquí agregaremos las otras rutas conforme las migremos */}
            <Route path="/printers" element={<PrintersView />} />
            <Route path="/computers" element={<div className="p-6 bg-white rounded-xl shadow">Módulo de Computadores (Próximamente)</div>} />
            <Route path="/phones" element={<div className="p-6 bg-white rounded-xl shadow">Módulo de Teléfonos (Próximamente)</div>} />
          </Route>

          {/* Redirecciones */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
