/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import agent from "@/api/agent";
import { ProductsObj } from "@/model/Product";
import { useState, useEffect } from "react";

const SidebarPopular = () => {
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Popular Product</h4>
      <div className="sidebar-product-wrap">
        {products.slice(0, 2).map((product) => {
          const images = product.image.replace(/[\[\]]/g, "").split(",");
          return (
            <div className="sidebar-product">
              <a
                href={`/single-product/${product.productId}`}
                className="image"
              >
                <img src={images[0]} alt="" />
              </a>
              <div className="content">
                <a
                  href={`/single-product/${product.productId}`}
                  className="title"
                >
                  {product.productName}
                </a>
                <span className="price">
                  <span>{product.price}</span>
                </span>
                <div className="ratting">
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star"></i>
                  <i className="fa fa-star-half-o"></i>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SidebarPopular;
