import api from "@/api";
import { Employee } from "@/types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "./NotFound";

interface Props {
  employee?: Employee;
}



const UpdateEmployeePage: React.FC<Props> = ({ employee }) => {
  const navigate = useNavigate();

  // State chỉ chứa 2 field cần thiết
  const [form, setForm] = useState({
    wage: employee?.wage || 0,
    day_off: employee?.day_off || 10,
  });

    // ✅ Kiểm tra role trước khi render
    const role = localStorage.getItem("role");
  if (role !== "employer") {
    return <NotFound />;
  }

  if (!employee) {
    return <div className="text-red-500">Employee not found</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Gọi API cập nhật với 2 field
      await api.put(`/employer/${employee.id}/update`, form);
      alert("Employee updated!");
      navigate("/employer"); // chuyển về trang chủ hoặc trang danh sách
    } catch (err) {
      console.error("Failed to update employee", err);
      alert("Failed to update employee");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    try {
      // Gọi API DELETE employee theo id
      await api.delete(`/employer/${employee.id}/delete`);
      alert("Employee deleted!");
      navigate("/employer");
    } catch (err) {
      console.error("Failed to delete employee", err);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Employee</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Tên và email hiển thị nhưng không cho sửa */}
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            value={employee.name}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            value={employee.email}
            disabled
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Wage */}
        <div>
          <label className="block font-medium mb-1">Wage</label>
          <div className="flex items-center border rounded px-3 py-2">
            <input
              type="number"
              name="wage"
              value={form.wage}
              onChange={handleChange}
              min={0}
              step={1000} // Tuỳ bạn, có thể dùng step=1 nếu muốn nhập linh hoạt hơn
              className="flex-grow outline-none bg-transparent"
            />
            <span className="ml-2 text-gray-600 select-none">VNĐ</span>
          </div>
        </div>

        {/* Day-off */}
        <div>
          <label className="block font-medium">Day-off Balance</label>
          <input
            type="number"
            name="day_off"
            value={form.day_off}
            onChange={handleChange}
            min={0}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEmployeePage;
