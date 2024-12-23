import StatusChip from "../StatusChip/StatusChip";
import styles from "./TaskItem.module.css";
import Task from "@/utils/Task";

export default function TaskItem({
  task,
  toggleTaskStatus,
}: {
  task: Task;
  toggleTaskStatus: (id: number) => void;
}) {
  return (
    <li key={task.id}>
      <div className={styles.list__title_col}>{task.title} </div>
      <StatusChip
        className={styles.list__status_col}
        status={task.status}
      />
      <div className={styles.list__actions_col}>
        <button onClick={() => toggleTaskStatus(task.id)}>
          {task.status === "pending" ? "Mark as Completed" : "Mark as Pending"}
        </button>
      </div>
    </li>
  );
}
