import Input from "./Input";
import Task from "./Task";
import Modal from "./Modal";
import { useRef } from "react";

export default function TaskList({ projectId, tasks, onTaskChange }) {
  const taskRef = useRef();
  const dialogRef= useRef();

  function taskVerify(){
    if(taskRef.current.value.trim() != '') {
      return true;
    }
    return false;
  }

  function taskAddHandler() {
    const verify = taskVerify();
    if (verify) {
      tasks.push({ id: Math.random() * 1000, taskName: taskRef.current.value });
      onTaskChange(projectId, tasks);
      taskRef.current.value = "";
    } else {
      dialogRef.current.open();
    }
  }

  function taskRemoveHandler(taskId) {
    const foundIndex = tasks.findIndex((task) => task.id === taskId);
    tasks.splice(foundIndex, 1);
    onTaskChange(projectId, tasks);
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h1>
        <div className="flex items-center gap-4">
          <Input
            className="w-64 px-2 py-1 rounded-sm bg-stone-200"
            ref={taskRef}
            label=""
            type="text"
          />
          <button
            onClick={taskAddHandler}
            className="text-stone-600 hover:text-stone-950"
          >
            Add Task
          </button>
        </div>
      </div>
      <div>
        {tasks.length <= 0 && (
          <p className="text-stone-800 my-4">
            This project does not have any tasks yet.
          </p>
        )}
        {tasks.length > 0 && (
          <ul className="p-4 mt-8 rounded-md bg-stone-100">
            {tasks.map((task) => (
              <Task
                key={task.id}
                taskId={task.id}
                taskName={task.taskName}
                taskRemover={taskRemoveHandler}
              />
            ))}
          </ul>
        )}
      </div>
      <Modal ref={dialogRef} />
    </div>
  );
}
