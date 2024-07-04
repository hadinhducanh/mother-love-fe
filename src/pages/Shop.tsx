import React, { useState, useEffect } from "react";
import agent from "../api/agent";
import Banner from "../components/Banner";
import Sidebar from "../components/Shop/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { CartItems, useCart } from "@/context/cart/CartContext";
import { useWishlist } from "@/context/wishlist/WishlistContext";

const Shop = () => {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [products, setProducts] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSettings, setPageSettings] = useState({
    pageNo: 0,
    pageSize: 9,
  });
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = async (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await agent.Products.list(pageNo, pageSize);
      if (response && Array.isArray(response.content)) {
        setProducts(response.content);
        setTotalPages(response.totalPages);
      } else {
        throw new Error("Fetched data is not in expected format");
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pageSettings.pageNo, pageSettings.pageSize);
  }, [pageSettings]);

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
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageClick = (pageNumber: number) => {
    setPageSettings((prev) => ({ ...prev, pageNo: pageNumber - 1 }));
  };

  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSettings((prev) => ({
      ...prev,
      pageSize: Number(event.target.value),
      pageNo: 0, // Reset to first page
    }));
  };

  return (
    <>
      <ToastContainer position="bottom-left" />
      <Banner
        pageName={"Shop"}
        singleName={"Shop"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-2 order-lg-2 mb-40">
              <div className="row">
                <div className="col-12">
              
                  <div className="product-short">
                    <h4>Short by:</h4>
                    <select className="nice-select">
                      <option>Name Ascending</option>
                      <option>Name Descending</option>
                      <option>Date Ascending</option>
                      <option>Date Descending</option>
                      <option>Price Ascending</option>
                      <option>Price Descending</option>
                    </select>
                  </div>
                </div>
                {products.map((product) => {
                  const images = product.image
                    .replace(/[\[\]]/g, "") // Remove square brackets
                    .split(",");
                  return (
                    <div
                      className="col-xl-4 col-md-6 col-12 mb-40"
                      key={product.productId}
                    >
                      <div className="product-item">
                        <div className="product-inner">
                          <div className="image">
                            <img src={images[0]} alt="" />

                            <div className="image-overlay">
                              <div className="action-buttons">
                                {product.quantityProduct > 0 ? (
                                  <button
                                    onClick={() =>
                                      handleAddToCart(product.productId)
                                    }
                                  >
                                    add to cart
                                  </button>
                                ) : (
                                  <button disabled>Sold out</button>
                                )}
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
                                <a
                                  href={`/single-product/${product.productId}`}
                                >
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
                                {product.price.toLocaleString()} 
                              </span>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="col-12 d-flex justify-content-center">
                  <ul className="pagination">
                    <li
                      className={`page-item ${pageSettings.pageNo === 0 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageClick(pageSettings.pageNo)}
                        disabled={pageSettings.pageNo === 0}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${pageNumber === pageSettings.pageNo ? "active" : ""
                          }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => handlePageClick(pageNumber + 1)}
                        >
                          {pageNumber + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${pageSettings.pageNo === totalPages - 1 ? "disabled" : ""
                        }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageClick(pageSettings.pageNo + 1)}
                        disabled={pageSettings.pageNo === totalPages - 1}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
