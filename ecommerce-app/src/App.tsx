import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/LoginPage/Login";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";
import WishlistPage from "./Components/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App(){
const {
  cart,
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
} = useCart();



const {products,loading,error,searchTerm,setSearchTerm,selectedCategory,setSelectedCategory,categories,filteredProducts,fetchData} = useProducts();

return (
  <WishlistProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
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
        <Route
          path="/wishlist"
          element={
            <WishlistPage products={products} onAddToCart={handleAddToCart} />
          }
        />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </BrowserRouter>
  </WishlistProvider>
);
}

export default App;
