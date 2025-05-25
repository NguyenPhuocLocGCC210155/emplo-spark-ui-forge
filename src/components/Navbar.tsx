
import React from "react";
import { useNavigate } from "react-router-dom";
import { User, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface NavbarProps {
  currentRole: "employee" | "employer";
  onRoleChange: (role: "employee" | "employer") => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentRole, onRoleChange, onLogout }) => {
  const roleText = currentRole === "employee" ? "Employee" : "Employer";
  const navigate = useNavigate();

  return (
    <nav className="h-14 w-full flex items-center justify-between bg-white border-b px-6 shadow-sm z-40">
      <div className="flex items-center gap-3">
        <span className="font-semibold text-xl tracking-tight text-blue-700">EMS</span>
        <span className="text-gray-400">|</span>
        <span className="flex items-center gap-1 text-sm text-gray-700">
          {currentRole === "employee" ? (
            <>
              <User size={18} className="text-blue-500" /> Employee
            </>
          ) : (
            <>
              <List size={18} className="text-green-700" /> Employer
            </>
          )}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRoleChange(currentRole === "employee" ? "employer" : "employee")}
        >
          Switch to {currentRole === "employee" ? "Employer" : "Employee"}
        </Button>
        <Button variant="outline" size="sm" onClick={onLogout}>
          Log out
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
