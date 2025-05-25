
import React from "react";
import { LeaveRequest, Employee } from "@/types";
import { Button } from "@/components/ui/button";

interface LeaveManagementTableProps {
  leaveRequests: LeaveRequest[];
  employees: Employee[];
  onApprove: (requestId: number) => void;
  onReject: (requestId: number) => void;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
} as const;

const LeaveManagementTable: React.FC<LeaveManagementTableProps> = ({
  leaveRequests,
  employees,
  onApprove,
  onReject,
}) => {
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
                    className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[req.status]}`}
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
                        onClick={() => onApprove(req.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onReject(req.id)}
                      >
                        Reject
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
