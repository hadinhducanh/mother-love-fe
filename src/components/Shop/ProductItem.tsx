// ProductItem.tsx
import React from "react";
import { CartItems } from "@/context/cart/CartContext";

interface ProductItemProps {
  product: CartItems;
  onAddToCart: (productId: number) => void;
  onAddToWishlist: (productId: number) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  const images = product.image.replace(/[\[\]]/g, "").split(",");

  return (
    <div className="col-xl-4 col-md-6 col-12 mb-40">
      <div className="product-item">
        <div className="product-inner">
          <div className="image">
            <img src={images[0]} alt="" />
            <div className="image-overlay">
              <div className="action-buttons">
                {product.quantityProduct > 0 ? (
                  <button onClick={() => onAddToCart(product.productId)}>
                    add to cart
                  </button>
                ) : (
                  <button disabled>Sold out</button>
                )}
                <button onClick={() => onAddToWishlist(product.productId)}>
                  add to wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="content-left">
              <h4 className="title">
                <a href={`/single-product/${product.productId}`}>
                  {product.productName}
                </a>
              </h4>
              <div className="ratting">
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star-half-o"></i>
                <i className="fa fa-star-o"></i>
              </div>
              <span
                style={{
                  fontFamily: "Dosis, sans-serif",
                  fontSize: "24px",
                  fontWeight: 600,
                  color: "#ff708a",
                }}
              >
                {product.price.toLocaleString()}{" "}
                {/* Sử dụng toLocaleString để định dạng */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
