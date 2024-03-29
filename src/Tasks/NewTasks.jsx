import React, { useState } from "react";

const NewTasks = ({ onAdd }) => {
  const [updateInputTasks, setUpdateInputTasks] = useState("");

  const handleInputTasks = (e) => {
    setUpdateInputTasks(e.target.value);
  };
  const handleInputClick = () => {
    if (updateInputTasks.trim() === "" || updateInputTasks.trim === 0) {
      return;
    }
    onAdd(updateInputTasks);
    setUpdateInputTasks("");
  };

  return (
    <div className={`flex items-center gap-4 max-[320px]:w-[18rem]`}>
      <input
        type="text"
        className={`w-64 py-1 px-2 border rounded-md bg-stone-200 max-[320px]:w-[12rem]`}
        value={updateInputTasks}
        onChange={handleInputTasks}
      />
      <button
        className={`text-stone-700 hover:text-stone-50 bg-gray-300 hover:bg-green-500 py-1 px-2 rounded-sm `}
        onClick={handleInputClick}
      >
        Add Task
      </button>
    </div>
  );
};

export default NewTasks;
