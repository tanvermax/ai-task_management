"use client"

import { useState } from "react";


type Task = {
    _id: number;
    title: string;
    description: string;
    status: 'pending' | 'completed';
    dueDate: string;
};

type EditTaskFormProps = {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
};

export default function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {

    const [formData, setFormData] = useState<Task>(task);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    }


    const handleSubmit = (e:React.FormEvent)=> {
        e.preventDefault();
        onSave(formData);
    }
    return (
        <>
            <div className="fixed z-30 inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg w-full max-w-md">
                    <h3 className="text-lg text-black font-semibold mb-4">Edit Task</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm text-black font-medium mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 text-black border rounded"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-medium mb-1">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full  text-black p-2 border rounded"
                                rows={3}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-medium mb-1">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full p-2 border  text-black  rounded"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-black font-medium mb-1">Due Date</label>
                            <input
                                type="date"
                                name="dueDate"
                                value={formData.dueDate.split('T')[0]}
                                onChange={handleChange}
                                className="w-full p-2 border text-black  rounded"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-black  bg-gray-300 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div></>
    )

}