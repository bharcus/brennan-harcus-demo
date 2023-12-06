import Input from "../customInputs/Input";
import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

export default function CheckoutModal({closeDialog, onCheckout}) {
    const {priceTotal} = useContext(CartContext);


  return (
    <>
      <div>
        <h2>Checkout</h2>
      </div>
      <div>
        <p>${priceTotal.toFixed(2).replace("-0", "0")}</p>
      </div>
      <form method="dialog" onSubmit={onCheckout}>
        <Input label="Full Name" name="name" type='text' minLength="4" required/>
        <Input label="E-Mail Address" name="email"  type='email'  required/>
        <Input label="Street" name="street" type='text' required/>
        <div className="control-row">
          <Input label="Postal Code" name="postal-code" type='text' pattern="[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d" required/>
          <Input label="City" name="city" type='text' required/>
        </div>
        <div className="modal-actions">
          <button type='button' className="text-button" onClick={closeDialog}>Close</button>
          <button type='submit' className="button">Submit Order</button>
        </div>
      </form>
    </>
  );
}
