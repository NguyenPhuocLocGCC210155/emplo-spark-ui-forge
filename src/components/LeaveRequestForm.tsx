import axios from "@/api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";

const LeaveRequestForm: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!date) {
      setError("Please select a date.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
      if (!token) throw new Error("No authentication token found");

      await axios.post(
        "/employee/leaves",
        { date: date.toISOString().split("T")[0] }, // Send date in YYYY-MM-DD
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Leave request submitted!");
      setDate(undefined);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit request.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="font-medium">Day Off</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] justify-start text-left font-normal mt-1",
                !date && "text-muted-foreground"
              )}
              type="button"
            >
              <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
              {date ? format(date, "PPP") : <span>Select date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              className="p-3"
            />
          </PopoverContent>
        </Popover>
      </div>

      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">{success}</div>}

      <Button type="submit" className="w-full">
        Request Day Off
      </Button>
    </form>
  );
};

export default LeaveRequestForm;

