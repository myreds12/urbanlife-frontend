import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Bar from './pages/AdminDashboard/Bar/Bar';
import Dashboard from './pages/AdminDashboard/Dashboard/Dashboard';
import Order from './pages/AdminDashboard/Order/Order';
import DayTour from './pages/AdminDashboard/DayTour/DayTour';
import WhatsappConnect from './pages/AdminDashboard/WhatsappSetting/WhatsappConnect'; // Pastikan path ini benar

function App() {
  return (
    <Router>
      <Bar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/day-tour" element={<DayTour />} />
          <Route path="/whatsapp-connect" element={<WhatsappConnect />} /> {/* Tambahkan route ini */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;