import {useState,useEffect} from "react";
import type {CartItem} from "./types/product";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/LoginPage/Login";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import {toast} from "react-toastify";

export type ProductItem = {
id:number;
title:string;
description:string;
category:string;
price:number;
rating:number;
thumbnail:string;
brand:string;
discountPercentage:number;
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
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            products={filteredProducts}
            cart={cart}
            loading={loading}
            error={error}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            fetchData={fetchData}
            handleAddToCart={handleAddToCart}
            handleDecreaseQuantity={handleDecreaseQuantity}
            handleIncreaseQuantity={handleIncreaseQuantity}
          />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
