import { Trash, Check } from "phosphor-react";
import styles from "./Task.module.css";

interface TaskProps {
  task: {
    id: string;
    title: string;
    isComplete: boolean;
  };
  onDeleteTask: (id: string) => void;
  onCompleteTask: (id: string) => void;
}

export function Task({ task, onDeleteTask, onCompleteTask }: TaskProps) {
  function handleDeleteTask() {
    onDeleteTask(task.id);
  }

  function handleCompleteTask() {
    onCompleteTask(task.id);
  }

  return (
    <div className={styles.task}>
      <div
        className={
          task.isComplete
            ? `${styles.check} ${styles.checked}`
            : `${styles.check} ${styles.unchecked}`
        }
        onClick={handleCompleteTask}
      >
        {task.isComplete && <Check size={12} weight="bold" />}
      </div>
      <p
        className={
          task.isComplete
            ? `${styles.taskCompleted}`
            : `${styles.taskNotCompleted}`
        }
      >
        {task.title}
      </p>
      <Trash
        size={17}
        onClick={handleDeleteTask}
        className={styles.trashIcon}
      />
    </div>
  );
}
