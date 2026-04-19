import CartPanel from "../Components/Cart/CartPanel";
import type {CartItem} from "../types/product";

type CartPageProps = {
  cart: CartItem[];
  handleDecreaseQuantity: (id: number) => void;
  handleIncreaseQuantity: (id: number) => void;
};

const CartPage = ({cart, handleDecreaseQuantity, handleIncreaseQuantity}:CartPageProps)=>{

return (
  <div style={{ padding: "20px" }}>
    <h1>Cart Page</h1>
    <CartPanel cart={cart} handleDecreaseQuantity={handleDecreaseQuantity} handleIncreaseQuantity={handleIncreaseQuantity} />
  </div>
);

};

export default CartPage;