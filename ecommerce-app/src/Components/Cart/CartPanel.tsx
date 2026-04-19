import type {CartItem} from "../../types/product";

type CartPanelProps = {
  cart: CartItem[];
  handleDecreaseQuantity: (id: number) => void;
  handleIncreaseQuantity: (id: number) => void;
};

const CartPanel = ({cart,handleDecreaseQuantity,handleIncreaseQuantity}:CartPanelProps)=>{
const totalPrice = cart.reduce((total,item)=>{
return total + item.price * item.quantity;
},0)

const totalItems = cart.reduce((total,item)=>{
return total + item.quantity;

},0)

return (
  <div className="cart-panel">
    <h2>Cart</h2>
    <p>Items:{totalItems}</p>
    <p>Total :${totalPrice.toFixed(2)}</p>
    
    {cart.map((item) => (
      <div key={item.id} style={{ marginBottom: "14px" }}>
        <div>
          <strong>{item.title}</strong>
        </div>

        <div>Price: ${item.price.toFixed(2)}</div>

        <div>Qty: {item.quantity}</div>

        <div>Subtotal: ${(item.price * item.quantity).toFixed(2)}</div>

        <button
          onClick={() => handleDecreaseQuantity(item.id)}
          style={{ marginRight: "10px", marginTop: "6px" }}
        >
          -
        </button>

        <button
          onClick={() => handleIncreaseQuantity(item.id)}
          style={{ marginTop: "6px" }}
        >
          +
        </button>
      </div>
    ))}
  </div>
);

}
export default CartPanel;