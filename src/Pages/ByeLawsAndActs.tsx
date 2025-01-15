import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Section {
  title: string;
  subsections: {
    name: string;
    pdfUrl: string;
  }[];
}

function ByeLawsAndActs() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const sections: Section[] = [
    {
      title: "Building Bye Laws",
      subsections: [
        {
          name: "Building Bye Laws 2014",
          pdfUrl: "https://www.bidabhadohi.com/assets/downloadmedia/regulation/building-byelaws.pdf"
        },
        {
          name: "Building Bye Laws 2019",
          pdfUrl: "https://www.bidabhadohi.com/assets/downloadmedia/regulation/2019.pdf"
        }
      ]
    },
    {
      title: "Acts",
      subsections: [
        {
          name: "Uttar Pradesh Industrial Area Development Act, 1976",
          pdfUrl: "https://www.bidabhadohi.com/assets/siteContent/1976UP6.pdf"
        },
        {
          name: "BIDA Notification",
          pdfUrl: "https://www.bidabhadohi.com/assets/siteContent/bidaGazet.pdf"
        }
      ]
    }
  ];

  const handlePdfView = (pdfUrl: string) => {
    window.open(pdfUrl, '_blank');
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
        <h1 className="text-2xl font-bold ml-4">Bye Laws & Acts</h1>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6">
        {/* Introduction */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">
            Access BIDA's official building bye laws and acts that govern industrial development
            and operations in the Bhadohi region.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section) => (
            <div 
              key={section.title}
              className="border border-blue-200 rounded-lg overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => setExpandedSection(
                  expandedSection === section.title ? null : section.title
                )}
                className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors"
              >
                <h2 className="text-lg font-semibold text-blue-800">{section.title}</h2>
                {expandedSection === section.title ? 
                  <ChevronDown className="text-blue-800" /> : 
                  <ChevronRight className="text-blue-800" />
                }
              </button>

              {/* Subsections */}
              {expandedSection === section.title && (
                <div className="bg-gray-50 border-t border-blue-100">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.name}
                      onClick={() => handlePdfView(subsection.pdfUrl)}
                      className="w-full text-left p-4 hover:bg-gray-100 transition-colors border-b border-blue-100 last:border-b-0"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-blue-600 hover:text-blue-800">
                          {subsection.name}
                        </span>
                        <span className="text-sm text-gray-500">View PDF</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ByeLawsAndActs;