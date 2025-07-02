"use client"

import { useState } from "react";

import TaskList from "./components/TaskList";
import { LuCircleFadingPlus } from "react-icons/lu";
import TaskForm from "./components/Taskform";
import { IoCloseCircleSharp } from "react-icons/io5";


export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);


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
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    }

    setLoading(false);
  };

  const [showForm, setShowForm] = useState(false);


  return (
    <div className="grid grid-cols-4 " style={{ padding: 20 }}>
      {/* <h1>Google Gemini Next.js + TypeScript Demo</h1>
      <textarea
        rows={5}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt here"
        style={{ width: '100%', fontSize: 16 }}
        className="border-2 p-2"
      />
      <button onClick={handleSubmit} disabled={loading || !prompt.trim()}>
        {loading ? 'Generating...' : 'Generate Text'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && (
        <div className="mt-6">

          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-gray-900 whitespace-pre-wrap">
            {result}
          </div>
        </div>
      )} */}
      <div className="col-span-1">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600  text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {showForm ? <span className="flex items-center gap-3">Close<IoCloseCircleSharp /></span> : <span className="flex items-center gap-3">Add task<LuCircleFadingPlus /></span>}
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
