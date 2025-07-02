// components/TaskList.tsx


import axios from "axios";
import { useEffect, useState } from "react";
import { CiBoxList } from "react-icons/ci";
import { LuBrainCircuit } from "react-icons/lu";

type Task = {
  _id: number;
  title: string;
  description: string;
  status: 'pending' | 'completed';
  dueDate: string;
};

// const fakeTasks: Task[] = [
//   {
//     id: 1,
//     title: 'Complete project proposal',
//     description: 'Write and submit the project proposal for client review by end of week',
//     status: 'pending',
//     dueDate: '2023-11-15',
//   },
//   {
//     id: 2,
//     title: 'Fix login page bug',
//     description: 'The login page crashes when users enter special characters in the password field',
//     status: 'completed',
//     dueDate: '2023-11-10',
//   },
//   {
//     id: 3,
//     title: 'Schedule team meeting',
//     description: 'Organize weekly team meeting and send calendar invites to all members',
//     status: 'pending',
//     dueDate: '2023-11-17',
//   },
//   {
//     id: 4,
//     title: 'Update documentation',
//     description: 'Update API documentation with the new endpoints added in v2.1',
//     status: 'pending',
//     dueDate: '2023-11-20',
//   },
//   {
//     id: 5,
//     title: 'Review pull requests',
//     description: 'Review and merge pending pull requests in the development branch',
//     status: 'completed',
//     dueDate: '2023-11-08',
//   },
//   {
//     id: 6,
//     title: 'Prepare quarterly report',
//     description: 'Compile data and create presentation for the quarterly business review',
//     status: 'pending',
//     dueDate: '2023-11-30',
//   },
//   {
//     id: 7,
//     title: 'Setup CI/CD pipeline',
//     description: 'Configure continuous integration and deployment for the new microservice',
//     status: 'completed',
//     dueDate: '2023-10-25',
//   },
//   {
//     id: 8,
//     title: 'Interview new candidates',
//     description: 'Conduct technical interviews for the frontend developer position',
//     status: 'pending',
//     dueDate: '2023-11-22',
//   },
//   {
//     id: 9,
//     title: 'Migrate database',
//     description: 'Migrate production database to the new cluster with zero downtime',
//     status: 'pending',
//     dueDate: '2023-12-05',
//   },
//   {
//     id: 10,
//     title: 'Team building activity',
//     description: 'Organize a team building event for the engineering department',
//     status: 'pending',
//     dueDate: '2023-12-15',
//   },
// ];






export default function TaskList() {


  const [taskResult, setTaskResult] = useState<Record<number, string>>({});
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  useEffect(()=>{
    const fetchTask = async ()=>{
      try {
        const response= await axios.get('api/task')
        if (response.data.success) {
          setTasks(response.data.data);
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
  },[])

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
      const clentext = text.replace(/\n/g, '').replace(/"/g, '');
      console.log(text);


      if (!res.ok) {
        setError(data.error || 'Error from API');


      } else {
        // Assuming the generated text is in data.result.candidates[0].output (check actual response)
        setResult(data.result?.candidates?.[0]?.output || JSON.stringify(clentext));
      }


      setTaskResult(prev => ({
        ...prev,
        [taskId]: clentext
      }));
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    }


  };


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
                  <span className="relative z-10 flex items-center gap-3">Suggest Subtasks<LuBrainCircuit /></span>
                </button> </h3>
              {taskResult[task._id] && (
                <div className="mt-3 bg-white rounded-xl shadow-md border border-gray-200 p-4 text-gray-900 whitespace-pre-wrap">
                  {taskResult[task._id]}
                </div>
              )}
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
            <button className="p-2 bg-red-300 rounded-xl hover:bg-red-500 ">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
