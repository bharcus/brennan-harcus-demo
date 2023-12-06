import CartModalItems from "./CartModalItems";
import { CartContext } from "../../store/cart-context";
import { useContext } from 'react';

export default function CartModal({closeDialog, changeModal}) {

  const { cartItems, priceTotal } = useContext(CartContext);
  return (
    <>
      <div>
        <h2>Your Cart</h2>
      </div>
      <div>
        <ul>
          {cartItems &&
            cartItems.map((item) => (
              <CartModalItems key={item.id} item={item} />
            ))}
        </ul>
      </div>
      <div>
        <p className="cart-total">${priceTotal.toFixed(2).replace("-0", "0")}</p>
      </div>
      <div className="modal-actions">
          <button className="text-button" onClick={() => closeDialog(false)}>Close</button>
          <button className="button" onClick={() => changeModal('checkout')}>Go to Checkout</button>
      </div>
    </>
  );
}
