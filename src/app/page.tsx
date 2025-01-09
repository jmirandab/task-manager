"use client";
import styles from "./page.module.css";
import React from "react";
import AddTaskDialog from "@/components/AddTaskDialog/AddTaskDialog";
import TaskList from "@/components/TaskList/TaskList";
import { useTasks } from "./useTasks";
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';

export default function Home() {
  const { tasksList, addTask, toggleTaskStatus, cleanAllTasks } = useTasks();

  return (
    <main className={styles.App}>
      <ThemeToggle />
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
      <TaskList tasksList={tasksList} toggleTaskStatus={toggleTaskStatus} />
    </main>
  );
}
