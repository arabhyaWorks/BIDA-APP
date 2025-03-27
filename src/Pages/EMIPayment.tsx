import React, { useEffect, useState } from "react";
import { ArrowLeft, Building2, Calendar, AlertCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

function EMIPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { propertyRecord, installmentPlan, installments } = location.state || {};
  // const { propertyRecord, installmentPlan, installments } = {
  //   propertyRecord: {
  //     property_unique_id: "BIDA-MART-20250327-0002",
  //     yojna_id: "BIDA-MART",
  //     yojna_name: "बीडा मार्ट",
  //     avanti_ka_naam: "R Arabhaya",
  //     pita_pati_ka_naam: "श्री रामबरन सीता राम",
  //     avanti_ka_sthayi_pata:
  //       "महात्मा गाँधी नगर, ए0 ब्लाक रोड निगम, डी0टी0 करनानी कालेज, उलहसन नगर-1, थाणे, महाराष्ट्र",
  //     avanti_ka_vartaman_pata: "उपरोक्त",
  //     mobile_no: "9452624111",
  //     aadhar_number: null,
  //     sampatti_sreni: "आवासीय",
  //     avanti_sampatti_sankhya: "123",
  //     property_floor_type: "UGF",
  //     kshetrafal: null,
  //     kabja_dinank: "31-12-2024",
  //     bhavan_nirman: "Yes",
  //     panjikaran_dhanrashi: "1700000.00",
  //     avantan_dhanrashi: "1700000.00",
  //     panjikaran_dinank: "31-12-2024",
  //     avantan_dinank: "31-12-2024",
  //     vikray_mulya: "8292949.00",
  //     auction_keemat: "8322949.00",
  //     lease_rent_dhanrashi: "30000.00",
  //     free_hold_dhanrashi: "30000.00",
  //     park_charge: "10000.00",
  //     corner_charge: "10000.00",
  //     atirikt_bhoomi_ki_dhanrashi: "10000.00",
  //     punarjivit_shulk: "10000.00",
  //     praman_patra_shulk: "10000.00",
  //     vigyapan_shulk: "10000.00",
  //     nibandhan_shulk: "10000.00",
  //     labansh: "10000",
  //     anya: "10000",
  //     nibandhan_dinank: "31-12-2024",
  //   },
  //   installmentPlan: {
  //     plan_id: "PLAN-BIDA-MART-20250327-0002",
  //     avshesh_dhanrashi: "4922949.00",
  //     interest_rate: "12.00",
  //     time_period: 1,
  //     total_interest_amount: "590753.88",
  //     total_interest_amount_div_2: "295376.94",
  //     kul_yog: "5218325.94",
  //     paid_amount: "3913746.00",
  //     remaining_balance: "1304579.94",
  //     ideal_number_of_installments: 4,
  //     number_of_installment_paid: 3,
  //     ideal_installment_amount_per_installment: "1304581.49",
  //     ideal_kisht_mool: "1230737.25",
  //     ideal_kisht_byaj: "73844.24",
  //     late_fee_per_day: "643.36",
  //     first_installment_due_date: "31-12-2024",
  //     next_due_date: "30-09-2025",
  //   },
  //   installments: [
  //     {
  //       payment_id: "PAY-1743046717691-3qiy3",
  //       payment_number: 1,
  //       installment_amount: "1230737.00",
  //       interest_amount: "73845.00",
  //       late_fee: "643.36",
  //       payment_date: "01-04-2025",
  //       payment_due_date: "31-03-2025",
  //       payment_amount: "1304582.00",
  //       kisht_mool_paid: "1230737.00",
  //       kisht_byaj_paid: "73845.00",
  //       total_payment_amount_with_late_fee: "1305225.36",
  //       number_of_days_delayed: 1,
  //       late_fee_amount: "643.36",
  //     },
  //     {
  //       payment_id: "PAY-1743057397209-xnbz2",
  //       payment_number: 2,
  //       installment_amount: "1230737.00",
  //       interest_amount: "73845.00",
  //       late_fee: "643.36",
  //       payment_date: "31-03-2025",
  //       payment_due_date: "30-03-2025",
  //       payment_amount: "1304582.00",
  //       kisht_mool_paid: "1230737.00",
  //       kisht_byaj_paid: "73845.00",
  //       total_payment_amount_with_late_fee: "1305225.36",
  //       number_of_days_delayed: 1,
  //       late_fee_amount: "643.36",
  //     },
  //     {
  //       payment_id: "PAY-1743057423998-oluic",
  //       payment_number: 2,
  //       installment_amount: "1230737.00",
  //       interest_amount: "73845.00",
  //       late_fee: "643.36",
  //       payment_date: "31-03-2025",
  //       payment_due_date: "30-03-2025",
  //       payment_amount: "1304582.00",
  //       kisht_mool_paid: "1230737.00",
  //       kisht_byaj_paid: "73845.00",
  //       total_payment_amount_with_late_fee: "1305225.36",
  //       number_of_days_delayed: 1,
  //       late_fee_amount: "643.36",
  //     },
  //   ],
  //   serviceCharges: [
  //     {
  //       service_charge_id: "SC-1743046717732-wamn4",
  //       service_charge_financial_year: "2024-2025",
  //       service_charge_amount: "11005.00",
  //       service_charge_late_fee: "0.00",
  //       service_charge_total: "11005.00",
  //       service_charge_payment_date: "31-03-2025",
  //     },
  //   ],
  // };

  // Calculate the next installment number
  const nextInstallmentNumber =
    (installmentPlan?.number_of_installment_paid || 0) + 1;

  // Calculate due date based on installment number
  const calculateDueDate = () => {
    if (!installmentPlan?.first_installment_due_date) return null;

    const firstDueDate = new Date(
      installmentPlan.first_installment_due_date.split("-").reverse().join("-")
    );
    const monthsToAdd = (nextInstallmentNumber - 1) * 3; // 3 months per installment

    const dueDate = new Date(firstDueDate);
    dueDate.setMonth(dueDate.getMonth() + monthsToAdd);

    return dueDate;
  };

  const dueDate = calculateDueDate();
  const today = new Date();
  const daysDelayed = dueDate
    ? Math.max(
        0,
        Math.floor(
          (today.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)
        )
      )
    : 0;

  // Calculate amounts
  const installmentAmount = parseFloat(
    installmentPlan?.ideal_kisht_mool || "0"
  );
  const interestAmount = parseFloat(installmentPlan?.ideal_kisht_byaj || "0");
  const lateFeePerDay = parseFloat(installmentPlan?.late_fee_per_day || "0");
  const lateFeeAmount = daysDelayed * lateFeePerDay;
  const totalAmount = installmentAmount + interestAmount + lateFeeAmount;

  const handlePayment = async () => {
    if (!installmentPlan?.plan_id || !dueDate) return;

    setLoading(true);
    setError(null);

    try {
      const paymentData = {
        plan_id: installmentPlan.plan_id,
        payment_number: nextInstallmentNumber,
        installment_amount: installmentAmount.toFixed(2),
        interest_amount: interestAmount.toFixed(2),
        late_fee: lateFeeAmount.toFixed(2),
        payment_date: today.toISOString().split("T")[0],
        payment_due_date: dueDate.toISOString().split("T")[0],
        payment_amount: (installmentAmount + interestAmount).toFixed(2),
        kisht_mool_paid: installmentAmount.toFixed(2),
        kisht_byaj_paid: interestAmount.toFixed(2),
        total_payment_amount_with_late_fee: totalAmount.toFixed(2),
        number_of_days_delayed: daysDelayed,
        late_fee_amount: lateFeeAmount.toFixed(2),
      };

      console.log(paymentData);

      const response = await fetch(
        "http://localhost:3000/api/payments/installment-payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("bida_token")}`,
          },
          body: JSON.stringify([paymentData]),
        }
      );

      if (!response.ok) throw new Error("Payment failed");

      navigate("/property/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("bida_token");
    if (!token || !location.state) {
      // navigate("/property");
      console.log(token, location.state);
    }
  }, [navigate, location]);

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <button
          onClick={() => navigate("/property/home")}
          className="p-2 hover:bg-gray-100 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Pay EMI</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-start space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {propertyRecord?.avanti_sampatti_sankhya || "N/A"}
              </h2>
              <p className="text-gray-500">
                Property ID: {propertyRecord?.property_unique_id || "N/A"}
              </p>
              <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                {propertyRecord?.yojna_name || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-3 bg-amber-50 rounded-lg mb-6">
            <Calendar className="w-5 h-5 text-amber-600" />
            <p className="text-sm text-amber-800">
              किस्त संख्या / EMI Number:{" "}
              <span className="font-semibold">{nextInstallmentNumber}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-semibold">किस्त जमा धनराशि</p>
                <p className="text-sm text-gray-600">EMI Amount</p>
              </div>
              <p className="text-lg font-bold">
                ₹
                {installmentAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-semibold">
                  किस्त ब्याज धनराशि
                </p>
                <p className="text-sm text-gray-600">Interest Amount</p>
              </div>
              <p className="text-lg font-bold">
                ₹
                {interestAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>

            {daysDelayed > 0 && (
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-gray-900 font-semibold">
                    विलंब ब्याज धनराशि
                  </p>
                  <p className="text-sm text-gray-600">Late Fee</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-500">
                    ₹
                    {lateFeeAmount.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    ₹
                    {lateFeePerDay.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}{" "}
                    × {daysDelayed} days
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="text-gray-900 font-semibold">देय तिथि</p>
                <p className="text-sm text-gray-600">Due Date</p>
              </div>
              <p className="text-lg font-bold text-red-500">
                {dueDate?.toLocaleDateString("en-IN") || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 mt-6 p-4 bg-red-50 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              A late fee of ₹
              {lateFeePerDay.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}{" "}
              per day will be charged after the due date
            </p>
          </div>

          <div className="mt-6 p-4 bg-blue-600 rounded-xl">
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="text-white font-bold">कुल धनराशि</p>
                <p className="text-sm text-blue-200">Total Amount</p>
              </div>
              <p className="text-2xl font-bold text-white">
                ₹
                {totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </p>
            </div>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-medium transition-colors text-lg
              ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
              }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EMIPayment;
