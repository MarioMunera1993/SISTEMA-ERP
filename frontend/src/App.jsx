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
import RamInventoryTable from './modules/inventory/RamInventoryTable';
import StorageInventoryTable from './modules/inventory/StorageInventoryTable';
import PrinterInventoryTable from './modules/printers/PrinterInventoryTable';
import PhonesView from './modules/phones/PhonesView';
import PhoneInventoryTable from './modules/phones/PhoneInventoryTable';
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
            <Route path="/printers/inventory" element={<PrinterInventoryTable />} />
            <Route path="/computers" element={<ComputersView />} />
            <Route path="/computers/inventory" element={<ComputerInventoryTable />} />
            <Route path="/ram" element={<RamView />} />
            <Route path="/ram/inventory" element={<RamInventoryTable />} />
            <Route path="/storage" element={<StorageView />} />
            <Route path="/storage/inventory" element={<StorageInventoryTable />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/phones" element={<PhonesView />} />
            <Route path="/phones/inventory" element={<PhoneInventoryTable />} />
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
