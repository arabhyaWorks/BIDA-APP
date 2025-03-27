import React, { useState, useRef } from 'react';
import { ArrowLeft, Upload, FileText, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FileUpload {
  file: File | null;
  preview: string | null;
}

function Documents() {
  const navigate = useNavigate();
  const [aadharUpload, setAadharUpload] = useState<FileUpload>({ file: null, preview: null });
  const [panUpload, setPanUpload] = useState<FileUpload>({ file: null, preview: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const aadharInputRef = useRef<HTMLInputElement>(null);
  const panInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 300 * 1024; // 300KB in bytes

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: 'aadhar' | 'pan') => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      setError(`${type === 'aadhar' ? 'Aadhaar' : 'PAN'} card file size must be less than 300KB`);
      return;
    }

    // Check file type
    if (file.type !== 'application/pdf') {
      setError(`${type === 'aadhar' ? 'Aadhaar' : 'PAN'} card must be a PDF file`);
      return;
    }

    setError('');
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'aadhar') {
        setAadharUpload({ file, preview: URL.createObjectURL(file) });
      } else {
        setPanUpload({ file, preview: URL.createObjectURL(file) });
      }
    };
    reader.readAsDataURL(file);
  };

  const removeFile = (type: 'aadhar' | 'pan') => {
    if (type === 'aadhar') {
      if (aadharUpload.preview) URL.revokeObjectURL(aadharUpload.preview);
      setAadharUpload({ file: null, preview: null });
      if (aadharInputRef.current) aadharInputRef.current.value = '';
    } else {
      if (panUpload.preview) URL.revokeObjectURL(panUpload.preview);
      setPanUpload({ file: null, preview: null });
      if (panInputRef.current) panInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aadharUpload.file || !panUpload.file) {
      setError('Please upload both Aadhaar and PAN card');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would normally upload the files to your server
      console.log('Uploading files:', {
        aadhar: aadharUpload.file.name,
        pan: panUpload.file.name
      });

      // Clear the form
      removeFile('aadhar');
      removeFile('pan');
      setError('');
    } catch (err) {
      setError('Failed to upload documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center shadow-sm">
        <button 
          onClick={() => navigate('/property/home')}
          className="p-2 hover:bg-gray-100 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold">दस्तावेज़</h1>
          <p className="text-sm text-gray-500">Documents</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Instructions */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Please upload clear PDF scans of your Aadhaar card (front and back) and PAN card.
            <span className="block mt-1 text-red-600 font-medium">
              Maximum file size: 300KB per document
            </span>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Aadhaar Upload */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">आधार कार्ड</h3>
            <p className="text-sm text-gray-500">Aadhaar Card (Front & Back)</p>
          </div>

          {!aadharUpload.file ? (
            <div 
              onClick={() => aadharInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload Aadhaar card</p>
              <p className="text-xs text-gray-500 mt-1">PDF only, max 300KB</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{aadharUpload.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(aadharUpload.file.size / 1024).toFixed(1)}KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile('aadhar')}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          )}
          
          <input
            ref={aadharInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, 'aadhar')}
            className="hidden"
          />
        </div>

        {/* PAN Upload */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-900">पैन कार्ड</h3>
            <p className="text-sm text-gray-500">PAN Card</p>
          </div>

          {!panUpload.file ? (
            <div 
              onClick={() => panInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-colors"
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click to upload PAN card</p>
              <p className="text-xs text-gray-500 mt-1">PDF only, max 300KB</p>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{panUpload.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(panUpload.file.size / 1024).toFixed(1)}KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFile('pan')}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          )}
          
          <input
            ref={panInputRef}
            type="file"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e, 'pan')}
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !aadharUpload.file || !panUpload.file}
          className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center
            ${loading || !aadharUpload.file || !panUpload.file
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            'Upload Documents'
          )}
        </button>
      </form>
    </div>
  );
}

export default Documents;