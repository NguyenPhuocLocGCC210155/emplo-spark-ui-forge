
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import EmployeeTable from "@/components/EmployeeTable";
import LeaveManagementTable from "@/components/LeaveManagementTable";
import { Employee, LeaveRequest } from "@/types";
import { useNavigate, Routes, Route } from "react-router-dom";

// Initial employees and leave data (simulate all employees and leave requests)
const INIT_EMPLOYEES: Employee[] = [
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
const INIT_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: 1,
    employeeId: 2,
    employeeName: "Bob Johnson",
    date: "2025-05-31",
    status: "pending",
  },
  {
    id: 2,
    employeeId: 3,
    employeeName: "Carol Lee",
    date: "2025-06-03",
    status: "approved",
  },
];

const EmployerDashboard: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(INIT_EMPLOYEES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
    INIT_LEAVE_REQUESTS
  );
  const navigate = useNavigate();

  // Approve: set status and deduct day-off
  const handleApprove = (requestId: number) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "approved" } : req
      )
    );
    // Deduct 1 day-off from employee
    const req = leaveRequests.find((r) => r.id === requestId);
    if (req) {
      setEmployees((emps) =>
        emps.map((emp) =>
          emp.id === req.employeeId && emp.dayOffBalance !== undefined
            ? { ...emp, dayOffBalance: Math.max(0, (emp.dayOffBalance || 0) - 1) }
            : emp
        )
      );
    }
  };

  // Reject: set status
  const handleReject = (requestId: number) => {
    setLeaveRequests((prev) =>
      prev.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" } : req
      )
    );
  };

  // Role switching
  const handleRoleChange = (role: "employee" | "employer") => {
    localStorage.setItem("role", role);
    if (role === "employee") {
      navigate("/employee");
    }
  };
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <Navbar currentRole="employer" onRoleChange={handleRoleChange} onLogout={handleLogout} />
      <div className="flex w-full">
        <Sidebar currentRole="employer" />
        <main className="flex-1 px-6 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h1 className="text-2xl font-bold mb-6">Employee Management</h1>
                  <EmployeeTable employees={employees} showExtra />
                </div>
              }
            />
            <Route
              path="leaves"
              element={
                <LeaveManagementTable
                  leaveRequests={leaveRequests}
                  employees={employees}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
