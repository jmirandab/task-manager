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

  const cleanAllTasks = () => {
    setTasksList([]); // Clear the state
    localStorage.removeItem(TASKS_STORAGE_KEY); // Clear the localStorage
  };

  // Load tasks only on the client side
  useEffect(() => {
    setTasksList(loadTasks());
  }, []);

  // Persist tasks to localStorage on change
  useEffect(() => {
    saveTasks(tasksList);
  }, [tasksList]);

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
  const displayedTasks = filteredTasks.sort((a, b) => {
        const titleA = a.title.replace(/\s+/g, '').toLowerCase();
        const titleB = b.title.replace(/\s+/g, '').toLowerCase();
        console.log("titleA < titleB", titleA , titleB, titleA < titleB);
        if (sortAlpha) {
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
        } else {
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
        }
        return 0;
      })

  return (
    <main className={styles.App}>
      <h1>To-Do List</h1>
      <section>
        <AddTaskDialog onAddTask={addTask} />
        <button
          onClick={cleanAllTasks}
          className={styles.clear__button}
          aria-label="Clear all tasks"
        >
          Clean All
        </button>
      </section>

      <section className={styles.list__grid}>
        <div className={styles.filters__wraper}>
          <button
            className={styles.list__title_col}
            onClick={toggleSortAlphabetically}
            aria-atomic
            aria-live="polite"
            aria-label={`${
              sortAlpha
                ? "Sort alphabetically A to Z"
                : "Sort alphabetically Z to A"
            }`}
          >
            <span>Name</span>{" "}
            <span>
              <span aria-hidden>&uarr;&darr;</span>
              {`${sortAlpha ? "A-Z" : "Z-A"}`}
            </span>
          </button>
          <div className={styles.list__status_col}>
            <span className="sr-only" aria-atomic aria-live="polite">
              Displaying {filterStatus} tasks{" "}
            </span>

            <button onClick={toggleFilterStatus}>
              <span>Status</span>
              <span>
                {filterStatus === "pending"
                  ? "Filter completed"
                  : filterStatus === "completed"
                  ? "Show all"
                  : "Filter pending"}
              </span>
            </button>
          </div>
        </div>

        {displayedTasks.length > 0 ? (
          <ol>
            {displayedTasks.map((task) => (
              <li key={task.id}>
                <div className={styles.list__title_col}>{task.title} </div>
                <StatusChip
                  className={styles.list__status_col}
                  status={task.status}
                ></StatusChip>
                <div className={styles.list__actions_col}>
                  <button onClick={() => toggleTaskStatus(task.id)}>
                    {task.status === "pending"
                      ? "Mark as Completed"
                      : "Mark as Pending"}
                  </button>
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div>no records</div>
        )}
      </section>
    </main>
  );
}
