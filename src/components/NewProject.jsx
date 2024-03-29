import React, { useRef } from "react";
import Inputs from "./Inputs";
import Button from "./Button";
import Modal from "./Modal";

const NewProject = ({ onStop, addData, handleOpen }) => {
  const modal = useRef();
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handleSave = () => {
    const enteredTitle = title.current.value;
    const enteredDescription = description.current.value;
    const enteredDueDate = dueDate.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDescription.trim() === "" ||
      enteredDueDate.trim() === ""
    ) {
      modal.current.open();
      return;
    } else {
      handleOpen();
    }

    addData({
      title: enteredTitle,
      description: enteredDescription,
      dueDate: enteredDueDate,
    });
  };
  return (
    <>
      <Modal ref={modal} buttonText="Close">
        <h2 className={`text-2xl my-4 text-stone-800`}>Invalid Input 😒</h2>
        <p className={`text-red-700 md:text-lg text-sm mb-4`}>
          Oops... Looks like you missed a field.
        </p>
        <p className="text-stone-700 md:text-lg text-sm mb-4">
          Please make sure you provide a value for every input field.
        </p>
      </Modal>
      <div className={`w-[34rem] mt-16 max-sm:mx-4 min-[800px]:pr-8`}>
        <menu className={`flex items-center justify-center my-4 gap-4`}>
          <li>
            <button
              className={`py-2 px-6 text-white font-bold rounded-md bg-[#a5adab] hover:bg-[#7d8b87]`}
              onClick={onStop}
            >
              Cancel
            </button>
          </li>
          <li>
            <Button onClick={handleSave}>Save</Button>
          </li>
        </menu>
        <div>
          <Inputs label="Title" ref={title} />
          <Inputs label="Description" ref={description} textarea />
          <Inputs type="date" label="Due date" ref={dueDate} />
        </div>
      </div>
    </>
  );
};

export default NewProject;
