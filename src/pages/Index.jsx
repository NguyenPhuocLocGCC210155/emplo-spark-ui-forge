
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, List } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: "employee" | "employer") => {
    localStorage.setItem("role", role);
    if (role === "employee") {
      navigate("/employee");
    } else {
      navigate("/employer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-10 flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Employee Management System</h1>
        <p className="text-gray-500 mb-4 text-center">
          Please select your role to begin. <br />
          (Simulated login)
        </p>
        <div className="flex gap-6 w-full">
          <Button
            variant="outline"
            className="flex-1 flex flex-col py-6 items-center gap-2 border-2 border-blue-400 hover:bg-blue-50 transition"
            onClick={() => handleRoleSelect("employee")}
          >
            <User size={32} className="text-blue-500" />
            <span className="font-medium text-lg text-blue-900">Employee</span>
          </Button>
          <Button
            variant="outline"
            className="flex-1 flex flex-col py-6 items-center gap-2 border-2 border-green-400 hover:bg-green-50 transition"
            onClick={() => handleRoleSelect("employer")}
          >
            <List size={32} className="text-green-600" />
            <span className="font-medium text-lg text-green-900">Employer</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
