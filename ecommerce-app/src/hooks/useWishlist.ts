
import { useState, useEffect } from "react";

export function useWishlist() {

// States:ids only
const [wishlist,setWishlist] = useState<number[]>(()=>{
const saved = localStorage.getItem("wishlist");
return saved ? JSON.parse(saved):[];
});

//Persist to localStorage
useEffect(()=>{
localStorage.setItem("wishlist",JSON.stringify(wishlist));
},[wishlist]);

//add (no duplicates)
const addToWishlist =(id:number)=>{
setWishlist((prev)=>{
if(prev.includes(id)) return prev;
return [...prev,id];
});
};

//remove (future use /wishlist page)
const removeFromWishlist =(id:number)=>{
wishlist.includes(id);
}

//check (derived)
const isInWishlist = (id:number)=>wishlist.includes(id); 

return {
  wishlist,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
};
}