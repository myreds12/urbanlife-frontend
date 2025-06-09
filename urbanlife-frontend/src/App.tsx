import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Bar from './AdminDashboard/Bar/bar';
import Dashboard from'./AdminDashboard/Dashboard/dashboard';
import Order from'./AdminDashboard/Order/Order';

function App() {
  return (
    <Router>
      <Bar />
      <div className="main-content">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
    </Router>  );
}

export default App;
