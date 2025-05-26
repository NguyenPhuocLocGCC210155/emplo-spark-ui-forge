import axios from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
        role: "employee", // cần gửi role để backend xử lý đúng
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <form
        onSubmit={handleSignUp}
        className="max-w-md w-full bg-white shadow-lg rounded-xl p-10 flex flex-col gap-6 items-center"
      >
        <h1 className="text-2xl font-bold text-gray-800">Employee Sign Up</h1>
        <div className="w-full">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            className="mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>
        <div className="w-full">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            className="mt-1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a password"
          />
        </div>
        <Button type="submit" className="w-full mt-4">
          Register
        </Button>
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <span
            className="underline text-blue-700 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default EmployeeSignUp;
