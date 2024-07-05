/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-useless-escape */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState, useEffect } from "react";
import agent from "../../api/agent";
import { ProductsObj } from "../../model/Product";

export const ProductSection = () => {
  const smallProductSliderSettings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
    rows: 2,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          autoplay: true,
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 479,
        settings: {
          autoplay: true,
          slidesToShow: 2,
          arrows: false,
        },
      },
    ],
  };

  const bestDealSliderSettings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
  };
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, ] = useState<number>(0);
  const [pageSize, ] = useState<number>(10);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {/* Product Section Start */}
      <div className="product-section section section-padding pt-0">
        <div className="container">
          <div className="row mbn-40">
            <div className="col-lg-4 col-md-6 col-12 order-2 order-md-2 mb-40">
              <div className="row">
                <div className="section-title text-left col col mb-30">
                  <h1>BEST DEAL</h1>
                  <p>Exclusive deals for you</p>
                </div>
              </div>
              <Slider
                {...bestDealSliderSettings}
                className="best-deal-slider w-100"
              >
                {products.map((product) => {
                  const images = product.image
                    .replace(/[\[\]]/g, "") // Remove square brackets
                    .split(",");
                  return (
                    <div key={product.productId} className="slide-item">
                      <div className="best-deal-product">
                        <div className="image">
                          <img src={images[0]} />
                        </div>
                        <div className="content-top">
                          <div className="content-top-left">
                            <h4 className="title">
                              <a href="#">{product.productName}</a>
                            </h4>
                            <div className="ratting">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star-half-o" />
                            </div>
                          </div>
                          <div className="content-top-right">
                            <span className="price">
                              $13 <span className="old">{product.price}</span>
                            </span>
                          </div>
                        </div>
                        <div className="content-bottom">
                          <div
                            className="countdown"
                            data-countdown="2021/06/20"
                          />
                          <a href="#" data-hover="SHOP NOW">
                            SHOP NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
            <div className="col-lg-8 col-md-6 col-12 pr-3 pr-lg-4 pr-xl-5 order-1 order-md-1 mb-40">
              <div className="row">
                <div className="section-title text-left col mb-30">
                  <h1>ON SALE PRODUCTS</h1>
                  <p>All featured product find here</p>
                </div>
              </div>
              <Slider
                {...smallProductSliderSettings}
                className="small-product-slider row row-7 mbn-40"
              >
                {products.map((product) => {
                  const images = product.image
                    .replace(/[\[\]]/g, "")
                    .split(",");
                  return (
                    <div key={product.productId} className="col mb-40">
                      <div className="on-sale-product">
                        <a
                          href={`/single-product/${product.productId}`}
                          className="image"
                        >
                          <img src={images[0]} />
                        </a>
                        <div className="content text-center">
                          <h4 className="title">
                            <a href={`/single-product/${product.productId}`}>
                              {product.productName}
                            </a>
                          </h4>
                          <span className="price">
                            $19 <span className="old">{product.price}</span>
                          </span>
                          <div className="ratting">
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star" />
                            <i className="fa fa-star-half-o" />
                            <i className="fa fa-star-o" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section End */}
    </>
  );
};
