import type {ProductItem} from "../../App";
import type { CartItem } from "../../App";

type CartPanelProps = {
cart:CartItem[];

}

const CartPanel = ({cart}:CartPanelProps)=>{

return(
<div className="cart-panel">
<h2>Cart</h2>
<p>Items:{cart.length}</p>
<div>


</div>
{cart.map((item)=>
<p key={item.id}>
{item.title} - Qty: {item.quantity}
</p>
)}

</div>

)

}
export default CartPanel;