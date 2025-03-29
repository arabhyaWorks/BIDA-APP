import React from 'react';

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

export default RedirectButton;