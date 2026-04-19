

import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import type {CartItem, ProductItem} from "../types/product";
import {useWishlist} from "../context/WishlistContext";
import InfiniteScroll from "../Components/InfiniteScroll";
import CartPanel from "../Components/Cart/CartPanel";

type HomePageProps = {
  products: ProductItem[];
  cart: CartItem[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  categories: string[];
  fetchData: (page: number) => Promise<any>;
  handleAddToCart: (product: ProductItem) => void;
  handleDecreaseQuantity: (id: number) => void;
  handleIncreaseQuantity: (id: number) => void;
};

const HomePage = ({
  products,
  cart,
  loading,
  error,
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  fetchData,
  handleAddToCart,
  handleDecreaseQuantity,
  handleIncreaseQuantity,
}: HomePageProps) => {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

const handleLogout = () =>{
localStorage.removeItem("accessToken");
localStorage.removeItem("user");
toast.success("Logged out Successfully");
navigate("/");


}

const totalCartItems = cart.reduce ((sum,item)=>sum + item.quantity,0);

  return (
    <div className="main-container">
      <div className="product-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", width: "50%" }}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{
              padding: "10px",
              width: "120px",
            }}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button
            onClick={() => navigate("/wishlist")}
            style={{
              position: "relative",
              padding: "10px 14px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#fff",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ♥
            {wishlist.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-8px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  minWidth: "22px",
                  height: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {wishlist.length}
              </span>
            )}
          </button>

          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          >
            🛒
            {totalCartItems > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  right: "-10px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  minWidth: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                {totalCartItems}
              </span>
            )}
          </div>

          <button onClick={handleLogout} className="btn btn-outline-danger">
            Logout
          </button>
        </div>

        <InfiniteScroll
          products={products}
          fetchData={fetchData}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="cart-section"></div>
    </div>
  );
};

export default HomePage;
