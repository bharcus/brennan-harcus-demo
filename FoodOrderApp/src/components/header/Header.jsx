import MealHeader from "./MainHeader";
import logo from "/logo.jpg";
import Modal from "../modal/Modal";
import CartModal from "../modal/CartModal";
import CheckoutModal from "../modal/CheckoutModal";
import SuccessModal from "../modal/SuccessModal";
import ErrorModal from "../modal/ErrorModal";
import { sendCheckout } from "../../helper-functions/fetchHandling";
import { useState, useContext } from 'react';
import { CartContext } from "../../store/cart-context";

export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { cartItems, productTotal, resetCart } = useContext(CartContext);

  async function checkoutHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formDataObject = Object.fromEntries(formData.entries());
    const orderResponse = await sendCheckout(cartItems, formDataObject);
    console.log("http call after");
    console.log(orderResponse);
    if (orderResponse.okStatus) {
      console.log("its in success");
      resetCart();
      setModalType("success");
    } else {
      setErrorMessage(orderResponse.message);
      setModalType("error");
    }
  }

  function openModalHandler(modalType) {
    setModalType(modalType);
    if (modalOpen === false) {
      setModalOpen(true);
    }
  }

  function closeModalHandler() {
    setModalType("");
    setModalOpen(false);
  }

  return (
    <>
      <Modal open={modalOpen}>
        {modalType === "cart" && (
          <CartModal
            closeDialog={closeModalHandler}
            changeModal={openModalHandler}
          />
        )}
        {modalType === "checkout" && (
          <CheckoutModal
            closeDialog={closeModalHandler}
            onCheckout={checkoutHandler}
          />
        )}
        {modalType === "success" && (
          <SuccessModal closeDialog={closeModalHandler} />
        )}
        {modalType === "error" && (
          <ErrorModal
            closeDialog={closeModalHandler}
            changeModal={openModalHandler}
            error={errorMessage}
          />
        )}
      </Modal>
      <header id="main-header">
        <MealHeader title="REACTFOOD" img={logo} />
        <button
          className="text-button"
          onClick={() => openModalHandler("cart")}
        >
          Cart {`(${productTotal})`}
        </button>
      </header>
    </>
  );
}
