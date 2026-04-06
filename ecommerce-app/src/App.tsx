import React,{useState,useEffect} from "react";
import InfiniteScroll from "./Components/InfiniteScroll";
import CartPanel from "./Components/Cart/CartPanel";

export type ProductItem = {
id:number;
title:string;
description:string;
category:string;
price:number;
rating:number;
thumbnail:string;
brand?:string;
discountPercentage:number;
};

export type CartItem = ProductItem & {
  quantity: number;

};

function App(){

const[products,setProducts]= useState<CartItem[]>([]);
const[cart,setCart] = useState<CartItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<Error | null>(null);


//Function to fetch data from API
const fetchData = async(page:number)=>{
try{
setLoading(true);
setError(null);
const limit = 20;
const skip = (page-1)*limit;
const response = await fetch(`https://dummyjson.com/products/?limit=${limit}&skip=${skip}`);
const data = await response.json();


setProducts((prev)=>[...prev,...data.products]);
}catch(err){
setError(err as Error);
} finally{
setLoading(false);
}
};

useEffect(()=>{
fetchData(1);

},[]);

const handleAddToCart = (product: ProductItem) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);
    if (existingItem) {
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }
    return [...prevCart, { ...product, quantity: 1 }];
  });
};

return (


<div className="main-container">
{/* Left Side  */}

<div className="product-section">
<InfiniteScroll

products={products}
fetchData={fetchData}
loading={loading}
error={error}
onAddToCart={handleAddToCart}
/>

</div>
{/* RIGHT SIDE  */}

<div className="cart-section">
<CartPanel cart={cart}/>

</div>

</div>
  // <div>
  //   <p>Cart Items:{cart.length}</p>

  //   <InfiniteScroll
  //     products={products}
  //     fetchData={fetchData}
  //     loading={loading}
  //     error={error}
  //     onAddToCart={handleAddToCart}
  //   />
  // </div>
);
}

export default App;
