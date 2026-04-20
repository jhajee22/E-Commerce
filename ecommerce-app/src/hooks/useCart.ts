import {useEffect, useState} from "react";
import type {CartItem, ProductItem} from "../types/product";
import {toast} from "react-toastify";


const useCart = ()=>{
const[cart,setCart] = useState<CartItem[]>(()=>{
const savedCart = localStorage.getItem("cart");
return savedCart ? JSON.parse(savedCart):[];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


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

const handleDecreaseQuantity = (id: number) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === id);
    if (!existingItem) {
      return prevCart;
    }
    if (existingItem.quantity === 1) {
      return prevCart.filter((item) => item.id !== id);
    }
    return prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
    );
  });
};

const handleIncreaseQuantity = (id: number) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    ),
  );
};

return {
  cart,
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
};
};

export default useCart;