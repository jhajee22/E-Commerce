import type { ProductItem } from "../App";


type ProductCardProps = {
product:ProductItem;
onAddToCart:(product:ProductItem)=>void;


};

export const ProductCard = ({product,onAddToCart}:ProductCardProps)=>{


const discountedPrice = (

product.price - (product.price * product.discountPercentage)/100).toFixed(2);


return (
  <div className="product-card">
    <img
      src={product.thumbnail}
      alt={product.title}
      className="product-image"
    />

    <div className="product-info">
      <h2 className="product-title">
        {product.title} - {product.id}
      </h2>
      <span className="product-category">{product.category}</span>
      {product.brand && <span className="product-brand">{product.brand}</span>}
      <p className="product-description">{product.description}</p>
      <div className="product-props">
        <div className="product-price">
          ${discountedPrice}
          <span className="product-original-price">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="product-rating">
          <span className="star-rating">{"★"}</span>
<span>{Math.floor(product.rating)}</span>
        </div>
      </div>
<button onClick={()=>{

console.log("Clicked",product);
onAddToCart(product);

}} className="add-to-cart">Add to Cart</button>
<div>

<h3>Cart Items:</h3>

</div>
    </div>
  </div>
);
};


export default ProductCard;