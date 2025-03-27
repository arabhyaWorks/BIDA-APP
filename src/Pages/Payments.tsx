import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, IndianRupee } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../services/api';

interface Payment {
  payment_number: number;
  payment_date: string;
  payment_amount: string;
  kisht_mool_paid: string;
  kisht_byaj_paid: string;
  late_fee: string;
}

interface ServiceCharge {
  service_charge_financial_year: string;
  service_charge_amount: string;
  service_charge_late_fee: string;
  service_charge_total: string;
  service_charge_payment_date: string;
}

function Payments() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [serviceCharges, setServiceCharges] = useState<ServiceCharge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const phone = localStorage.getItem('bida_phone');
        if (!phone) throw new Error('Phone number not found');

        const response = await getProperties(phone);
        if (response.data && response.data.length > 0) {
          setPayments(response.data[0].installments);
          setServiceCharges(response.data[0].serviceCharges);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load payment history');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading payment history...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={() => navigate('/property/home')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <button 
          onClick={() => navigate('/property/home')}
          className="p-2 hover:bg-gray-100 rounded-full mr-3 transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold">भुगतान इतिहास</h1>
          <p className="text-sm text-gray-500">Payment History</p>
        </div>
      </div>

      {/* EMI Payments */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">किश्त भुगतान</h2>
          <p className="text-sm text-gray-500">EMI Payments</p>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {payments.length > 0 ? (
            payments.map((payment, index) => (
              <div 
                key={index}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-bold text-gray-900">
                      किश्त संख्या {payment.payment_number}
                    </p>
                    <div className="mt-1">
                      <p className="text-xs text-gray-500">भुगतान तिथि / Payment Date</p>
                      <div className="flex items-center text-sm text-gray-700 font-medium">
                        <Calendar size={14} className="mr-1 text-blue-600" />
                        {new Date(payment.payment_date).toLocaleDateString('hi-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">कुल भुगतान / Total Paid</p>
                    <p className="font-bold text-green-600">
                      ₹{parseFloat(payment.payment_amount).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-gray-600 text-xs mb-1">मूल धनराशि</p>
                    <p className="text-xs text-gray-500">Principal</p>
                    <p className="font-medium">
                      ₹{parseFloat(payment.kisht_mool_paid).toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-gray-600 text-xs mb-1">ब्याज धनराशि</p>
                    <p className="text-xs text-gray-500">Interest</p>
                    <p className="font-medium">
                      ₹{parseFloat(payment.kisht_byaj_paid).toLocaleString('en-IN')}
                    </p>
                  </div>
                  {parseFloat(payment.late_fee) > 0 && (
                    <div className="bg-red-50 p-3 rounded-lg">
                      <p className="text-gray-600 text-xs mb-1">विलंब शुल्क</p>
                      <p className="text-xs text-gray-500">Late Fee</p>
                      <p className="font-medium text-red-600">
                        ₹{parseFloat(payment.late_fee).toLocaleString('en-IN')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <IndianRupee size={40} className="mx-auto mb-2 text-gray-400" />
              <p>No EMI payments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Service Charges */}
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-900">सेवा शुल्क</h2>
          <p className="text-sm text-gray-500">Service Charges</p>
        </div>
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
          {serviceCharges.length > 0 ? (
            serviceCharges.map((charge, index) => (
              <div 
                key={index}
                className="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-900">
                      वित्तीय वर्ष {charge.service_charge_financial_year}
                    </p>
                    <div className="mt-1">
                      <p className="text-xs text-gray-500">भुगतान तिथि / Payment Date</p>
                      <div className="flex items-center text-sm text-gray-700 font-medium">
                        <Calendar size={14} className="mr-1 text-blue-600" />
                        {new Date(charge.service_charge_payment_date).toLocaleDateString('hi-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 mb-1">कुल शुल्क / Total Charges</p>
                    <p className="font-bold text-green-600">
                      ₹{parseFloat(charge.service_charge_total).toLocaleString('en-IN')}
                    </p>
                    {parseFloat(charge.service_charge_late_fee) > 0 && (
                      <div className="mt-2 bg-red-50 p-2 rounded-lg">
                        <p className="text-xs text-gray-600">विलंब शुल्क / Late Fee</p>
                        <p className="text-sm font-medium text-red-600">
                          ₹{parseFloat(charge.service_charge_late_fee).toLocaleString('en-IN')}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              <IndianRupee size={40} className="mx-auto mb-2 text-gray-400" />
              <p>No service charges found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payments;