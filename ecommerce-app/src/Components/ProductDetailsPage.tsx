import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";



type ReviewItem = {
rating:number;
comment:string;
date:string;
reviewerName:string;
reviewerEmail:string;
};

type ProductDetails={
id:number;
title:string;
rating:number;
reviews:ReviewItem[];
};
const ProductDetailsPage = () => {
const {id} = useParams();
const [product,setProduct] =useState<ProductDetails | null>(null);
const[loading,setLoading] = useState(false);
const[error,setError]= useState("");


useEffect(()=>{
const fetchProductaDetails = async()=>{
try{
setLoading(true);
setError("");
const response = await fetch(`https://dummyjson.com/products/${id}`);
const data = await response.json();
setProduct(data);
}catch(err){
setError("Failed to fetch Product Details");

}finally{
setLoading(false);
}
};
if(id){
fetchProductaDetails();
}

},[id]);
if(loading){
return<p>Loading product Details...</p>;
}
if(error){
return <p>{error}</p>;
}
if(!product){
return <p> No Product Details Found.</p>;
}

  return (
   <div style={{padding:"20px"}}>
<h1>{product.title}</h1>
<p>Overall Rating:{product.rating}</p>
<h2>Reviews</h2>
{product.reviews && product.reviews.length > 0 ? (
product.reviews.map((review,index)=>(
<div
 key={index} style={{border:"1px solid #ddd",padding:"12px",marginBottom:"12px",borderRadius:"8px",}}>
<p>
<strong>{review.reviewerName}</strong>
</p>
<p>Rating:{review.rating}</p>
<p>{review.comment}</p>
<p style={{fontSize:"12px",color:"gray"}}>
{new Date(review.date).toLocaleDateString()}
</p>
</div>
))

):(<p>No reviews Available</p>
)}
</div>
  );
};

export default ProductDetailsPage;
