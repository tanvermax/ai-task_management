// components/TaskList.tsx


import axios from "axios";
import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { SiOpenai } from "react-icons/si";

type Task = {
  _id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
};



export default function TaskList() {


  const [taskResult, setTaskResult] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get('/api/task')
        if (response.data.success) {
          setTasks(response.data.data);
          // setRefreshTrigger(prev => prev + 1);
        } else {
          setError(response.data.error || 'Failed to fetch tasks');
        }
      } catch (err) {
        setError('An error occurred while fetching tasks');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTask();
  }, [])



  const handlesendtask = async (prompt: string, taskId: number) => {
    console.log(`Task title: ${prompt}`);

    try {


      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      console.log(prompt);
      console.log(res);
      const data = await res.json();


      const text = data?.result?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response';
      const clentext = text.replace(/\n{2,}/g, '\n').replace(/"/g, '').replace(/-/g, ',\n');
      console.log(text);


      setTaskResult(prev => ({
        ...prev,
        [taskId]: clentext
      }));
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    }


  };


  const handledelete = async (taskId: number) => {
    console.log(taskId);
    try {
      const response = await fetch('/api/task', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });

      const data = await response.json();


      if (data.success) {
        alert("data deleted")
        // setTasks(data.data);
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } else {
        setError(data.error || 'Failed to fetch tasks');
      }
    } catch (err) {
      setError('An error occurred while deleting tasks');
      console.error(err);
    }
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><CiBoxList /> Task List</h2>
      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task._id}
            className={`rounded-xl p-4 shadow-md border ${task.status === 'completed'
              ? 'bg-green-50 border-green-300'
              : 'bg-yellow-50 border-yellow-300'
              }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg text-[#78478f] font-semibold">{task.title}
                <button onClick={() => handlesendtask(task.title, task._id)} className="relative 
              p-2 items-center justify-center text-xs overflow-hidden bg-gray-800
               text-white shadow-2xl transition-all before:absolute
               before:h-0 before:w-0 before:rounded-full flex
               before:bg-orange-600 before:duration-500 before:ease-out
               hover:shadow-orange-600 hover:before:h-56 
              rounded-2xl hover:before:w-56"
                  disabled={loading}
                >
                  <span className="relative z-10 flex items-center gap-3">Suggest Subtasks<SiOpenai fontSize={20} color="#1447E6" /></span>
                </button> </h3>
              <div className="m-3 p-2">
                {taskResult[task._id] && (
                  <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 p-4 text-gray-900 ">
                    {taskResult[task._id]}
                  </div>
                )}
              </div>
              <span
                className={`text-sm px-2 py-1 rounded-xl font-medium ${task.status === 'completed'
                  ? 'bg-green-200 text-green-900'
                  : 'bg-yellow-200 text-yellow-900'
                  }`}
              >
                {task.status}
              </span>
            </div>
            <p className="text-gray-700">{task.description}</p>
            <p className="text-sm text-gray-500 mt-2">Due: {task.dueDate}</p>
            <button onClick={() => handledelete(task._id)} className="p-2 bg-red-300 rounded-xl hover:bg-red-500 ">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
