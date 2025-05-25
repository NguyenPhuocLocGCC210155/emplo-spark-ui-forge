
export type Role = "employee" | "employer";

export interface Employee {
  id: number;
  name: string;
  email: string;
  role: string;
  wage?: number;
  dayOffBalance?: number;
}

export type LeaveStatus = "pending" | "approved" | "rejected";

export interface LeaveRequest {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  status: LeaveStatus;
}
