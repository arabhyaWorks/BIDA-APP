import React from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
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

const RedirectButton = () => {
  const handleRedirect = () => {
    // Define the URL and the data you want to send
    const url = 'https://emd.bidabhadohi.com/propertyMartPayment/payment'; // Replace with your target URL
    const data = {
      order_id: 'ABC9983',
      amount: 10,
	  customer_name: 'Vishnu',
	  customer_email: 'abc@g.com',
	  customer_mobile: '8800218342',
	  customer_address: 'sdsddsd',
	  property_id: 123
    };

    // Create a form element
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = url;

    // Append data as hidden input fields
    Object.keys(data).forEach((key) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = data[key];
      form.appendChild(input);
    });

    // Append the form to the body and submit it
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div>
      <h1>Click the button to POST data to Example.com</h1>
      <button onClick={handleRedirect} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Submit Data
      </button>
    </div>
  );
};


// OrderId Component
const OrderPage = () => {
  const { orderId } = useParams();

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Order ID: {orderId}</p>
    </div>
  );
};



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
        <Route path="/payment" element={<RedirectButton />} />
        <Route path="/payment/:orderId" element={<OrderPage />} />

        


      </Routes>
    </Router>
  );
}
export default App;

