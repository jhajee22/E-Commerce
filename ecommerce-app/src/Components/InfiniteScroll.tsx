import type {ProductItem} from "../types/product";
import ProductCard from "./Product";
import { useEffect, useState } from "react";


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

return (
  <div>
    <div className="products-list">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
    {loading && <p>Loading...</p>}
    {error && <p>Error: {error.message}</p>}
  </div>
);

};

export default InfiniteScroll;