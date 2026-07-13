import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Employee from "../pages/Employee/Employee";
import User from "../pages/User/User";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
         <Route
    path="/dashboard"
    element={<Dashboard />}
/>

<Route
    path="/users"
    element={<User />}
/>

<Route
    path="/employees"
    element={<Employee />}
/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
