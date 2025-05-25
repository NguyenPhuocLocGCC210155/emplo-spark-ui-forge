
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { List, User, Calendar, Search } from "lucide-react";

export interface SidebarProps {
  currentRole: "employee" | "employer";
}

const navItems = {
  employee: [
    { name: "Employee List", to: "/employee", icon: List },
    { name: "Request Leave", to: "/employee/leave", icon: Calendar },
    { name: "My Leave Requests", to: "/employee/my-leaves", icon: Search },
  ],
  employer: [
    { name: "Employee Management", to: "/employer", icon: List },
    { name: "Leave Management", to: "/employer/leaves", icon: Calendar },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ currentRole }) => {
  const location = useLocation();

  return (
    <aside className="h-[calc(100vh-56px)] w-56 bg-white border-r flex flex-col py-6 px-3 gap-2">
      {navItems[currentRole].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-md font-medium transition ${
              isActive
                ? "bg-blue-100 text-blue-800 shadow font-semibold"
                : "hover:bg-blue-50 text-gray-600"
            }`
          }
        >
          <item.icon size={20} className="opacity-80" /> {item.name}
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
