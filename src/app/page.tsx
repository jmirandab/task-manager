"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import AddTaskDialog from "@/components/AddTaskDialog";
import StatusChip from "@/components/StatusChip";

type FilterStatus = "" | "pending" | "completed";

interface Task {
  id: number;
  title: string;
  status: "pending" | "completed";
}

const TASKS_STORAGE_KEY = "tasksList";

// Load tasks from localStorage
const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

// Save tasks to localStorage
const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export default function Home() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("");
  const [sortAlpha, setSortAlpha] = useState<boolean>(false);

  // Load tasks only on the client side
  useEffect(() => {
    setTasksList(loadTasks());
  }, []);

  // Persist tasks to localStorage on change
  useEffect(() => {
    saveTasks(tasksList);
  }, [tasksList]);

  // Add Task
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(), // Safe because it runs on the client now
      title,
      status: "pending",
    };
    setTasksList([...tasksList, newTask]);
  };

  // Toggle Task Status
  const toggleTaskStatus = (id: number) => {
    setTasksList(
      tasksList.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  // Toggle Filter Status
  const toggleFilterStatus = () => {
    let newStatus: FilterStatus = "";
    if (filterStatus === "pending") {
      newStatus = "completed";
    } else if (filterStatus === "completed") {
      newStatus = "pending";
    } else {
      newStatus = "pending";
    }
    setFilterStatus(newStatus);
  };

  // Clear Filter Status
  const clearFilterStatus = () => {
    setFilterStatus("");
  };

  // Toggle Sort Alphabetically
  const toggleSortAlphabetically = () => {
    setSortAlpha((prev) => !prev);
  };

  // Filter Tasks
  const filteredTasks = tasksList.filter((task) => {
    if (filterStatus === "") return true;
    return task.status === filterStatus;
  });

  // Sort Tasks
  const displayedTasks = sortAlpha
    ? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
    : filteredTasks;

  return (
    <main className={styles.App}>
      <h1>To-Do List</h1>
      <section>
        <AddTaskDialog onAddTask={addTask} />
        <div className={styles.filters__wraper}>
          <button onClick={toggleSortAlphabetically}>
            Sort Alphabetically {`${sortAlpha? "A to Z":  "Z to A"}`}
          </button>
          <div>
            {filterStatus !== "" && (<span aria-atomic aria-live="polite">Displaying {filterStatus} tasks </span>)}
            <button onClick={toggleFilterStatus}> {filterStatus === "pending"? "Filter Status completed": "Filter Status pending"} </button>
            {filterStatus !== "" && (
              <button onClick={clearFilterStatus}>Clear Filter</button>
            )}
          </div>
        </div>
      </section>
      {displayedTasks.length > 0 ? (
        <ul>
          {displayedTasks.map((task) => (
            <li key={task.id}>
              <div>{task.title} </div>
              <StatusChip status={task.status}></StatusChip>
              <div>
                <button onClick={() => toggleTaskStatus(task.id)}>
                  {task.status === "pending"
                    ? "Mark as Completed"
                    : "Mark as Pending"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>no records</div>
      )}
    </main>
  );
}
