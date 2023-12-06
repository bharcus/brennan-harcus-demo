import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(props, ref) {
  const dialogRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return createPortal(
    <dialog
      {...props}
      ref={dialogRef}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      <div>
        <h2 className="text-2xl font-bold text-stone-700 mb-4">Invalid Input</h2>
        <p className="text-stone-600 whitespace-pre-wrap">Oops... it looks like you forgot to fill in a field.</p>
        <p className="text-stone-600 whitespace-pre-wrap">Please be sure to fill in all project fields before continuing.</p>
      </div>
      <form method="dialog" className="mt-4 text-center">
        <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950">Close</button>
      </form>
    </dialog>,
    document.getElementById('modal-root')
  );
});

export default Modal;
