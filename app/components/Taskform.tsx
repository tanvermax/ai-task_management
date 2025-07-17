import axios from 'axios';
import { useState } from 'react';

type TaskStatus = 'pending' | 'completed';

interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  dueDate: string;
}

const TaskForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'pending',
    dueDate: '',
  });

  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  // const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to an API
    alert('Task submitted successfully!');
    
    // Reset form after submission
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      dueDate: '',
    });

  try {
    
    const response = await axios.post("/api/task",formData);
    console.log('Task created:',response.data);
    if (response.data) {
      window.location.reload(); 
    }
  } catch (error) {
    console.log(error);
  }
  };

  return (
    <div className="max-w-md mx-auto md:p-6 p-2 bg-white rounded-lg shadow-md border border-gray-200">
      <h2 className="md:text-2xl text-[10px] font-bold text-center mb-6 text-gray-800">Create New Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block md:text-sm text-[10px] font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full md:px-3 py-2 md:text-base text-[10px] border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block md:text-sm text-[10px] font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="block  md:text-sm text-[10px] font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="pending md:text-base text-[10px]">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="dueDate" className="block md:text-sm text-[10px] font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 md:text-base text-[10px] hover:bg-blue-700 text-white font-medium md:py-2 md:px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;