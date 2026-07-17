import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";

import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import User from "../pages/User/User";
import Employee from "../pages/Employee/Employee";
import Department from "../pages/Department/Department";
import Attendance from "../pages/Attendance/Attendance";
import Leave from "../pages/Leave/Leave";
import Payroll from "../pages/Payroll/Payroll";

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
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/users" element={<User />} />

          <Route path="/employees" element={<Employee />} />

          <Route path="/departments" element={<Department />} />

          <Route path="/attendance" element={<Attendance />} />

          <Route path="/leave" element={<Leave />} />
          <Route path="/payroll" element={<Payroll />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
