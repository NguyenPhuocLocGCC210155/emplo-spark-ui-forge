
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import EmployeeTable from "@/components/EmployeeTable";
import LeaveRequestForm from "@/components/LeaveRequestForm";
import MyLeaveList from "@/components/MyLeaveList";
import { Employee, LeaveRequest } from "@/types";
import { useNavigate, Routes, Route } from "react-router-dom";

// Initial mock employees (simulate "all employees" view)
const EMPLOYEES: Employee[] = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice.smith@company.com",
    role: "Developer",
    wage: 70000,
    dayOffBalance: 12,
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob.johnson@company.com",
    role: "Designer",
    wage: 67000,
    dayOffBalance: 8,
  },
  {
    id: 3,
    name: "Carol Lee",
    email: "carol.lee@company.com",
    role: "QA Tester",
    wage: 62000,
    dayOffBalance: 15,
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@company.com",
    role: "Support",
    wage: 55000,
    dayOffBalance: 16,
  },
];

const DEFAULT_EMPLOYEE_ID = 1; // Simulate currently logged in employee

const EmployeeDashboard: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const navigate = useNavigate();
  const employeeId = DEFAULT_EMPLOYEE_ID; // Simulated for demo

  // Simulate leave request submission
  const handleLeaveRequest = (date: Date) => {
    setLeaveRequests((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        employeeId: employeeId,
        employeeName:
          EMPLOYEES.find((e) => e.id === employeeId)?.name || "Unknown",
        date: date.toLocaleDateString(),
        status: "pending",
      },
    ]);
  };

  // Role switching
  const handleRoleChange = (role: "employee" | "employer") => {
    localStorage.setItem("role", role);
    if (role === "employer") {
      navigate("/employer");
    }
  };
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Navbar currentRole="employee" onRoleChange={handleRoleChange} onLogout={handleLogout} />
      <div className="flex w-full">
        <Sidebar currentRole="employee" />
        <main className="flex-1 px-6 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6">Employees</h1>
                  <EmployeeTable
                    employees={EMPLOYEES.map(({ wage, dayOffBalance, ...rest }) => rest)}
                  />
                  <div className="mt-10">
                    <h2 className="text-xl font-semibold mb-2">About</h2>
                    <p className="text-gray-500 mb-1">
                      View names, emails, and roles of your coworkers. 
                      Wage and day-off balance are not visible here.
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
                  <LeaveRequestForm onSubmit={handleLeaveRequest} />
                </div>
              }
            />
            <Route
              path="my-leaves"
              element={
                <div>
                  <MyLeaveList leaveRequests={leaveRequests} employeeId={employeeId} />
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
