import React, { useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Wallet, FileText, User } from "lucide-react";
import { addServiceCharge } from "../services/api"; // Adjust path as needed

interface PropertyRecord {
  property_unique_id: string;
  yojna_id: string;
  yojna_name: string;
  avanti_ka_naam: string;
  sampatti_sreni: string;
  avantan_dinank: string;
  property_floor_type: string; // "LGF" or "UGF"
}

interface ServiceCharge {
  service_charge_financial_year: string;
  service_charge_amount: string;
  service_charge_late_fee: string;
  service_charge_payment_date: string;
}

interface PropertyData {
  propertyRecord: PropertyRecord;
  installmentPlan: any;
  installments: any[];
  serviceCharges: ServiceCharge[];
}

// Utility Functions
const getFinancialYearFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth();
  return month < 3 ? `${year - 1}-${year}` : `${year}-${year + 1}`;
};

const generateBilledYears = (allotmentDate: string, currentDate: string): string[] => {
  const allotmentFY = getFinancialYearFromDate(allotmentDate);
  const [startYear] = allotmentFY.split("-").map(Number);
  const currentFY = getFinancialYearFromDate(currentDate);
  const [endYear] = currentFY.split("-").map(Number);
  const years = [];
  for (let year = startYear + 1; year <= endYear; year++) {
    years.push(`${year}-${year + 1}`);
  }
  return years;
};

const getEndYear = (fy: string): number => {
  const [, end] = fy.split("-");
  return Number(end);
};

const calculateLateFee = (serviceChargeFY: string, paymentDate: string, baseAmount: number): number => {
  const serviceChargeEndYear = getEndYear(serviceChargeFY);
  const paymentFY = getFinancialYearFromDate(paymentDate);
  const paymentEndYear = getEndYear(paymentFY);
  const diff = paymentEndYear - serviceChargeEndYear;
  if (diff <= 0) return 0;
  const percentage = diff === 1 ? 0.05 : diff === 2 ? 0.1 : diff >= 3 ? 0.15 : 0;
  return baseAmount * percentage;
};

