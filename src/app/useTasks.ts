import { useState, useEffect } from "react";
import Task from "@/utils/Task";

const TASKS_STORAGE_KEY = "tasksList";

const loadTasks = (): Task[] => {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasks = (tasks: Task[]) => {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
};

export function useTasks() {
  const [tasksList, setTasksList] = useState<Task[]>([]);

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
    setTasksList((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleTaskStatus = (id: number) => {
    setTasksList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "pending" ? "completed" : "pending",
            }
          : task
      )
    );
  };

  const cleanAllTasks = () => {
    setTasksList([]);
    localStorage.removeItem(TASKS_STORAGE_KEY);
  };

  return {
    tasksList,
    addTask,
    toggleTaskStatus,
    cleanAllTasks,
  };
}
