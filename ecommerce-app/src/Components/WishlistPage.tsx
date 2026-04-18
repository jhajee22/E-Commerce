import type { ProductItem } from "../types/product";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

type WishlistPageProps = {
  products: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
};

const WishlistPage = ({ products, onAddToCart }: WishlistPageProps) => {
  const { wishlist, removeFromWishList } = useWishlist();
  const navigate = useNavigate();

  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate("/home")}
        style={{ marginBottom: "20px" }}
      >
        Back to Home
      </button>

      <h1>My Wishlist ({wishlistProducts.length})</h1>

      {wishlistProducts.length === 0 ? (
        <p>No items in wishlist</p>
      ) : (
        <div className="products-list">
          {wishlistProducts.map((product) => {
            const discountedPrice = (
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2);

            return (
              <div key={product.id} className="product-card">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image"
                />

                <div className="product-info">
                  <h2 className="product-title">{product.title}</h2>
                  <span className="product-category">{product.category}</span>

                  {product.brand && (
                    <span className="product-brand">{product.brand}</span>
                  )}

                  <p className="product-description">{product.description}</p>

                  <div className="product-props">
                    <div className="product-price">
                      ${discountedPrice}
                      <span className="product-original-price">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button onClick={() => onAddToCart(product)}>
                    Add to Cart
                  </button>

                  <button onClick={() => removeFromWishList(product.id)}>
                    Remove from Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
