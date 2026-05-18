import {useState} from "react";

const Payment = ()=>{
const [paymentMethod,setPaymentMethod]= useState("COD")
return (
<div style =  {{marginTop:"20px"}}>
<h3>Payment Methods</h3>
<div style={{marginTop:"10px"}}>
<label>
<input
type="radio"
name="payment"
value="COD"
checked={paymentMethod==="COD"}
onChange={(e)=>setPaymentMethod(e.target.value)}
/>
Cash on Delivery
</label>
</div>
<div style={{marginTop:"10px"}}>
<label>
<input
type="radio"
name="payment"
value="UPI"
checked={paymentMethod==="UPI"}
onChange={(e)=>setPaymentMethod(e.target.value)}
/>
UPI Payment
</label>
</div>
<div style={{marginTop:"10px"}}>
<label>
<input
type="radio"
name="payment"
value="Card"
checked={paymentMethod==="card"}
onChange={(e)=>setPaymentMethod(e.target.value)}
/>
Credit/Debit Card 
</label>
</div>
</div>
)
}

export default Payment;