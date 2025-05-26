import api from "@/api";
import EmployeeTable from "@/components/EmployeeTable";
import LeaveManagementTable from "@/components/LeaveManagementTable";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import UpdateEmployeePage from "@/pages/UpdateEmployeePage";
import { Employee, LeaveRequest } from "@/types";
import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import NotFound from "./NotFound";

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
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] =
    useState<LeaveRequest[]>(INIT_LEAVE_REQUESTS);
  const navigate = useNavigate();

  // ✅ Kiểm tra role trước khi render
  const role = localStorage.getItem("role");
  if (role !== "employer") {
    return <NotFound />;
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employer");
        const fetched = res.data;

        // Map to match expected Employee type (with wage + dayOffBalance)
        const mapped: Employee[] = fetched.map((e: any) => ({
          id: e.id,
          name: e.name,
          email: e.email,
          role: e.role,
          wage: e.wage ?? 0,
          dayOffBalance: 10, // default fallback if not returned by API
        }));

        setEmployees(mapped);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };

    fetchEmployees();
  }, []);

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
      const updatedEmployees = employees.map((emp) =>
        emp.id === req.employeeId && emp.dayOffBalance !== undefined
          ? { ...emp, dayOffBalance: Math.max(0, (emp.dayOffBalance || 0) - 1) }
          : emp
      );
      setEmployees(updatedEmployees);
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
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
  const UpdateWrapper: React.FC<{ employees: Employee[] }> = ({
    employees,
  }) => {
    const { id } = useParams();
    const employee = employees.find((e) => e.id === Number(id));

    return <UpdateEmployeePage employee={employee} />;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-green-50">
      <Navbar
        currentRole="employer"
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
      />
      <div className="flex w-full">
        <Sidebar currentRole="employer" />
        <main className="flex-1 px-6 py-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1 className="text-2xl font-bold mb-6">
                    Employee Management
                  </h1>
                  <EmployeeTable employees={employees} showExtra />
                </>
              }
            />
            <Route
              path="leaves"
              element={
                <LeaveManagementTable
                  employees={employees}
                  leaveRequests={leaveRequests}
                  onApprove={handleApprove}
                  onReject={handleReject}
                />
              }
            />
            <Route
              path="update/:id"
              element={<UpdateWrapper employees={employees} />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;
