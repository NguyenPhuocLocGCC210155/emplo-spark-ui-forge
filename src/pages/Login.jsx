
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated login logic
    localStorage.setItem("role", role);
    if (role === "employee") {
      navigate("/employee");
    } else {
      navigate("/employer");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-4">
      <form onSubmit={handleLogin} className="max-w-md w-full bg-white shadow-lg rounded-xl p-10 flex flex-col gap-6 items-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Login</h1>
        <div className="w-full">
          <Label htmlFor="role">Role</Label>
          <select
            id="role"
            className="mt-1 border rounded-md w-full h-10 px-3"
            value={role}
            onChange={e => setRole(e.target.value)}
          >
            <option value="employee">Employee</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            className="mt-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Login
        </Button>
        <p className="text-sm text-gray-500">
          Want to create an employee account?{" "}
          <span
            className="underline text-blue-700 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
