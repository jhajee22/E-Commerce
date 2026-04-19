import {BrowserRouter, Route, Routes} from "react-router-dom";

import Login from "./Pages/LoginPage/Login";
import ProductDetailsPage from "./Pages/ProductDetailsPage";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";
import WishlistPage from "./Pages/WishlistPage";
import { WishlistProvider } from "./context/WishlistContext";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./Components/ProtectedRoute";
import HomePage from "./Pages/HomePage";
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
            <ProtectedRoute>
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
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishlistPage products={products} onAddToCart={handleAddToCart} />
            </ProtectedRoute>
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
