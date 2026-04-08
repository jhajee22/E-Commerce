import {useState,useEffect} from "react";
import InfiniteScroll from "./Components/InfiniteScroll";
import CartPanel from "./Components/Cart/CartPanel";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

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

const[products,setProducts]= useState<ProductItem[]>([]);
const[cart,setCart] = useState<CartItem[]>(()=>{
const savedCart = localStorage.getItem("cart");
return savedCart ? JSON.parse(savedCart):[];
});
const [loading, setLoading] = useState(false);
const [error, setError] = useState<Error | null>(null);
const [searchTerm,setSearchTerm] = useState("");
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
const[selectedCategory,setSelectedCategory] = useState("all");
const categories = ["all",...new Set(products.map((product)=>product.category))];
useEffect(()=>{
const timer = setTimeout(()=>{
setDebouncedSearchTerm(searchTerm);
},500);
return ()=>clearTimeout(timer);
},[searchTerm]);

//Function for showing Filtered Product 
const filteredProducts = products.filter((product)=>{
const matchesSearch = product.title
.toLowerCase()
.includes(debouncedSearchTerm.toLowerCase());
const matchesCategory =
  selectedCategory === "all" || product.category === selectedCategory;
return matchesSearch && matchesCategory;
}

)

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

useEffect(()=>{
localStorage.setItem("cart",JSON.stringify(cart));
},[cart]);

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
toast.success(`${product.title} added to Cart`);
};

 const handleDecreaseQuantity = (id:number)=>{
setCart((prevCart)=>{
const existingItem = prevCart.find((item)=>item.id===id);
if(!existingItem){
return prevCart;
}
if(existingItem.quantity===1){
return prevCart.filter((item)=>item.id !==id);
}
return prevCart.map((item)=>
item.id===id ? {...item,quantity:item.quantity - 1} : item
);
});
};

const handleIncreaseQuantity = (id:number)=>{
setCart((prevCart)=>
prevCart.map((item)=>item.id === id ? {...item,quantity:item.quantity  + 1}: item));

};

return (
  <div className="main-container">
    {/* Left Side  */}

    <div className="product-section">
      <input 
type="text"
placeholder="Search Products..."
value={searchTerm}
onChange={(e)=>setSearchTerm(e.target.value)}
style={{padding:"10px" ,width:"50%",marginBottom:"20px"}}
/>

<select
value={selectedCategory}
onChange={(e)=>setSelectedCategory(e.target.value)}
style={{
padding:"10px",
marginBottom:"20px",
width:"100px"
}}
>
{categories.map((category)=>(
<option key={category} value={category}>
{category}
</option>
))}
</select>
      <InfiniteScroll
        products={filteredProducts}
        fetchData={fetchData}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
      />
    </div>
    {/* RIGHT SIDE  */}

    <div className="cart-section">
      <CartPanel
        cart={cart}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
      />
    </div>
    <ToastContainer position="top-right" autoClose={2000} />
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
