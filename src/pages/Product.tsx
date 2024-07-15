/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import agent from "../api/agent";
import { ProductsObj } from "../model/Product";
import { useParams } from "react-router";
import { Brand } from "../components/Brand";
import Banner from "../components/Banner";
import Slider from "react-slick";
import { RelatedProduct } from "../components/Shop/RelatedProduct";
import Loading from "../components/Loading";
import { useCart } from "../context/cart/CartContext";
import { useWishlist } from "../context/wishlist/WishlistContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feedback from "@/components/Feedback/Feedback";

const Product = () => {
  const proThumbIMGSettings = {
    arrows: false,
    dots: true,
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

  const { id } = useParams<{ id: string; name: string }>();
  const [products, setProducts] = useState<ProductsObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImg, setCurrentImg] = useState("");
  const [productName, setProductName] = useState<string>("");

  const productId = Number(id);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [quantity, setQuantity] = useState<number>(1); // State for quantity input
  const [maxQuantity, setMaxQuantity] = useState<number>(1); // State for maximum available quantity

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
            setMaxQuantity(response[0].quantityProduct); // Set maximum quantity available
          } else {
            setProducts([response]);
            setCurrentImg(response.image.replace(/[\[\]]/g, "").split(",")[0]);
            setProductName(response.productName);
            setMaxQuantity(response.quantityProduct); // Set maximum quantity available
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

  const handleAddToCart = () => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      if (quantity <= maxQuantity) {
        // Update quantity in productToAdd before adding to cart
        const productWithQuantity = { ...productToAdd, quantity };
        addToCart(productWithQuantity);
        toast.success("Product added to cart!", {
          position: "bottom-left", // Set position to bottom-left
        });
      } else {
        toast.error(`Quantity cannot be greater than ${maxQuantity}`);
      }
    }
  };

  const handleAddToWishlist = () => {
    const productToAdd = products.find(
      (product) => product.productId === productId
    );
    if (productToAdd) {
      addToWishlist(productToAdd);
      toast.success("Product added to wishlist!", {
        position: "bottom-left", // Set position to bottom-left
      });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0 && value <= maxQuantity) {
      setQuantity(value);
    }
  };

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
                            <h3 className="title text-4xl">
                              {product.productName}
                            </h3>

                            <div className="ratting mb-3">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>
                            <div className="price">
                              <p className="price text-3xl text-[#ff708a] font-[Dosis] font-san font-semibold">
                                Price: {product.price.toLocaleString()}VND
                              </p>
                            </div>
                          </div>

                          <div className="head-right "></div>
                        </div>

                        <div className="description">
                          <p>{product.description}</p>
                        </div>

                        <span className="availability">
                          Availability: <span>{product.status}</span>
                        </span>
                        <span className="availability">
                          Quantity product:{" "}
                          <span>{product.quantityProduct}</span>
                        </span>

                        <div className="quantity-colors">
                          <div className="quantity">
                            <h5>Quantity:</h5>
                            <div className="pro-qty">
                              <input
                                type="number"
                                min="1"
                                max={maxQuantity}
                                value={quantity}
                                onChange={handleQuantityChange}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="actions">
                          <button onClick={handleAddToCart}>
                            <i className="ti-shopping-cart"></i>
                            <span>ADD TO CART</span>
                          </button>
                          <button className="box" data-tooltip="Compare">
                            <i className="ti-control-shuffle"></i>
                          </button>
                          <button
                            className="box"
                            data-tooltip="Wishlist"
                            onClick={handleAddToWishlist}
                          >
                            <i className="ti-heart"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* single - product - content end*/}

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
                        <Feedback productId={productId} />
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
