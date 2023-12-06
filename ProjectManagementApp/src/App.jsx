import React from "react";
import { useState, useRef } from "react";
import "./index.css";
import NoProject from "./component/NoProject";
import ProjectList from "./component/ProjectList";
import AddProject from "./component/AddProject";
import ViewProject from "./component/ViewProject";

const initialPage = { page: "noProject", project: null };

function App() {
  const [savedProjects, setSavedProjects] = useState([]);
  const [openMainWindow, setOpenMainWindow] = useState(initialPage);

  function handleProjectSave(project) {
    setSavedProjects((prevArray) => {
      const newArray = [...prevArray];
      newArray.push(project);
      return newArray;
    });
    handleWindowChange('noProject', null);
  }

  function handleProjectRemove(projectId){
    setSavedProjects((prevArray) => {
      const foundIndex = prevArray.findIndex((project) => project.id === projectId);
      const newArray = prevArray.toSpliced(foundIndex, 1);
      return newArray;
    });
    handleWindowChange('noProject', null);
  }

  function handleWindowChange(page, project) {
    setOpenMainWindow( () => {
      return {page: page, project: project};});
  }

  function handleTaskChange(projectId, tasks){
    const foundIndex = savedProjects.findIndex((project) => project.id === projectId);
    const newProject = { ...savedProjects[foundIndex]};
    newProject.tasks = tasks;
    const newArray = savedProjects.toSpliced(foundIndex, 1, newProject);
    setSavedProjects(newArray);
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectList setWindow={handleWindowChange} projects={savedProjects} />
      {openMainWindow.page === "noProject" && (
        <NoProject setWindow={handleWindowChange} />
      )}
      {openMainWindow.page === "addProject" && (
        <AddProject
          setWindow={handleWindowChange}
          saveProject={handleProjectSave}
        />
      )}
      {(openMainWindow.page ==='viewProject' && openMainWindow.project) && <ViewProject onTaskChange={handleTaskChange} project={openMainWindow.project} onRemove={handleProjectRemove}/>}
    </main>
  );
}

export default App;
