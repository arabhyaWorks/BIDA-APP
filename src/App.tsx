import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AboutBida from './Pages/AboutBida';
import OrganizationChart from './Pages/OrganizationChart';
import ByeLawsAndActs from './Pages/ByeLawsAndActs';
import PropertyLogin from './Pages/PropertyLogin';
import PropertyHome from './Pages/PropertyHome';
import PropertyDetails from './Pages/PropertyDetails';
import Profile from './Pages/Profile';
import Payments from './Pages/Payments';
import Documents from './Pages/Documents.tsx';
import EMIPayment from './Pages/EMIPayment';
import ServiceCharges from './Pages/ServiceCharge.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutBida />} />
        <Route path="/organization" element={<OrganizationChart />} />
        <Route path="/byelaws" element={<ByeLawsAndActs />} />
        <Route path="/property" element={<PropertyLogin />} />
        <Route path="/property/home" element={<PropertyHome />} />
        <Route path="/property/details/:id" element={<PropertyDetails />} />
        <Route path="/property/profile" element={<Profile />} />
        <Route path="/property/payments" element={<Payments />} />
        <Route path="/property/documents" element={<Documents />} />
        <Route path="/property/pay-emi" element={<EMIPayment />} />
        <Route path="/property/service-charges" element={<ServiceCharges />} />

      </Routes>
    </Router>
  );
}
export default App;