const ServiceCharges: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property as PropertyData;
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!property) {
    return (
      <div className="max-w-md mx-auto min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Property data not found</p>
          <button
            onClick={() => navigate("/property/home")}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { propertyRecord, serviceCharges } = property;
  const baseAmount = propertyRecord.property_floor_type === "LGF" ? 10610 : 11005;
  const currentDate = new Date().toISOString().split("T")[0];
  const paymentDate = currentDate; // Fixed to current date
  const billedYears = generateBilledYears(propertyRecord.avantan_dinank, currentDate);
  const firstPayableFY = billedYears[0] || "N/A";

  const paidYears = serviceCharges.map((charge) => charge.service_charge_financial_year);
  const unpaidYears = billedYears.filter((year) => !paidYears.includes(year));

  const handleYearToggle = (year: string) => {
    setSelectedYears((prev) => {
      if (prev.includes(year)) {
        const index = prev.indexOf(year);
        return prev.slice(0, index);
      } else {
        const earliestUnpaidYear = unpaidYears[0];
        const selectedIndex = unpaidYears.indexOf(year);
        if (prev.length === 0 && year === earliestUnpaidYear) {
          return [year];
        }
        if (prev.length > 0) {
          const lastSelected = prev[prev.length - 1];
          const lastIndex = unpaidYears.indexOf(lastSelected);
          if (selectedIndex === lastIndex + 1) {
            return [...prev, year];
          }
        }
        return prev;
      }
    });
  };

  const paymentBreakdown = useMemo(() => {
    const breakdown = selectedYears.map((year) => {
      const lateFee = calculateLateFee(year, paymentDate, baseAmount);
      const yearsLate = getEndYear(getFinancialYearFromDate(paymentDate)) - getEndYear(year);
      const percentage = yearsLate === 1 ? 5 : yearsLate === 2 ? 10 : yearsLate >= 3 ? 15 : 0;
      const total = baseAmount + lateFee;
      return { year, baseAmount, percentage, lateFee, total };
    });
    const totalBase = breakdown.reduce((sum, item) => sum + item.baseAmount, 0);
    const totalLateFees = breakdown.reduce((sum, item) => sum + item.lateFee, 0);
    const grandTotal = totalBase + totalLateFees;
    return { breakdown, totalBase, totalLateFees, grandTotal };
  }, [selectedYears, paymentDate, baseAmount]);

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);
  
    const newServiceCharges = selectedYears.map((year) => ({
      property_unique_id: propertyRecord.property_unique_id,
      service_charge_financial_year: year,
      service_charge_amount: baseAmount.toFixed(2),
      service_charge_late_fee: calculateLateFee(year, paymentDate, baseAmount).toFixed(2),
      service_charge_payment_date: paymentDate,
    }));
  
    try {
      await addServiceCharge(newServiceCharges);
      const updatedProperty = {
        ...property,
        serviceCharges: [...serviceCharges, ...newServiceCharges],
      };
      navigate("/property/home");
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err.message : "Failed to process payment");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <button
          onClick={() => navigate(`/property/details/${propertyRecord.property_unique_id}`, { state: { property } })}
          className="p-2 hover:bg-gray-100 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Service Charges</h1>
      </div>

      {/* Property Info */}
      <div className="p-4 ">
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            {propertyRecord.sampatti_sreni} {propertyRecord.avanti_sampatti_sankhya || ""}
          </h3>
          <p className="text-sm text-gray-600">{propertyRecord.property_unique_id}</p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>पहला देय वित्तीय वर्ष:</strong> {firstPayableFY}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <strong>भुगतान तिथि:</strong> {new Date(paymentDate).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>
        </div>

        {/* Paid Service Charges */}
        {paidYears.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">भुगतान किए गए वर्ष</h3>
            <div className="flex flex-wrap gap-2">
              {paidYears.map((year) => (
                <span
                  key={year}
                  className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm"
                >
                  {year}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Unpaid Service Charges */}
        {unpaidYears.length > 0 && (
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">अवैतनिक वर्ष</h3>
            <div className="space-y-2">
              {unpaidYears.map((year, index) => (
                <div key={year} className="flex items-center justify-between">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedYears.includes(year)}
                      onChange={() => handleYearToggle(year)}
                      disabled={
                        index > 0 &&
                        !selectedYears.includes(unpaidYears[index - 1]) &&
                        unpaidYears[0] !== year
                      }
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">{year}</span>
                  </label>
                  <span className="text-sm text-gray-600">
                    ₹{baseAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="p-4 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </div>

      {/* Payment Breakdown Section */}
      <div
      className="p-4 ">
      {selectedYears.length > 0 && (
        <div 
        // className="fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-4"
        className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div className="max-w-md mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Payment Breakdown</h3>
            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              {paymentBreakdown.breakdown.map((item) => (
                <div key={item.year} className="mb-2">
                  <p className="text-sm text-gray-600">
                    {item.year}: ₹{item.baseAmount.toLocaleString("en-IN")} (Base) +
                    ₹{item.lateFee.toLocaleString("en-IN")} ({item.percentage}% Late Fee) =
                    ₹{item.total.toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
              <hr className="my-2" />
              <p className="text-sm text-gray-600">
                कुल मूल राशि: ₹{paymentBreakdown.totalBase.toLocaleString("en-IN")}
              </p>
              <p className="text-sm text-gray-600">
                कुल विलंब शुल्क: ₹{paymentBreakdown.totalLateFees.toLocaleString("en-IN")}
              </p>
              <p className="text-lg font-bold text-gray-900">
                कुल राशि: ₹{paymentBreakdown.grandTotal.toLocaleString("en-IN")}
              </p>
            </div>
            <button
              onClick={handlePay}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Processing..." : "Pay Service Charges"}
            </button>
          </div>
        </div>
      )}

      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
        <div className="max-w-md mx-auto flex justify-between px-6 py-3">
          <button onClick={() => navigate("/property/home")} className="flex flex-col items-center text-gray-400">
            <Home className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <Wallet className="w-6 h-6" />
            <span className="text-xs mt-1">Payments</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <FileText className="w-6 h-6" />
            <span className="text-xs mt-1">Documents</span>
          </button>
          <button className="flex flex-col items-center text-gray-400">
            <User className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCharges;
