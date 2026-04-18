import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./Components/HomePage";
import Login from "./Components/LoginPage/Login";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import useCart from "./hooks/useCart";
import useProducts from "./hooks/useProducts";

function App(){
const {
  cart,
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
} = useCart();

const {loading,error,searchTerm,setSearchTerm,selectedCategory,setSelectedCategory,categories,filteredProducts,fetchData} = useProducts();

return (
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
      <Route path="/product/:id" element={<ProductDetailsPage />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;
