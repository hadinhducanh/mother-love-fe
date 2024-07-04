/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import agent from "@/api/agent";
import { CartItems, useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PopularProduct: FC = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const [products, setProducts] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(4);

  const fetchProducts = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Products.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setProducts(response.content);
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(pageNo, pageSize);
  }, [pageNo, pageSize]);

  const handleAddToCart = (productId: number) => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      addToCart(productToAdd);
      toast.success("Product added to cart!");
    }
  };

  const handleAddToWishlist = (productId: number) => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      addToWishlist(productToAdd);
      toast.success("Product added to wishlist!");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="product-section section section-padding">
      <ToastContainer position="bottom-left" />
      <div className="container">
        <div className="row">
          <div className="section-title text-center col mb-30">
            <h1>POPULAR PRODUCTS</h1>
            <p>All popular product find here</p>
          </div>
        </div>
        <div className="row mbn-40">
          {products.map((product) => {
            const images = product.image
              .replace(/[\[\]]/g, "") // Remove square brackets
              .split(","); // Split by comma
            return (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-40"
                key={product.productId}
              >
                <div className="product-item">
                  <div className="product-inner">
                    <div className="image">
                      <img src={images[0]} alt={product.productName} />
                      <div className="image-overlay">
                        <div className="action-buttons">
                          <button
                            onClick={() => handleAddToCart(product.productId)}
                          >
                            add to cart
                          </button>
                          <button
                            onClick={() =>
                              handleAddToWishlist(product.productId)
                            }
                          >
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
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-half-o" />
                          <i className="fa fa-star-o" />
                        </div>
                      </div>
                      <div className="content-right">
                        <span className="price">${product.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PopularProduct;
