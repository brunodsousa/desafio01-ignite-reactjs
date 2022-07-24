import { FormEvent, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { v4 as uuidv4 } from "uuid";

import { Task } from "./Task";

import clipboard from "../assets/clipboard.svg";
import styles from "./TaskList.module.css";

interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();
    setTasks([
      ...tasks,
      {
        id: uuidv4(),
        title: newTaskTitle,
        isComplete: false,
      },
    ]);
    setNewTaskTitle("");
  }

  function handleCompleteTask(id: string) {
    const updatedTaskList = tasks.map((task) => {
      if (task.id == id) {
        task.isComplete = !task.isComplete;
      }
      return task;
    });
    setTasks(updatedTaskList);
  }

  function handleDeleteTask(id: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(tasksWithoutDeletedOne);
  }

  const completedTasks = tasks.filter((task) => task.isComplete == true);

  return (
    <div className={styles.container}>
      <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
        <input
          type="text"
          name="task"
          placeholder="Adicionar uma nova tarefa"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          required
        />
        <button type="submit">
          Criar
          <PlusCircle size={20} weight="bold" />
        </button>
      </form>
      <div className={styles.tasksInfo}>
        <div>
          <strong>
            Tarefas criadas <span>{tasks.length}</span>
          </strong>
        </div>
        <div>
          <strong>
            Concluídas{" "}
            <span>
              {tasks.length > 0
                ? `${completedTasks.length} de ${tasks.length}`
                : 0}
            </span>
          </strong>
        </div>
      </div>
      {tasks.length == 0 ? (
        <div className={styles.emptyList}>
          <img src={clipboard} alt="Clipboard icon" />
          <p>Você ainda não tem tarefas cadastradas</p>
          <p>Crie tarefas e organize seus itens a fazer</p>
        </div>
      ) : (
        tasks.map((item) => {
          return (
            <Task
              key={item.id}
              task={item}
              onDeleteTask={handleDeleteTask}
              onCompleteTask={handleCompleteTask}
            />
          );
        })
      )}
    </div>
  );
}
