import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Department {
  hindi: string;
  english: string;
  subsections?: {
    hindi: string;
    english: string;
    children?: {
      hindi: string;
      english: string;
    }[];
  }[];
}

function OrganizationChart() {
  const navigate = useNavigate();
  const [expandedDepts, setExpandedDepts] = useState<number[]>([]);

  const departments: Department[] = [
    {
      hindi: "कार्मिक अनुभाग",
      english: "Personnel Section",
      subsections: [
        {
          hindi: "कार्यालय अधीक्षक",
          english: "Office Superintendent",
          children: [
            { hindi: "वरिष्ठ लिपिक", english: "Senior Clerk" },
            { hindi: "कनिष्ठ लिपिक", english: "Junior Clerk" }
          ]
        },
        {
          hindi: "आशुलिपिक",
          english: "Stenographer",
          children: [
            { hindi: "स्टेनो टाइपिस्ट", english: "Steno Typist" },
            { hindi: "कनिष्ठ लिपिक", english: "Junior Clerk" }
          ]
        }
      ]
    },
    {
      hindi: "तकनीकी अनुभाग",
      english: "Technical Section",
      subsections: [
        {
          hindi: "अधिशासी अभियन्ता",
          english: "Executive Engineer",
          children: [
            { hindi: "सहायक अभियन्ता", english: "Assistant Engineer" },
            { hindi: "अवर अभियन्ता सिविल", english: "Junior Engineer Civil" },
            { hindi: "अवर अभियन्ता विद्युत", english: "Junior Engineer Electrical" }
          ]
        }
      ]
    },
    {
      hindi: "वित्त एवं लेखानुभाग",
      english: "Finance & Accounts",
      subsections: [
        {
          hindi: "वित्त एवं लेखाधिकारी",
          english: "Finance & Accounts Officer",
          children: [
            { hindi: "वरिष्ठ लेखाकार कम इन्टर्नल ऑडिटर", english: "Senior Accountant cum Internal Auditor" },
            { hindi: "रोकड़िया", english: "Cashier" },
            { hindi: "लेखा लिपिक", english: "Accounts Clerk" }
          ]
        }
      ]
    },
    {
      hindi: "विधि अनुभाग",
      english: "Legal Section",
      subsections: [
        {
          hindi: "विधि सहायक",
          english: "Legal Assistant"
        }
      ]
    },
    {
      hindi: "नियोजन अनुभाग",
      english: "Planning Section",
      subsections: [
        {
          hindi: "वास्तुविद् नियोजक",
          english: "Architect Planner",
          children: [
            { hindi: "आर्क कम प्लानिंग सहायक", english: "Architect cum Planning Assistant" },
            { hindi: "मुख्य सांख्यिकीविद्", english: "Chief Statistician" },
            { hindi: "प्रधान मानचित्रकार", english: "Principal Cartographer" }
          ]
        }
      ]
    },
    {
      hindi: "स्टोर अनुभाग",
      english: "Store Section",
      subsections: [
        {
          hindi: "स्टोर लिपिक",
          english: "Store Clerk"
        }
      ]
    },
    {
      hindi: "सम्पत्ति अनुभाग",
      english: "Property Section",
      subsections: [
        {
          hindi: "मार्केटिंग मैनेजर",
          english: "Marketing Manager",
          children: [
            { hindi: "कनिष्ठ लिपिक", english: "Junior Clerk" }
          ]
        }
      ]
    }
  ];

  const toggleDepartment = (index: number) => {
    setExpandedDepts(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen pb-8">
      {/* Header */}
      <div className="flex items-center px-4 py-4 bg-white shadow-md sticky top-0 z-10">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-4">Organisation Chart</h1>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Introduction */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            The organizational structure of BIDA is designed to efficiently manage industrial development
            and ensure smooth operations across all departments.
          </p>
        </div>

        {/* Organizational Hierarchy */}
        <div className="space-y-4">
          {/* Top Level */}
          <div className="bg-blue-700 text-white p-4 rounded-lg text-center shadow-lg">
            <h3 className="text-xl font-bold">अध्यक्ष</h3>
            <p className="text-sm opacity-90">Chairman</p>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-blue-700"></div>
          </div>

          {/* CEO Level */}
          <div className="bg-blue-600 text-white p-4 rounded-lg text-center shadow-lg">
            <h3 className="text-lg font-bold">मुख्य कार्यपालक अधिकारी</h3>
            <p className="text-sm opacity-90">Chief Executive Officer</p>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-blue-600"></div>
          </div>

          {/* Additional Chief Executive Officer */}
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center shadow-lg">
            <h3 className="text-lg font-bold">अपर मुख्य कार्यपालक अधिकारी</h3>
            <p className="text-sm opacity-90">Additional Chief Executive Officer</p>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <div className="w-0.5 h-6 bg-blue-500"></div>
          </div>

          {/* Deputy CEO */}
          <div className="bg-blue-400 text-white p-4 rounded-lg text-center shadow-lg">
            <h3 className="text-lg font-bold">उप मुख्य कार्यपालक अधिकारी</h3>
            <p className="text-sm opacity-90">Deputy Chief Executive Officer</p>
          </div>

          {/* Departments Section */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Departments</h3>
            
            {/* Department Grid */}
            <div className="space-y-4">
              {departments.map((dept, index) => (
                <div 
                  key={index}
                  className="border border-blue-200 rounded-lg overflow-hidden"
                >
                  {/* Department Header */}
                  <button
                    onClick={() => toggleDepartment(index)}
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <h4 className="font-bold text-blue-800 text-left">{dept.hindi}</h4>
                      <p className="text-sm text-gray-600">{dept.english}</p>
                    </div>
                    {dept.subsections && (
                      expandedDepts.includes(index) ? 
                        <ChevronDown className="text-blue-800" /> : 
                        <ChevronRight className="text-blue-800" />
                    )}
                  </button>

                  {/* Subsections */}
                  {expandedDepts.includes(index) && dept.subsections && (
                    <div className="bg-gray-50 border-t border-blue-100">
                      {dept.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="p-4 border-b border-blue-100 last:border-b-0">
                          <div className="font-semibold text-blue-700">
                            {subsection.hindi}
                            <span className="text-sm text-gray-600 block">
                              {subsection.english}
                            </span>
                          </div>
                          
                          {/* Children */}
                          {subsection.children && (
                            <div className="mt-2 pl-4 space-y-2">
                              {subsection.children.map((child, childIndex) => (
                                <div key={childIndex} className="text-sm">
                                  <span className="text-blue-600">{child.hindi}</span>
                                  <span className="text-gray-500 block">
                                    {child.english}
                                  </span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationChart;