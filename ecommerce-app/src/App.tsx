import React,{useState,useEffect} from "react";
import InfiniteScroll from "./Components/InfiniteScroll";

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
const[loading,setLoading]=useState(true);
const[products,setProducts]= useState<ProductItem[]>([]);
const[totalProducts,setTotalProducts ] = useState(0);
const[error,setError] = useState(null);

useEffect(()=>{
let subscribed = true;
(async ()=>{
if(subscribed){
await fetchData(1);
}
}) ();
return()=>{
subscribed = false;
};

},[]) ;

//Function to fetch data from API
const fetchData = async(page:number)=>{
try{
setLoading(true);
const response = await fetch(`https://dummyjson.com/products/?limit=10&skip=${(page - 1) * 10}`)
const data = await response.json();
if(response.ok){

setProducts((prevItems)=>[...prevItems,...data.products]);
page === 1 && setTotalProducts(()=>data.total); 

}
setLoading(false);
}catch(error){
setLoading(false);
if(error){
setError(error);

}
}

};

return (
<div>
<InfiniteScroll
products={products}
fetchData={fetchData}
loading={loading}
error={error}

/>

</div>

)
}

export default App;
