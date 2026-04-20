import Checkout from "../Components/Checkout/Checkout";
import type {CartItem} from "../types/product";
type CheckoutPageProps = {
cart:CartItem[];
}
const CheckoutPage = ({cart}:CheckoutPageProps) =>{

return(
<div style={{padding:"20px"}}>
<h1>Checkout Page</h1>
<Checkout cart={cart}/>
</div>


)


}

export default CheckoutPage;