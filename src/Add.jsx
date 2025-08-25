import { useState } from "react";

function AddTask({ addTask }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    addTask(input);
    setInput("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center gap-3 mt-6"
    >
      <input
        type="text"
        placeholder="Enter Task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-80 px-4 py-3 border-2 border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition"
      />
      <button
        type="submit"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-600 hover:scale-105 transition"
      >
        Add Task
      </button>
    </form>
  );
}

export default AddTask;
