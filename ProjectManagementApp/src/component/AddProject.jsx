import Input from "./Input";
import Modal from "./Modal";
import { useRef } from "react";

export default function AddProject({ saveProject, setWindow }) {
  const titleRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const dialogRef = useRef();

  function verifyEntry() {
    const titleCheck = titleRef.current.value.trim() != "";
    const dateCheck = dateRef.current.value.trim() != "";
    const descriptionCheck = descriptionRef.current.value.trim() != "";

    if (titleCheck && dateCheck && descriptionCheck) {
      return true;
    }
    return false;
  }

  function handleSavedPackage(event) {
    event.preventDefault();
    const validate = verifyEntry();
    if (validate) {
      const newProject = {
        id: Math.random() * 1000,
        title: titleRef.current.value,
        dueDate: dateRef.current.value,
        description: descriptionRef.current.value,
        tasks: [],
      };
      saveProject(newProject);
      event.target.reset();
    } else {
      dialogRef.current.open();
    }
  }

  return (
    <>
      <form
        className="mt-4 text-right"
        onSubmit={(event) => {
          handleSavedPackage(event);
        }}
      >
        <div className="w-[35rem] mt-16">
          <div className="flex items-center gap-4 justify-end">
            <button
              className="text-stone-700 hover:text-stone-950"
              type="reset"
              onClick={() => setWindow("noProject", null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </div>
          <Input ref={titleRef} label="Title" type="text"></Input>
          <Input
            ref={descriptionRef}
            label="Description"
            type="textarea"
          ></Input>
          <Input ref={dateRef} label="Due Date" type="date"></Input>
        </div>
      </form>
      <Modal ref={dialogRef} />
    </>
  );
}
