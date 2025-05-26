import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Employee } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeTableProps {
  employees: Employee[];
  showExtra?: boolean; // If true, show wage/balance
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  showExtra = false,
}) => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="mb-3 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left">
          <thead className="bg-blue-50 font-semibold text-blue-800">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              {showExtra && <th className="px-4 py-3">Wage</th>}
              {showExtra && <th className="px-4 py-3">Day-off Balance</th>}
              {showExtra && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id} className="border-t hover:bg-blue-50 transition">
                <td className="px-4 py-2">{e.name}</td>
                <td className="px-4 py-2">{e.email}</td>
                <td className="px-4 py-2">{e.role}</td>
                {showExtra && <td className="px-4 py-2">{e.wage ?? "--"}</td>}
                {showExtra && (
                  <td className="px-4 py-2">{e.dayOffBalance ?? "--"}</td>
                )}
                {showExtra && (
                  <td className="px-4 py-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/employer/update/${e.id}`)}
                    >
                      Edit
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-6 text-gray-400">No employees found.</div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTable;
