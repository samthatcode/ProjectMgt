import React from "react";
import NewTasks from "./NewTasks";

const Tasks = ({ tasks, onAdd, onDelete, projectId }) => {
  return (
    <div>
      <h1 className={`capitalize text-2xl font-bold text-stone-700 mb-4`}>
        Tasks
      </h1>
      <NewTasks onAdd={onAdd} />
      {/* Tasks input */}
      {tasks.length === 0 && (
        <p className={`text-stone-800 my-4`}>
          This project does not have any tasks yet!
        </p>
      )}

      {tasks.length > 0 && (
       <ul className={`p-4 rounded-md bg-stone-100 border mt-4`}>
       {tasks
         .filter((t) => t.projectId && t.projectId === projectId)
         .map((task) => (
           <li key={task.id} className={`my-4`}>
             <div className={`flex justify-between items-center bg-gray-50 p-3`}>
               <span>{task.text}</span>
               <button
                 className={`hover:text-white text-stone-700 hover:bg-red-500 bg-gray-200 py-1 px-2 rounded-sm`}
                 onClick={() => onDelete(task.id)}
               >
                 Clear
               </button>
             </div>
           </li>
         ))}
     </ul>
     
      )}
    </div>
  );
};

export default Tasks;
