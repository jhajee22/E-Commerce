import type {ProductItem} from "../../App";
import type { CartItem } from "../../App";

type CartPanelProps = {
  cart: CartItem[];
  handleDecreaseQuantity: (id: number) => void;
  handleIncreaseQuantity: (id: number) => void;
};

const CartPanel = ({cart,handleDecreaseQuantity,handleIncreaseQuantity}:CartPanelProps)=>{

return (
  <div className="cart-panel">
    <h2>Cart</h2>
    <p>Items:{cart.length}</p>
    <div></div>
    {cart.map((item) => (
      <p key={item.id}>
        {item.title} - Qty: {item.quantity}
        <button
          onClick={() => handleDecreaseQuantity(item.id)}
          style={{ marginLeft: "10px" }}
        >
          -
        </button>
        <button
          onClick={() => handleIncreaseQuantity(item.id)}
          style={{ marginLeft: "10px" }}
        >
          +
        </button>
      </p>
    ))}
  </div>
);

}
export default CartPanel;