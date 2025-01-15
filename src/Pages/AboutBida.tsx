import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function AboutBida() {
  const navigate = useNavigate();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white shadow-md">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-4">About BIDA</h1>
      </div>

      {/* Main Image */}
      <div className="w-full h-48 relative">
        <img
          src="https://www.bidabhadohi.com/assets/downloadmedia/HomePage/Header/bida0.jpg"
          alt="BIDA Building"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-6">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">About BIDA</h2>
          <p className="text-gray-700 leading-relaxed">
            The authority has been established through notification dated 25 August 1981 under the U.P. Industrial Area Development Act 1976 for Industrial and Urban planned development of Bhadohi Carpet area, providing basic facilities to carpet weavers, solving infrastructure problems and promoting export of Carpet. The Jurisdiction of the authority includes Bhadohi Town and the area falling within a radius of eight kilometres, area of 305 square km, which includes a total of 345 revenue villages.
          </p>
        </div>

        {/* Functions Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">Functions of Authority</h2>
          <div className="space-y-3">
            {[
              "Land acquisition/Reclamation etc. for planned development.",
              "Preparing plans for the development of the declared area.",
              "Demarcation and development of sites as per plans.",
              "To establish Infrastructure for industrial, commercial and residential purposes.",
              "Providing public facilities (roads, water supply and drainage etc.).",
              "Regulating construction of buildings and establishment of industries.",
              "Planning of notified area and determination of specific purposes.",
              "To allocate and transfer either by way of sale or lease or otherwise plots of land for industrial, commercial, or residential purposes."
            ].map((item, index) => (
              <div key={index} className="flex items-start">
                <span className="font-semibold mr-2">{index + 1}.</span>
                <p className="text-gray-700 text-align: justify">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="text-xl font-bold mb-3">Reach us</h2>
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">
                Mailing Address (Bhadohi Industrial Development Authority)
              </h3>
              <p className="text-gray-700">
                Bhadohi Industrial Development Authority (BIDA), Near Rajpura Chauraha, District - Bhadohi, 221401 Uttar Pradesh, India
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-semibold">Phone:</span> 05414-226610
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Email:</span>{' '}
                <a href="mailto:bidabhadohi@rediffmail.com" className="text-blue-600">
                  bidabhadohi@rediffmail.com
                </a>
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Public dealing timing:</span> 10:00 AM to 5:00 PM
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Working Days:</span> Monday to Saturday
              </p>
            </div>
          </div>
        </div>

        {/* Who's Who Section */}
        <div>
          <h2 className="text-xl font-bold mb-3">Who's Who</h2>
          <div className="overflow-x-auto">
            <div className="space-y-4">
              {[
                { name: "Shri Vishal Singh, IAS", designation: "Chief Executive Officer", mobile: "+91 9454417568" },
                { name: "Smt Anita Devi", designation: "Dy. CEO", mobile: "9044927233" },
                { name: "Shri Aman Srivastav", designation: "Finance Officer", mobile: "-" },
                { name: "Shri Amitabh Ranjan Das", designation: "Marketing Manager", mobile: "9118711511" },
                { name: "Shri Ram Darash Bharti", designation: "Assistant Engineer", mobile: "9415443562" },
                { name: "Shri Pradumn Kumar Sinha", designation: "Junior Engineer (Electrical)", mobile: "8853082162" },
                { name: "Shri Vinod Kumar", designation: "Junior Engineer (Civil)", mobile: "9140303915" },
                { name: "Shri Dwivesh Kumar Mishra", designation: "Junior Engineer (Civil)", mobile: "9415877832" },
                { name: "Aditya yadav", designation: "Junior Engineer (Civil)", mobile: "8687939777" },
                { name: "Shri Ashish Kumar", designation: "Steno", mobile: "9889711360" },
                { name: "Shri Mithai Prasad", designation: "Office Superintendent", mobile: "9451138310" }
              ].map((person, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{person.name}</h3>
                      <p className="text-gray-600 text-sm">{person.designation}</p>
                    </div>
                    <p className="text-gray-700 text-sm">{person.mobile}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutBida;