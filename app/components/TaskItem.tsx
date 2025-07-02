import { Task } from "../types/task";





interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}


export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
  return (
    <div className="p-4 border rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-lg font-medium">{task.title}</h3>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm">Status: {task.status}</p>
        <p className="text-sm">Due: {task.dueDate}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(String(task.id))}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}