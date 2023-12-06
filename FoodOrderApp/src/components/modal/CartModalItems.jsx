import { useContext } from "react";
import { CartContext } from "../../store/cart-context";

export default function CartModalItems({ item }) {
  const { id, name, quantity, price } = item;
  const { addQuantity, subtractQuantity } = useContext(CartContext);
  
  return (
    <li className="cart-item">
      <div>
        <p>
          {name} - {quantity} x {price}
        </p>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => addQuantity(item)}>+</button>
        <p>{quantity}</p>
        <button onClick={() => subtractQuantity(item)}>-</button>
      </div>
    </li>
  );
}
