import InfiniteScroll from "./InfiniteScroll";
import CartPanel from "./Cart/CartPanel";
import { ToastContainer } from "react-toastify";
import type { CartItem, ProductItem } from "../App";

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
  return (
    <div className="main-container">
      <div className="product-section">
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", width: "50%", marginBottom: "20px" }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "10px",
            marginBottom: "20px",
            width: "100px",
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <InfiniteScroll
          products={products}
          fetchData={fetchData}
          loading={loading}
          error={error}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="cart-section">
        <CartPanel
          cart={cart}
          handleDecreaseQuantity={handleDecreaseQuantity}
          handleIncreaseQuantity={handleIncreaseQuantity}
        />
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default HomePage;
