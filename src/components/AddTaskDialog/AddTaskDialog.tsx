import React, { useRef, useState } from "react";
import styles from "./AddTaskDialog.module.css";

export default function AddTaskDialog({ onAddTask }: { onAddTask: (title: string) => void }) {
  const [taskTitle, setTaskTitle] = useState("");
  const [ariaMsg, setAriaMsg] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setAriaMsg("");
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle);
      setTaskTitle("");
      closeDialog();
      setAriaMsg("Task added");
    }
  };

  return (
    <div className={styles.task__main}>
      <span className="sr-only" aria-atomic aria-live="polite">
        {ariaMsg}
      </span>
      <button
        autoFocus
        className={styles.button__cta}
        onClick={openDialog}
        aria-label="Open Add Task Dialog"
      >
        <span aria-hidden>+</span> Add Task
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="dialog-title"
        role="dialog"
      >
        <h2 id="dialog-title">Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <fieldset>
            <label htmlFor="task-title">Task Title</label>
            <input
              autoFocus
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
            <button type="button" onClick={closeDialog}>
              Cancel
            </button>
          </footer>
        </form>
      </dialog>
    </div>
  );
}
