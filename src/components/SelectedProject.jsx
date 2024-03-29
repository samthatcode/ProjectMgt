import React from "react";
import Tasks from "../Tasks/Tasks";
import Modal from "./Modal";
import { useRef } from "react";
import Button from "./Button";
import { BsExclamationSquare } from "react-icons/bs";

const SelectedProject = ({
  project,
  onDelete,
  onAddTasks,
  onDeleteTasks,
  tasks,
  projectId,
}) => {
  const formattedDate = new Date(project.dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const modal = useRef();

  const handleOpenModal = () => {
    modal.current.open();
  };

  return (
    <>
      <Modal ref={modal} buttonText="No">
        <div className={`flex items-center justify-center mb-4 text-red-600`}>
          {" "}
          <BsExclamationSquare className={`text-5xl`} />
        </div>

        <p className={`text-md md:text-xl`}>
          Are you sure you want to delete - "
          <span className={`font-bold`}>{project.title}</span>"?
        </p>
        <div className={`translate-y-16 flex w-1/2`}>
          <Button onClick={onDelete}>Yes</Button>
        </div>
      </Modal>
      <div className={`w-[35rem] mt-16 mr-8 max-sm:mx-4 max-[320px]:w-[18rem]`}>
        <header className={`pb-4 mb-4 border-b-2 border-b-stone-700`}>
          <div className={`flex justify-between items-center`}>
            <h1 className={`text-3xl font-bold text-stone-600 mb-2 capitalize max-sm:text-2xl`}>
              {project.title}
            </h1>
            <button
         className={`hover:text-white text-stone-700 hover:bg-red-500 bg-gray-200 py-1 px-2 rounded-sm`}
              onClick={handleOpenModal}
            >
              Delete
            </button>
          </div>
          <p className={`mb-4 text-stone-400`}>{formattedDate}</p>
          <p className={`text-stone-600 whitespace-pre-wrap`}>
            {project.description}
          </p>
        </header>
        <Tasks
          onAdd={onAddTasks}
          onDelete={onDeleteTasks}
          tasks={tasks}
          project={project}
          projectId={projectId}
        />
      </div>
    </>
  );
};

export default SelectedProject;