
import React, { useState, useEffect } from "react";
import agent from "../api/agent";
import Banner from "../components/Banner";
import Sidebar from "../components/Sidebar";
import { ProductsObj } from "../model/Product";
import { useCart } from "../cart/CartContext";

const Shop = () => {
 
  const { addToCart } = useCart();
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(8);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Products.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setProducts(response.content);
          setTotalPages(response.totalPages);
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
    const productToAdd = products.find(product => product.productId === productId);
    if (productToAdd) {
      addToCart(productToAdd);
      console.log(`Adding product ${productId} to cart`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePageClick = (pageNumber: number) => {
    setPageNo(pageNumber - 1);
  };

  return (
    <>
      <Banner
        pageName={"Shop"}
        singleName={"Shop"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <div className="row">
                <div className="col-12">
                  <div className="product-show">
                    <h4>Show:</h4>
                    <select className="nice-select" onChange={(e) => setPageSize(Number(e.target.value))}>
                      <option value="8">8</option>
                      <option value="12">12</option>
                      <option value="16">16</option>
                      <option value="20">20</option>
                    </select>
                  </div>
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
                    <div className="col-xl-4 col-md-6 col-12 mb-40" key={product.productId}>
                      <div className="product-item">
                        <div className="product-inner">
                          <div className="image">
                            <img src={images[0]} alt="" />

                            <div className="image-overlay">
                              <div className="action-buttons">
                                <button onClick={() => handleAddToCart(product.productId)}>add to cart</button>
                                <button>add to wishlist</button>
                              </div>
                            </div>
                          </div>

                          <div className="content">
                            <div className="content-left">
                              <h4 className="title">
                                <a href="/single-product">
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
                            </div>

                            <div className="content-right">
                              <span className="price">{product.price}</span>
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
                      className={`page-item ${pageNo === 0 ? "disabled" : ""}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageClick(pageNo)}
                        disabled={pageNo === 0}
                      >
                        Previous
                      </button>
                    </li>
                    {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                      <li
                        key={pageNumber}
                        className={`page-item ${
                          pageNumber === pageNo ? "active" : ""
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
                      className={`page-item ${
                        pageNo === totalPages - 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageClick(pageNo + 2)}
                        disabled={pageNo === totalPages - 1}
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
