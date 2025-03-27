// components/PropertyHome.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Home, Wallet, FileText, User, ChevronRight } from "lucide-react";
import { getProperties } from "../services/api";

interface Property {
  propertyRecord: {
    property_unique_id: string;
    yojna_id: string;
    avanti_ka_naam: string;
    sampatti_sreni: string;
  };
  installmentPlan: {
    kul_yog: string;
    paid_amount: string;
    remaining_balance: string;
    ideal_kisht_mool: string;
    ideal_kisht_byaj: string;
    next_due_date: string | null;
    number_of_installment_paid: number;
    ideal_number_of_installments: number;
  };
}

function PropertyHome() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const checkAuth = () => {
    const token = localStorage.getItem("bida_token");
    if (!token) {
      navigate("/property");
      return false;
    }
    return true;
  };

  const fetchPropertyData = async () => {
    setLoading(true);
    setError("");
    try {
      const phone = localStorage.getItem("bida_phone");
      if (!phone) {
        throw new Error("Phone number not found in local storage");
      }

      const response = await getProperties(phone);
      if (response.data && response.data.length > 0) {
        setProperties(response.data);
      } else {
        setError("No property data found");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load property details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (checkAuth()) {
      fetchPropertyData();
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={fetchPropertyData}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Welcome, {properties[0]?.propertyRecord.avanti_ka_naam || "User"}
            </h1>
            <p className="text-sm text-gray-500">Allottee</p>
          </div>
        </div>
        <button className="relative p-2">
          <Bell className="w-6 h-6 text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Rest of your component remains the same */}
      {/* Properties List */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Your Properties
        </h2>
        <div className="space-y-4">
          {properties.map((property) => (
            <div
              key={property.propertyRecord.property_unique_id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
              onClick={() =>
                navigate(
                  `/property/details/${property.propertyRecord.property_unique_id}`
                )
              }
            >
              {/* Property Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {property.propertyRecord.sampatti_sreni} -{" "}
                      {property.propertyRecord.avanti_sampatti_sankhya}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {property.propertyRecord.yojna_name}
                      </span>
                      <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                        {property.propertyRecord.property_unique_id}
                      </span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Payment Progress */}
              <div className="space-y-6">
                {/* Amount Summary */}

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">कुल योग</p>
                    <p className="font-bold text-gray-900">
                      ₹
                      {Math.round(
                        parseFloat(property.installmentPlan.kul_yog)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">कुल जमा धनराशी</p>
                    <p className="font-bold text-green-700">
                      ₹
                      {Math.round(
                        parseFloat(property.installmentPlan.paid_amount)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">शेष धनराशी</p>
                    <p className="font-bold text-red-700">
                      ₹
                      {Math.round(
                        parseFloat(property.installmentPlan.remaining_balance)
                      ).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* EMI Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600">EMI Progress</span>
                    <span className="font-medium">
                      {property.installmentPlan.number_of_installment_paid} of{" "}
                      {property.installmentPlan.ideal_number_of_installments}{" "}
                      EMIs
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{
                        width: `${
                          (property.installmentPlan.number_of_installment_paid /
                            property.installmentPlan
                              .ideal_number_of_installments) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-between px-6 py-3">
          <button className="flex flex-col items-center text-blue-600">
          <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button 
            onClick={() => navigate('/property/payments')}
            className="flex flex-col items-center text-gray-400"
          >
            <Wallet className="w-6 h-6" />
            <span className="text-xs mt-1">Payments</span>
          </button>
          <button 
            onClick={() => navigate('/property/documents')}
            className="flex flex-col items-center text-gray-400"
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs mt-1">Documents</span>
          </button>
          <button 
            onClick={() => navigate('/property/profile')}
            className="flex flex-col items-center text-gray-400"
          >
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PropertyHome;
