import ProductCard from "./Product";
import { useEffect, useState } from "react";
import type{ ProductItem } from "../App";

type InfiniteScrollProps = {
products:ProductItem[];
fetchData:(page:number)=>Promise<any>;
loading:boolean;
error:Error | null;
onAddToCart:(product:ProductItem)=>void;


};

const InfiniteScroll = ({products,fetchData,loading,error,onAddToCart}:InfiniteScrollProps
)=>{
const[page,setPage] = useState(1);

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



},[loading]);

return(
<div>
<div className="products-list">
{products.map((product,index)=>(
<ProductCard
 product={product}
 key={product.id}
onAddToCart={onAddToCart}/>

))}

</div>
{loading && <p>Loading...</p>}
{error && <p>Error:{error.message}</p>}
</div>

);

};

export default InfiniteScroll;