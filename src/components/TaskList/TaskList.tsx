import styles from "./TaskList.module.css";
import Task from "@/utils/Task";
import React from "react";
import TaskItem from "../TaskItem/TaskItem";
import { useTaskList } from "./useTaskList";

export default function TaskList({
  tasksList,
  toggleTaskStatus,
}: {
  tasksList: Task[];
  toggleTaskStatus: (id: number) => void;
}) {
  const {
    filterStatus,
    sortAlpha,
    toggleFilterStatus,
    toggleSortAlphabetically,
    displayedTasks,
  } = useTaskList(tasksList);

  return (
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
        <div>No records</div>
      )}
    </section>
  );
}
