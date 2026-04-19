import type {CartItem} from "../../types/product";

type CheckoutProps = {
cart:CartItem[];


}
const Checkout = ({cart}:CheckoutProps)=>{
const totalAmount = cart.reduce((sum,item)=>{
return sum + item.price * item.quantity;

},0);
return (
<div style={{border:"1px solid #ccc",padding:"20px",borderRadius:"8px"}}>
<h2>Checkout Component</h2>
<div style={{marginTop:"20px"}}>
<h3>Delivery Address</h3>
<p>Address Form Will Come here.</p>
</div>
<div style={{marginTop:"20px"}}>
<h3>Order Summary</h3>
{cart.length === 0 ? (
<p>Your cart is empty.</p>):(
<>
{cart.map((item)=>(
<div key={item.id}
style={{border:"1px solid #ccc",padding:"12px",marginBottom:"12px",borderRadius:"8px",}}
><h4>{item.title}</h4>
<p>Quantity:{item.quantity}</p>
<p>Subtotal: ${item.price * item.quantity}</p>

</div>))}
<p>Total Items:{cart.length}</p>
<h3>Total Amount: ${totalAmount}</h3>
</>
)}

</div>
<div style={{marginTop:"20px"}}>
<h3>Payment Method</h3>
<p>Payment Option will come here</p>
</div>
<button style={{marginTop:"20px"}}>Place Order</button>
</div>
);
};

export default Checkout;