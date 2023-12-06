import { CartContext } from "../../store/cart-context";
import { useContext } from "react";

export default function MealItem({meal}) {
  const {addItem} = useContext(CartContext);

  const {id, name, price, description, image} = meal;
  
  return (
    <li id={id} className="meal-item">
      <article>
        <div>
          <img src={`http://localhost:3000/${image}`} />
        </div>
        <div>
          <h3>{name}</h3>
        </div>
        <div>
          <p className="meal-item-price">{price}</p>
        </div>
        <div>
          <p className="meal-item-description">
            {description}
          </p>
        </div>
        <div className="meal-item-actions">
          <button className="button" onClick={() => addItem(meal)}>Add to Cart</button>
        </div>
      </article>
    </li>
  );
}
