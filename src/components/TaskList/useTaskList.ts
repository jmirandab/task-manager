import { useState, useMemo } from "react";
import Task from "@/utils/Task";

type FilterStatus = "" | "pending" | "completed";

export function useTaskList(tasksList: Task[]) {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("");
  const [sortAlpha, setSortAlpha] = useState<boolean>(false);

  const toggleFilterStatus = () => {
    setFilterStatus((prevStatus) => {
      switch (prevStatus) {
        case "pending":
          return "completed";
        case "completed":
          return "";
        default:
          return "pending";
      }
    });
  };

  const toggleSortAlphabetically = () => {
    setSortAlpha((prev) => !prev);
  };

  const filteredTasks = useMemo(() => {
    return tasksList.filter((task) => {
      if (filterStatus === "") return true;
      return task.status === filterStatus;
    });
  }, [tasksList, filterStatus]);

  const displayedTasks = useMemo(() => {
    const isAscending = sortAlpha ? 1 : -1;
    return [...filteredTasks].sort((a, b) => {
      return isAscending * a.title.localeCompare(b.title);
    });
  }, [filteredTasks, sortAlpha]);

  return {
    filterStatus,
    sortAlpha,
    toggleFilterStatus,
    toggleSortAlphabetically,
    displayedTasks,
  };
}
