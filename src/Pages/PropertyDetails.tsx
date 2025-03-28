import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Bell,
  Home,
  Wallet,
  FileText,
  User,
  ArrowLeft,
} from "lucide-react";
import { getProperties } from "../services/api";

interface PropertyRecord {
  property_unique_id: string;
  yojna_id: string;
  yojna_name: string;
  avanti_ka_naam: string;
  sampatti_sreni: string;
  avanti_sampatti_sankhya?: string;
  avantan_dinank: string; // Added for service charge calculation
}

interface InstallmentPlan {
  kul_yog: string;
  paid_amount: string;
  remaining_balance: string;
  ideal_kisht_mool: string;
  ideal_number_of_installments: number;
  number_of_installment_paid: number;
  first_installment_due_date: string;
}

interface Installment {
  // Define installment fields as needed
}

interface ServiceCharge {
  service_charge_financial_year: string;
  service_charge_amount: string;
  service_charge_late_fee: string;
  service_charge_payment_date: string;
}

interface PropertyData {
  propertyRecord: PropertyRecord;
  installmentPlan: InstallmentPlan;
  installments: Installment[];
  serviceCharges: ServiceCharge[];
}

// Utility Functions for Service Charges
const getFinancialYearFromDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan, 3 = Apr
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

// Helper function for next installment due date
function getNextInstallmentDueDate(
  firstInstallmentDate: string,
  installmentsPaid: number
): string {
  try {
    const [dayStr, monthStr, yearStr] = firstInstallmentDate.split("-");
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    const dateObj = new Date(year, month - 1, day);
    const monthsToAdd = 3 * installmentsPaid;
    dateObj.setMonth(dateObj.getMonth() + monthsToAdd);

    const newDay = String(dateObj.getDate()).padStart(2, "0");
    const newMon = String(dateObj.getMonth() + 1).padStart(2, "0");
    const newYr = String(dateObj.getFullYear());

    return `${newDay}-${newMon}-${newYr}`;
  } catch {
    return "N/A";
  }
}

function PropertyDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [nextDueDate, setNextDueDate] = useState("N/A");

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const phone = localStorage.getItem("bida_phone");
        if (!phone) throw new Error("Phone number not found in local storage");

        const response = await getProperties(phone);
        const selectedProperty = response.data.find(
          (p: PropertyData) => p.propertyRecord.property_unique_id === id
        );

        if (!selectedProperty) {
          throw new Error("Property not found");
        }

        setProperty(selectedProperty);

        const {
          first_installment_due_date,
          number_of_installment_paid,
          ideal_number_of_installments,
        } = selectedProperty.installmentPlan;

        if (number_of_installment_paid >= ideal_number_of_installments) {
          setNextDueDate("All installments paid");
        } else {
          const computedDate = getNextInstallmentDueDate(
            first_installment_due_date,
            number_of_installment_paid
          );
          setNextDueDate(computedDate);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load property details"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  // Service Charge Status Calculation
  const getServiceChargeStatus = () => {
    if (!property) return { firstPayableFY: "N/A", paidYears: [], unpaidYears: [] };

    const allotmentDate = property.propertyRecord.avantan_dinank;
    const currentDate = new Date().toISOString().split("T")[0];
    const billedYears = generateBilledYears(allotmentDate, currentDate);
    const firstPayableFY = billedYears[0] || "N/A";

    const paidYears = property.serviceCharges.map(
      (charge) => charge.service_charge_financial_year
    );
    const unpaidYears = billedYears.filter(
      (year) => !paidYears.includes(year)
    );

    return { firstPayableFY, paidYears, unpaidYears };
  };

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
          <p>{error || "Property not found"}</p>
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

  const {
    propertyRecord,
    installmentPlan,
    installments,
    serviceCharges,
  } = property;

  const {
    kul_yog,
    paid_amount,
    remaining_balance,
    ideal_kisht_mool,
    ideal_number_of_installments,
    number_of_installment_paid,
  } = installmentPlan;

  const totalAmount = parseFloat(kul_yog);
  const totalPaid = parseFloat(paid_amount);
  const totalRemaining = parseFloat(remaining_balance);
  const nextEMIAmount = parseFloat(ideal_kisht_mool);

  const installmentsPaid = number_of_installment_paid;
  const totalEmis = ideal_number_of_installments;

  const { firstPayableFY, paidYears, unpaidYears } = getServiceChargeStatus();

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <button
          onClick={() => navigate("/property/home")}
          className="p-2 hover:bg-gray-100 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Property Details</h1>
      </div>

      {/* Property Card */}
      <div className="p-4">
        <div className="bg-white rounded-xl p-4 shadow-sm space-y-2">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">
              {propertyRecord.sampatti_sreni}
              {propertyRecord.avanti_sampatti_sankhya
                ? ` - ${propertyRecord.avanti_sampatti_sankhya}`
                : ""}
            </h3>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                {propertyRecord.yojna_name}
              </span>
              <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-sm">
                {propertyRecord.property_unique_id}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 py-2">
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">कुल योग</p>
              <p className="font-bold text-gray-900">
                ₹{Math.round(totalAmount).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">कुल जमा धनराशी</p>
              <p className="font-bold text-green-700">
                ₹{Math.round(totalPaid).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">शेष धनराशी</p>
              <p className="font-bold text-red-700">
                ₹{Math.round(totalRemaining).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* EMI Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-gray-600">EMI Progress</span>
              <span className="font-medium">
                {installmentsPaid} of {totalEmis} EMIs
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{
                  width: `${(installmentsPaid / totalEmis) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Next EMI Section */}
      <div className="p-4 pt-2">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Next EMI Due
            </h3>
            <button className="p-1">
              <Bell className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {installmentsPaid >= totalEmis ? (
            <div className="text-center py-4">
              <p className="text-gray-500">All installments are paid!</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-baseline mb-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Amount</p>
                  <p className="text-2xl font-bold">
                    ₹{nextEMIAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 text-sm mb-1">Due Date</p>
                  <p className="text-red-500 font-semibold">
                    {nextDueDate || "N/A"}
                  </p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate("/property/pay-emi", {
                    state: {
                      propertyRecord,
                      installmentPlan,
                      installments,
                      serviceCharges,
                      nextDueDate,
                    },
                  })
                }
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Pay EMI
              </button>

              <div className="flex justify-between items-center mt-3">
                <p className="text-sm text-gray-600">
                  {installmentsPaid} of {totalEmis} EMIs paid
                </p>
                <button
                  onClick={() =>
                    navigate("/property/installment-schedule", {
                      state: { property },
                    })
                  }
                  className="text-sm text-blue-600 font-medium"
                >
                  View Schedule →
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Service Charge Status Section */}
      <div className="p-4 pt-2">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Service Charge Status
          </h3>
          <div className="space-y-4">
            <div className="text-sm">
              <p className="text-gray-600">
                <strong>पहला देय वित्तीय वर्ष:</strong> {firstPayableFY}
              </p>
            </div>

            {paidYears.length > 0 && (
              <div className="text-sm">
                <p className="text-gray-600 font-medium mb-1">भुगतान किए गए वर्ष:</p>
                <div className="flex flex-wrap gap-2">
                  {paidYears.map((year) => (
                    <span
                      key={year}
                      className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {unpaidYears.length > 0 && (
              <div className="text-sm">
                <p className="text-gray-600 font-medium mb-1">अवैतनिक वर्ष:</p>
                <div className="flex flex-wrap gap-2">
                  {unpaidYears.map((year) => (
                    <span
                      key={year}
                      className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs"
                    >
                      {year}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {(paidYears.length > 0 || unpaidYears.length > 0) && (
              <button
                onClick={() =>
                  navigate("/property/service-charges", {
                    state: { property },
                  })
                }
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-4"
              >
                Manage Service Charges
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      {/* <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-md mx-auto flex justify-between px-6 py-3">
          <button className="flex flex-col items-center text-blue-600">
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
      </div> */}
    </div>
  );
}

export default PropertyDetails;