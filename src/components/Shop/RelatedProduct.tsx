/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import { FC, useEffect, useState } from "react";
import { ProductsObj } from "../../model/Product";
import agent from "../../api/agent";
import Slider from "react-slick";

interface ProductProps {
  currentProductId: number;
}

export const RelatedProduct: FC<ProductProps> = ({ currentProductId }) => {
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // javascript functions
  const productSlider = {
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  const relatedProduct = {
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };
  // javascript functions end

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

  /* relate product */
  return (
    <div className="row">
      <div className="section-title text-center col col mb-30">
        <h1>Related Product</h1>
      </div>

      <div className="related-product-slider related-product-slider-2 col-12 p-0 row d-flex justify-content-center align-items-center">
        {/* <Slider
          {...relatedProduct}
          {...productSlider}
          className="related-product-slider-2 related-product-slider product-slider"
        > */}
        {products
          ?.filter((productData) => productData.productId !== currentProductId)
          .slice(0, 3)
          .map((productData) => {
            const images = productData.image
              .replace(/[\[\]]/g, "") // Remove square brackets
              .split(",");
            return (
              <div className="col col-md-3">
                <div key={productData.productId} className="product-item">
                  <div className="product-inner">
                    <div className="image">
                      <img src={images[0]} alt="" />

                      <div className="image-overlay">
                        <div className="action-buttons">
                          <button>add to cart</button>
                          <button>add to wishlist</button>
                        </div>
                      </div>
                    </div>

                    <div className="content">
                      <div className="content-left">
                        <h4 className="title">
                          <a href={`/single-product/${productData.productId}`}>
                            {productData.productName}
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
                        <span className="price">{productData.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        {/* </Slider> */}
      </div>
    </div>
  );
};
