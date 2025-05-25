
import React from "react";
import { LeaveRequest } from "@/types";

interface MyLeaveListProps {
  leaveRequests: LeaveRequest[];
  employeeId: number;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
} as const;

const MyLeaveList: React.FC<MyLeaveListProps> = ({
  leaveRequests,
  employeeId,
}) => {
  const myLeaves = leaveRequests.filter((lr) => lr.employeeId === employeeId);

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">My Leave Requests</h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50 font-semibold text-blue-800">
            <tr>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {myLeaves.map((req) => (
              <tr key={req.id} className="border-t hover:bg-blue-50 transition">
                <td className="px-4 py-2">{req.date}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[req.status]}`}
                  >
                    {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {myLeaves.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            You have no leave requests.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLeaveList;
