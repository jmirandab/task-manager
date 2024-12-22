import React, { useState } from "react";
import styles from "./AddTaskDialog.module.css";

export default function AddTaskDialog({ onAddTask }: { onAddTask: (title: string) => void }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ariaMsg, setAriaMsg] = useState("");

  const openDialog = () => {
    setIsOpen(true);
    setAriaMsg("");
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle("");
      setIsOpen(false);
      setAriaMsg("Task added");
    }
  };

  return (
    <div className={styles.task__main}>
      <span className="sr-only" aria-atomic aria-live="polite">
        {ariaMsg}
      </span>
      <button onClick={openDialog} aria-label="Open Add Task Dialog">
        <span aria-hidden>+</span> Add Task
      </button>
      <dialog
        className={styles.dialog}
        open={isOpen}
        aria-labelledby="dialog-title"
        role="dialog"
      >
        <h2 id="dialog-title">Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <fieldset>
            <label htmlFor="task-title">Task Title</label>
            <input
              id="task-title"
              type="text"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder="Task Title"
              required
            />
          </fieldset>
          <footer>
            <button type="submit">Add</button>
            <button type="button" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
          </footer>
        </form>
      </dialog>
    </div>
  );
}
