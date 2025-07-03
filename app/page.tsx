"use client"

import { useState } from "react";

import TaskList from "./components/TaskList";
import { LuCircleFadingPlus } from "react-icons/lu";
import TaskForm from "./components/Taskform";
import { IoCloseCircleSharp } from "react-icons/io5";


export default function Home() {

  const [showForm, setShowForm] = useState(false);

console.log("Add A task to show the task");
  return (
    <div className="grid grid-cols-4 " style={{ padding: 20 }}>
      <div className="col-span-1">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600  text-white md:px-4 md:py-2 md:text-base text-[10px] p-1 rounded hover:bg-blue-700"
        >
          {showForm ? <span className="flex items-center gap-3">Close<IoCloseCircleSharp /></span> : <span className="flex  items-center gap-3">Add task<LuCircleFadingPlus /></span>}
        </button>

        <div className="pt-10">
          {showForm && <TaskForm onClose={() => setShowForm(false)} />}
        </div>
        {/* <button className="flex items-center gap-3 text-blue-400"></button> */}
      </div>
      <div className="h-[90vh] overflow-y-scroll col-span-3">
        <TaskList
        />

      </div>

    </div>
  );
}
