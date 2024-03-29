import { useEffect, useState } from "react";
import NewProject from "./components/NewProject";
import NoContent from "./components/Home";
import ProjectsSideBar from "./components/ProjectsSideBar";
import SelectedProject from "./components/SelectedProject";
import { RiMenu4Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

function App() {
 
  const getData = window.localStorage.getItem("isOpen");

  const initialState = JSON.parse(localStorage.getItem("ProjectSelected")) || {
    selectedProjectsId: undefined,
    projects: [],
    tasks: [],
  };

  const initialToggle = JSON.parse(localStorage.getItem("isOpen"));

  const [isOpen, setIsOpen] = useState(initialToggle);
  const [projectSelected, setProjectSelected] = useState(initialState);


  useEffect(() => {
    localStorage.setItem("ProjectSelected", JSON.stringify(projectSelected));
  }, [projectSelected]);


  useEffect(() => {
    localStorage.setItem("isOpen", JSON.stringify(isOpen));
  }, [isOpen]);


  const handleToogle = () => {
    setIsOpen((open) => !open);
  };


  const handleAddTasks = (text) => {
    setProjectSelected((prevSelected) => {
      const taskId = Math.floor(Math.random() * 100) + 1;
      const newTasks = {
        text: text,
        projectId: prevSelected.selectedProjectsId,
        id: taskId,
      };
      const projectToast = `${newTasks.text} added`;
      toast.success(projectToast, { position: "top-right", autoClose: 500 });
      return {
        ...prevSelected,
        tasks: [...prevSelected.tasks, newTasks],
      };
    });
  };
  

  const handleDeleteTasks = (id) => {
    setProjectSelected((prevSelected) => {
      toast.error("Task Deleted Successfuly!", {
        position: "top-right", autoClose: 500
      });
      return {
        ...prevSelected,
        tasks: prevSelected.tasks.filter((task) => task.id !== id),
      };
    });
  };


  const handleStartProjects = () => {
    setProjectSelected((prevSelected) => {
      return {
        ...prevSelected,
        selectedProjectsId: null,
      };
    });
  };

  const handleStopProjects = () => {
    setProjectSelected((prevSelected) => {
      return {
        ...prevSelected,
        selectedProjectsId: undefined,
      };
    });
  };


  const handleCreateNewProjects = (projectData) => {
    setProjectSelected((prevSelected) => {
      const newProject = {
        ...projectData,
        id: Math.floor(Math.random() * 100) + 1,
      };
      const projectToast = `New Project added: ${newProject.title}`;
      toast.success(projectToast, { position: "top-right", autoClose: 500 });

      return {
        ...prevSelected,
        selectedProjectsId: undefined,
        projects: [...prevSelected.projects, newProject],
      };
    });
  };


  const handleSelectedList = (id) => {
    setProjectSelected((prevSelected) => {
      return {
        ...prevSelected,
        selectedProjectsId: id,
      };
    });
  };


  const handleDeleteItems = () => {
    setProjectSelected((prevSelected) => {
      toast.error("Project Deleted!", {
        position: "top-right", autoClose: 500
      });
      return {
        ...prevSelected,
        selectedProjectsId: undefined,
        projects: prevSelected.projects.filter(
          (project) => project.id !== prevSelected.selectedProjectsId
        ),
      };
    });
  };


  const selectedList = projectSelected.projects.find(
    (project) => project.id === projectSelected.selectedProjectsId
  );


  let content = (
    <SelectedProject
      project={selectedList}
      onDelete={handleDeleteItems}
      onAddTasks={handleAddTasks}
      onDeleteTasks={handleDeleteTasks}
      tasks={projectSelected.tasks}
      projectId={projectSelected.selectedProjectsId}
    />
  );


  if (projectSelected.selectedProjectsId === undefined) {
    content = <NoContent onSubmit={handleStartProjects} />;
  } else if (projectSelected.selectedProjectsId === null) {
    content = (
      <NewProject
        onStop={handleStopProjects}
        addData={handleCreateNewProjects}
        handleOpen={handleToogle}
      />
    );
  }

  return (
    <>
      <main className={`h-screen my-8 flex gap-8`}>
        <RiMenu4Line
          className={`text-3xl font-bold ml-6 absolute top-7 bg-stone-50 md:hidden`}
          onClick={() => handleToogle()}
        />
        <ProjectsSideBar
          onSubmit={handleStartProjects}
          projects={projectSelected.projects}
          onSelectedList={handleSelectedList}
          selectedListId={projectSelected.selectedProjectsId}
          classNames={
            isOpen
              ? "max-sm:left-0 max-sm:w-3/4 max-sm:transition-all max-sm:duration-300"
              : ""
          }
          handleClose={() => handleToogle()}
        />
        {content}
      </main>
      <ToastContainer />;
    </>
  );
}

export default App;
