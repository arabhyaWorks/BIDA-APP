import React, { useEffect, useState } from 'react';
import { ArrowLeft, User, MapPin, Phone, Mail, Calendar, Building, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getProperties } from '../services/api';

function Profile() {
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const phone = localStorage.getItem('bida_phone');
        if (!phone) throw new Error('Phone number not found');

        const response = await getProperties(phone);
        if (response.data && response.data.length > 0) {
          setProperty(response.data[0]);
        } else {
          throw new Error('No property data found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property details');
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error || 'Property not found'}</p>
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
          className="p-2 hover:bg-gray-100 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="bg-white p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{property.propertyRecord.avanti_ka_naam}</h2>
            <p className="text-gray-600 flex items-center mt-1">
              <Phone size={16} className="mr-2" />
              {property.propertyRecord.mobile_no}
            </p>
          </div>
        </div>
      </div>

      {/* Basic Details */}
      <div className="mt-6 p-4">
        <h3 className="text-lg font-semibold mb-4">Basic Details</h3>
        <div className="bg-white rounded-xl p-4 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Father's/Husband's Name</p>
            <p className="font-medium">{property.propertyRecord.pita_pati_ka_naam}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Permanent Address</p>
            <div className="flex">
              <MapPin size={18} className="text-gray-400 mr-2 flex-shrink-0 mt-1" />
              <p className="font-medium">{property.propertyRecord.avanti_ka_sthayi_pata}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="mt-4 p-4">
        <h3 className="text-lg font-semibold mb-4">Property Details</h3>
        <div className="bg-white rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Property ID</p>
              <p className="font-medium">{property.propertyRecord.property_unique_id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Scheme</p>
              <p className="font-medium">{property.propertyRecord.yojna_name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Property Type</p>
              <p className="font-medium">{property.propertyRecord.sampatti_sreni}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Property Number</p>
              <p className="font-medium">{property.propertyRecord.avanti_sampatti_sankhya}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Floor Type</p>
              <p className="font-medium">{property.propertyRecord.property_floor_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Possession Date</p>
              <p className="font-medium">{property.propertyRecord.kabja_dinank}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Installment Plan */}
      <div className="mt-4 p-4">
        <h3 className="text-lg font-semibold mb-4">Installment Plan</h3>
        <div className="bg-white rounded-xl p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Total Amount (कुल योग)</p>
              <p className="text-xl font-bold text-blue-700">
                ₹{parseFloat(property.installmentPlan.kul_yog).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Paid Amount</p>
              <p className="text-lg font-bold text-green-700">
                ₹{parseFloat(property.installmentPlan.paid_amount).toLocaleString('en-IN')}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Remaining Balance</p>
              <p className="text-lg font-bold text-red-700">
                ₹{parseFloat(property.installmentPlan.remaining_balance).toLocaleString('en-IN')}
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <p className="text-gray-600">Interest Rate</p>
              <p className="font-medium">{property.installmentPlan.interest_rate}%</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">EMIs Paid</p>
              <p className="font-medium">
                {property.installmentPlan.number_of_installment_paid} of {property.installmentPlan.ideal_number_of_installments}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">EMI Amount</p>
              <p className="font-medium">₹{parseFloat(property.installmentPlan.ideal_kisht_mool).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Paid Installments */}
      {property.installments.length > 0 && (
        <div className="mt-4 p-4">
          <h3 className="text-lg font-semibold mb-4">Paid Installments</h3>
          <div className="bg-white rounded-xl p-4 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">No.</th>
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {property.installments.map((installment: any, index: number) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{installment.payment_number}</td>
                    <td className="py-3">{installment.payment_date}</td>
                    <td className="py-3 text-right">
                      ₹{parseFloat(installment.payment_amount).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Service Charges */}
      {property.serviceCharges.length > 0 && (
        <div className="mt-4 p-4">
          <h3 className="text-lg font-semibold mb-4">Service Charges</h3>
          <div className="bg-white rounded-xl p-4 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Year</th>
                  <th className="text-right py-2">Amount</th>
                  <th className="text-right py-2">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {property.serviceCharges.map((charge: any, index: number) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="py-3">{charge.service_charge_financial_year}</td>
                    <td className="py-3 text-right">
                      ₹{parseFloat(charge.service_charge_total).toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 text-right">{charge.service_charge_payment_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;