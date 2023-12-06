import { forwardRef, useImperativeHandle, useRef } from "react";
import CartModal from "./CartModal";
import { useState } from "react";
import { createPortal } from "react-dom";
import CheckoutModal from "./CheckoutModal";
import SuccessModal from "./SuccessModal";

const Modal = forwardRef(function Modal({ ...props }, ref) {
  const [modalType, setModalType] = useState("error");

  const dialog = useRef();
  useImperativeHandle(ref, () => {
    return {
      open(type = "error") {
        setModalType(type);
        dialog.current.showModal();
      },
    };
  });

  function closeHandler() {
    dialog.current.close();
  }

  let modalContent = "";
  switch (modalType) {
    case "cart":
      modalContent = (
        <CartModal closeDialog={closeHandler} changeModal={setModalType} />
      );
      break;
    case "checkout":
      modalContent = (
        <CheckoutModal closeDialog={closeHandler} onCheckout={onCheckout} changeModal={setModalType} />
      );
      break;
    case "success":
      modalContent = <SuccessModal closeDialog={closeHandler} />;
      break;
    case "error":
    //   modalContent = <ErrorModal error={} closeDialog={closeHandler} changeModal={setModalType}/>
      break;
    default:
      modalContent = <p>error modal, modal content not working</p>;
  }

  return createPortal(
    <dialog ref={dialog} className="modal" {...props}>
      <div className="cart">{modalContent}</div>
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
