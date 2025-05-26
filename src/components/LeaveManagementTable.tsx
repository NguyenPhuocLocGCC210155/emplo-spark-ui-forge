import api from "@/api"; // axios instance đã cấu hình
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";

interface LeaveRequestFromAPI {
  id: number;
  employee_id: number;
  date: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
  employee: {
    id: number;
    name: string;
    email: string;
    role: string;
    hire_date: string;
  };
}

interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  status: "pending" | "approved" | "rejected";
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
} as const;

const LeaveManagementTable: React.FC = () => {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get<LeaveRequestFromAPI[]>("/employer/leaves");
        const mappedLeaves = res.data.map((item) => ({
          id: item.id,
          employeeId: item.employee_id,
          employeeName: item.employee.name,
          date: item.date,
          status: item.status,
        }));
        setLeaveRequests(mappedLeaves);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch leave requests");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, []);

  const updateStatus = (id: number, newStatus: "approved" | "rejected") => {
    setLeaveRequests((prev) =>
      prev.map((lr) => (lr.id === id ? { ...lr, status: newStatus } : lr))
    );
  };

  const handleApprove = async (id: number) => {
    setProcessingId(id);
    try {
      await api.put(`/employer/leaves/${id}/approve`);
      updateStatus(id, "approved");
    } catch (err) {
      console.error("Approve failed", err);
      alert("Failed to approve leave request.");
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: number) => {
    setProcessingId(id);
    try {
      await api.put(`/employer/leaves/${id}/reject`);
      updateStatus(id, "rejected");
    } catch (err) {
      console.error("Reject failed", err);
      alert("Failed to reject leave request.");
    } finally {
      setProcessingId(null);
    }
  };

  if (loading) return <p>Loading leave requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">All Leave Requests</h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50 font-semibold text-blue-800">
            <tr>
              <th className="px-4 py-3">Employee Name</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req) => (
              <tr key={req.id} className="border-t hover:bg-blue-50 transition">
                <td className="px-4 py-2">{req.employeeName}</td>
                <td className="px-4 py-2">{req.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      statusColors[req.status]
                    }`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2">
                  {req.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleApprove(req.id)}
                        disabled={processingId === req.id}
                      >
                        {processingId === req.id ? "Approving..." : "Approve"}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(req.id)}
                        disabled={processingId === req.id}
                      >
                        {processingId === req.id ? "Rejecting..." : "Reject"}
                      </Button>
                    </>
                  ) : (
                    <span className="text-gray-400 italic">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leaveRequests.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No leave requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagementTable;
