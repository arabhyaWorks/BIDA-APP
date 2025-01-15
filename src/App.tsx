// import React from 'react';
// import {
//   Users,
//   FileText,
//   Home,
//   FileQuestion,
//   MessageSquare,
//   Menu,
// } from 'lucide-react';

// function App() {
//   return (

//     <div className="max-w-md mx-auto bg-white min-h-screen">
//       {/* Header with Logos */}
//       <div className="flex justify-between items-center px-4 py-2 bg-white shadow-xl fixed top-0 left-0 right-0 relative z-10">
//         <img
//           src="https://www.bidabhadohi.com/assets/images/newlogo.jpg"
//           alt="BIDA Logo"
//           className="h-12 w-12 object-contain"
//         />
//         <div className="text-center flex-1 mx-4 leading-none">
//           <h1 className="text-lg font-bold mb-0">Bhadohi Industrial</h1>
//           <h2 className="text-lg font-bold -mt-2">Development Authority</h2>
//         </div>
//         <img
//           src="https://www.bidabhadohi.com/assets/images/upLogo.png"
//           alt="UP Gov Logo"
//           className="h-12 w-12 object-contain"
//         />
//       </div>


//       {/* Hero Image */}
//       <div className="w-full h-48 relative">
//         <img
//           src="https://www.bidabhadohi.com/assets/downloadmedia/HomePage/Header/638472244415399064.jpg"
//           alt="BIDA Building"
//           className="w-full h-full object-cover"
//         />
//       </div>

    
//       {/* Menu Grid */}
//       <div className="grid grid-cols-2 gap-4 p-4 place-items-center">
//         {/* About BIDA */}
//         <div className="menu-button bg-about shadow-lg border border-gray-100 rounded-md ">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">About BIDA</h3>
//             <p className="menu-subtitle">Get Informations about BIDA</p>
//           </div>
//         </div>

//         {/* Organisation Chart */}
//         <div className="menu-button bg-org shadow-lg border border-gray-100 rounded-md">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">Organisation Chart</h3>
//             <p className="menu-subtitle">Know about BIDA officers</p>
//           </div>
//         </div>

//         {/* Bye Laws & Acts */}
//         <div className="menu-button bg-laws shadow-lg border border-gray-100 rounded-md">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">Bye Laws & Acts</h3>
//             <p className="menu-subtitle">Bye laws & acts under BIDA</p>
//           </div>
//         </div>

//         {/* Property & EMIs */}
//         <div className="menu-button bg-property shadow-lg border border-gray-100 rounded-md">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">Property & EMIs</h3>
//             <p className="menu-subtitle">
//               Property & pay service charge & EMIs
//             </p>
//           </div>
//         </div>

//         {/* Complaints Filing */}
//         <div className="menu-button bg-complaints shadow-lg border border-gray-100 rounded-md">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">Complaints Filing</h3>
//             <p className="menu-subtitle">File Complaints to BIDA authority</p>
//           </div>
//         </div>

//         {/* Others */}
//         <div className="menu-button bg-others shadow-lg border border-gray-100 rounded-md">
//           <div className="menu-content p-4">
//             <h3 className="menu-title">Others</h3>
//             <p className="menu-subtitle">
//               Access all other information & Features
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutBida from './pages/AboutBida';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutBida />} />
      </Routes>
    </Router>
  );
}

export default App;