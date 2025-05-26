import axios from "@/api";
import EmployeeTable from "@/components/EmployeeTable";
import LeaveRequestForm from "@/components/LeaveRequestForm";
import MyLeaveList from "@/components/MyLeaveList";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import NotFound from "@/pages/NotFound";
import { Employee, LeaveRequest } from "@/types";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

// ✅ Import NotFound (hoặc tạo mới)

const DEFAULT_EMPLOYEE_ID = 1;

const EmployeeDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const navigate = useNavigate();
  const employeeId = DEFAULT_EMPLOYEE_ID;

  // ✅ Kiểm tra role trước khi render
  const role = localStorage.getItem("role");
  if (role !== "employee") {
    alert("You are not authorized to access this page");
    return <NotFound />;
  }

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const res = await axios.get("/employee");
        setEmployees(res.data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    }
    fetchEmployees();
  }, []);

  const handleLeaveRequest = (date: Date) => {
    setLeaveRequests((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        employeeId,
        employeeName:
          employees.find((e) => e.id === employeeId)?.name || "Unknown",
        date: date.toLocaleDateString(),
        status: "pending",
      },
    ]);
  };

  const handleRoleChange = (role: "employee" | "employer") => {
    localStorage.setItem("role", role);
    if (role === "employer") {
      navigate("/employer");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navbar
        currentRole="employee"
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
      />
      <div className="flex w-full">
        <Sidebar currentRole="employee" />
        <main className="flex-1 px-6 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6">Employees</h1>
                  <EmployeeTable employees={employees} />
                  <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-gray-500 mb-1">
                      View names, emails, and roles of your coworkers. Wage and
                      day-off balance are not visible here.
                    </p>
                  </div>
                </div>
              }
            />
            <Route
              path="leave"
              element={
                <div className="max-w-lg">
                  <h1 className="text-2xl font-bold mb-6">Request a Day Off</h1>
                  <LeaveRequestForm />
                </div>
              }
            />
            <Route
              path="my-leaves"
              element={
                <div>
                  <MyLeaveList />
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
