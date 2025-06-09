import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Bar from './AdminDashboard/Bar/Bar';
import Dashboard from './AdminDashboard/Dashboard/Dashboard';
import Order from './AdminDashboard/Order/Order';
import DayTour from './AdminDashboard/DayTour/DayTour'; // Tambah import DayTour

function App() {
  return (
    <Router>
      <Bar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
          <Route path="/day-tour" element={<DayTour />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;