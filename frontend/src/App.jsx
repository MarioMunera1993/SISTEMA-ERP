import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './modules/dashboard/Dashboard';
import MainLayout from './components/layout/MainLayout';
import PrintersView from './modules/printers/PrintersView';
import ComputersView from './modules/computers/ComputersView';
import RamView from './modules/inventory/RamView';
import StorageView from './modules/inventory/StorageView';
import UserManagement from './modules/users/UserManagement';
import ComputerInventoryTable from './modules/computers/ComputerInventoryTable';
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
            <Route path="/computers" element={<ComputersView />} />
            <Route path="/computers/inventory" element={<ComputerInventoryTable />} />
            <Route path="/ram" element={<RamView />} />
            <Route path="/storage" element={<StorageView />} />
            <Route path="/users" element={<UserManagement />} />
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
