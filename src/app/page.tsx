"use client";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import AddTaskDialog from "@/components/AddTaskDialog/AddTaskDialog";
import TaskItem from "@/components/TaskItem/TaskItem";
import Task from "@/utils/Task";

type FilterStatus = "" | "pending" | "completed";

const TASKS_STORAGE_KEY = "tasksList";

const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export default function Home() {
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("");
  const [sortAlpha, setSortAlpha] = useState<boolean>(false);

  const cleanAllTasks = () => {
    setTasksList([]);
    localStorage.removeItem(TASKS_STORAGE_KEY);
  };

  useEffect(() => {
    setTasksList(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasksList);
  }, [tasksList]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      status: "pending",
    };
    setTasksList([...tasksList, newTask]);
  };

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

  const filteredTasks = tasksList.filter((task) => {
    if (filterStatus === "") return true;
    return task.status === filterStatus;
  });

  const displayedTasks = React.useMemo(() => {
    const isAsending = sortAlpha ? 1 : -1;
    return filteredTasks.sort((a, b) => {
      return isAsending * a.title.localeCompare(b.title);
    });
  }, [filteredTasks, sortAlpha]);

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
              <TaskItem
                key={task.id}
                toggleTaskStatus={toggleTaskStatus}
                task={task}
              />
            ))}
          </ol>
        ) : (
          <div>no records</div>
        )}
      </section>
    </main>
  );
}
