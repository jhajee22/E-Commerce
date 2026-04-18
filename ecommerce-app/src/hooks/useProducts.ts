import {useEffect, useState} from "react";
import type {ProductItem} from "../types/product";


const useProducts = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  //Filtered Product

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const limit = 20;
      const skip = (page - 1) * limit;
      const response = await fetch(
        `https://dummyjson.com/products/?limit=${limit}&skip=${skip}`,
      );
      const data = await response.json();

      setProducts((prev) => [...prev, ...data.products]);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  //Initial Load
  useEffect(() => {
    fetchData(1);
  }, []);
return {
products,
loading,
error,
searchTerm,
setSearchTerm,
selectedCategory,
setSelectedCategory,
categories,
filteredProducts,
fetchData,
};


};

export default useProducts;