import {createContext, useContext, useEffect, useState, type ReactNode} from "react";


type WishlistContextType = {
  wishlist: number[];
  addToWishlist: (id: number) => void;
  removeFromWishList: (id: number) => void;
  isInWishlist: (id: number) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
type WishlistProviderProps = {
children:ReactNode;
}

export const WishlistProvider = ({children}:WishlistProviderProps)=>{
const [wishlist,setWishlist] = useState<number[]>(()=>{
const saved =localStorage.getItem("wishlist");
return saved ? JSON.parse(saved):[];
});

useEffect(()=>{
localStorage.setItem("wishlist",JSON.stringify(wishlist));
},[wishlist]);

const addToWishlist = (id:number)=>{
setWishlist((prev)=>{
if(prev.includes(id)) return prev;
return [...prev,id];
});
};

const removeFromWishList = (id:number)=>{
setWishlist((prev)=>prev.filter((item)=>item !== id));
};
const isInWishlist = (id:number)=>wishlist.includes(id);

return (
  <WishlistContext.Provider
    value={{ wishlist, addToWishlist, removeFromWishList, isInWishlist }}
  >
    {children}
  </WishlistContext.Provider>
);
};

export const useWishlist = ()=>{
const context = useContext(WishlistContext);
if(!context){
throw new Error("useWishlist must be used within a WishlistProvider");
}
return context;
};