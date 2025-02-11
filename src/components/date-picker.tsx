"use client";
import { Calendar } from "@/components/ui/calendar";
import { SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
import { format } from "date-fns";
import { useTask } from "@/hooks/queries/useTask";

export function DatePicker() {
  const { tasks } = useTask();
  const taskDates =
    tasks
      ?.filter((task) => task.dueDate)
      .map((task) => format(new Date(task.dueDate!), "yyyy-MM-dd")) || [];
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupContent>
        <Calendar
          className="[&_[role=gridcell]]:rounded-full [&_[role=gridcell]]:transition-all "
          modifiers={{
            hasTask: (date) => taskDates?.includes(format(date, "yyyy-MM-dd")),
          }}
          modifiersStyles={{
            hasTask: {
              backgroundColor: "#ff474c",
              color: "#ffffff",
              borderRadius: "50%",
              fontWeight: "bold",
            },
          }}
        />
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
