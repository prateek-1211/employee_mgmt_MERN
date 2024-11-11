import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import EmployeeManagementApp from './Components/EmployeeManagementApp';
import EmployeeDetails from './Components/EmployeeDetails';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import SignUp from './Components/SignUp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar /> {/* No need to pass onLoginClick */}
        <Routes>
          <Route path="/" element={<Navigate to="/employee" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;



// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
// import EmployeeManagementApp from './Components/EmployeeManagementApp';
// import EmployeeDetails from './Components/EmployeeDetails';
// import Navbar from './Components/Navbar';
// import Login from './Components/Login';

// function App() {
//   return (
//     <div>
//       <BrowserRouter>
//       <Navbar />
//         <Routes>
//           <Route path="/" element={<Navigate to="employee" />} />
//           <Route path="/login" element={<Navigate to="login" />} />
//           <Route path="/employee" element={<EmployeeManagementApp />} />
//           <Route path="/employee/:id" element={<EmployeeDetails />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
