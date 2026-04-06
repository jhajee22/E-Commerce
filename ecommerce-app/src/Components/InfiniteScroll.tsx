import ProductCard from "./Product";
import { useEffect, useState } from "react";
import type{ ProductItem } from "../App";

const InfiniteScroll = ({products,fetchData,loading,error}:{products:ProductItem[];fetchData:(page:number)=> Promise<any>;
loading:boolean;error:null|Error})=>{
const[page,setPage] = useState(1);
const [cart, setCart] = useState<ProductItem[]>([]);

const handleAddToCart = (product: ProductItem) => {
  setCart((prevCart) => [...prevCart, product]);
};

useEffect(()=>{
console.log("Cart Updated:",cart);


},[cart]);
//Function to handle Scroll event
const handleScroll = ()=>{
const bottom = Math.ceil(window.innerHeight + window.scrollY) >=
document.documentElement.scrollHeight - 200;

if(bottom && !loading ){
setPage((prevPage)=>{
const nextPage = prevPage + 1;
fetchData(nextPage);
return nextPage;

});
}
};

useEffect(()=>{
window.addEventListener("scroll",handleScroll);
return()=>{
window.removeEventListener("scroll",handleScroll);
};



},[]);

return(
<div>
<div className="products-list">
{products.map((product,index)=>(
<ProductCard
 product={product}
 key={product.id}
onAddToCart={handleAddToCart}/>

))}

</div>
{loading && <p>Loading...</p>}
{error && <p>Error:{error.message}</p>}
</div>

);

};

export default InfiniteScroll;