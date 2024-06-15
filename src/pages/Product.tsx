/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { ProductsObj } from "../model/Product";
import { useParams } from "react-router";
import { Brand } from "../components/Brand";
import Banner from "../components/Banner";
import Slider from "react-slick";
import { RelatedProduct } from "../components/RelatedProduct";
import Loading from "../components/Loading";

const Product = () => {
  const proThumbIMGSettings = {
    arrows: true,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 4,
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { id, name } = useParams<{ id: string; name: string }>();
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImg, setCurrentImg] = useState("");
  const [productName, setProductName] = useState<string>("");

  const productId = Number(id);

  useEffect(() => {
    if (!isNaN(productId)) {
      agent.Products.details(productId)
        .then((response) => {
          if (Array.isArray(response)) {
            setProducts(response);
            setCurrentImg(
              response[0].image.replace(/[\[\]]/g, "").split(",")[0]
            );
            setProductName(response[0].productName);
          } else {
            setProducts([response]);
            setCurrentImg(response.image.replace(/[\[\]]/g, "").split(",")[0]);
            setProductName(response.productName);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to load product details.");
          setLoading(false);
        });
    } else {
      setError("Invalid product ID.");
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Banner
        pageName={productName}
        singleName={"Product"}
        pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
      />
      {products.map((product) => {
        const images = product.image
          .replace(/[\[\]]/g, "") // Remove square brackets
          .split(","); // Split by comma
        return (
          <div
            key={product.productId}
            className="page-section section section-padding"
          >
            <div className="container">
              <div className="row row-30 mbn-40">
                <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
                  {/* single - product - content */}
                  <div className="row row-20">
                    <div className="col-lg-6 col-12 mb-40">
                      <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
                        <a href={currentImg}>
                          <img src={currentImg} alt="" />
                        </a>
                      </div>
                      <Slider
                        {...proThumbIMGSettings}
                        className="pro-thumb-img"
                      >
                        {images.map((img, index) => (
                          <ul key={index}>
                            <li>
                              <a data-standard={img}>
                                <img
                                  src={img ?? images[0]}
                                  alt=""
                                  onClick={() => setCurrentImg(img)}
                                />
                              </a>
                            </li>
                          </ul>
                        ))}
                      </Slider>
                    </div>

                    <div className="col-lg-6 col-12 mb-40">
                      <div className="single-product-content">
                        <div className="head">
                          <div className="head-left">
                            <h3 className="title">{product.productName}</h3>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                          </div>

                          <div className="head-right ">
                            <span className="price fs-30">
                              Price: {product.price}
                            </span>
                          </div>
                        </div>

                        <div className="description">
                          <p>{product.description}</p>
                        </div>

                        <span className="availability">
                          Availability: <span>{product.status}</span>
                        </span>

                        <div className="quantity-colors">
                          <div className="quantity">
                            <h5>Quantity:</h5>
                            <div className="pro-qty">
                              <input type="text" value="1" />
                            </div>
                          </div>
                        </div>

                        <div className="actions">
                          <button>
                            <i className="ti-shopping-cart"></i>
                            <span>ADD TO CART</span>
                          </button>
                          <button className="box" data-tooltip="Compare">
                            <i className="ti-control-shuffle"></i>
                          </button>
                          <button className="box" data-tooltip="Wishlist">
                            <i className="ti-heart"></i>
                          </button>
                        </div>

                        <div className="tags">
                          <h5>Tags:</h5>
                          <a href="#">{product.category.categoryName}</a>
                          <a href="#">{product.brand.brandName}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* single - product - content end*/}

                  {/* More infor */}
                  <div className="row mb-50">
                    <div className="col-12">
                      <ul className="pro-info-tab-list section nav">
                        <li>
                          <a
                            className="active"
                            href="#more-info"
                            data-toggle="tab"
                          >
                            More info
                          </a>
                        </li>
                        <li>
                          <a href="#data-sheet" data-toggle="tab">
                            Data sheet
                          </a>
                        </li>
                        <li>
                          <a href="#reviews" data-toggle="tab">
                            Reviews
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="tab-content col-12">
                      <div
                        className="pro-info-tab tab-pane active"
                        id="more-info"
                      >
                        <p>{product.description}</p>
                      </div>
                      <div className="pro-info-tab tab-pane" id="data-sheet">
                        <table className="table-data-sheet">
                          <tbody>
                            <tr className="odd">
                              <td>Compositions</td>
                              <td>Cotton</td>
                            </tr>
                            <tr className="even">
                              <td>Styles</td>
                              <td>Casual</td>
                            </tr>
                            <tr className="odd">
                              <td>Properties</td>
                              <td>Short Sleeve</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="pro-info-tab tab-pane" id="reviews">
                        <a href="#">Be the first to write your review!</a>
                      </div>
                    </div>
                  </div>
                  {/* more info end */}
                </div>
                {/* <Sidebar /> */}
              </div>
            </div>
          </div>
        );
      })}
      <RelatedProduct currentProductId={productId} />
      <Brand />
    </>
  );
};
export default Product;
