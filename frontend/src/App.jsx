import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/auth/Login';
import Dashboard from './modules/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 1. Ruta oficial del Login */}
          <Route path="/login" element={<Login />} />

          {/* 2. Si entran a la raíz '/', los enviamos al Login automáticamente */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* 3. Si escriben una URL que no existe, también los mandamos al Login */}
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
