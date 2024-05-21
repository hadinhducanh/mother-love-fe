import Banner from "../../components/Banner";
import Sidebar from "../../components/Sidebar";

const Product = () => {
  return (
    <>
    <Banner
        pageName={"Product"}
        singleName={"Product"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <div className="row row-20">
                <div className="col-lg-6 col-12 mb-40">
                  <div className="pro-large-img mb-10 fix easyzoom easyzoom--overlay easyzoom--with-thumbnails">
                    <a href="assets/images/product/product-zoom-1.jpg">
                      <img
                        src="assets/images/product/product-big-1.jpg"
                        alt=""
                      />
                    </a>
                  </div>

                  <ul id="pro-thumb-img" className="pro-thumb-img">
                    <li>
                      <a
                        href="assets/images/product/product-zoom-1.jpg"
                        data-standard="assets/images/product/product-big-1.jpg"
                      >
                        <img src="assets/images/product/product-1.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/product/product-zoom-2.jpg"
                        data-standard="assets/images/product/product-big-2.jpg"
                      >
                        <img src="assets/images/product/product-2.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/product/product-zoom-3.jpg"
                        data-standard="assets/images/product/product-big-3.jpg"
                      >
                        <img src="assets/images/product/product-3.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/product/product-zoom-4.jpg"
                        data-standard="assets/images/product/product-big-4.jpg"
                      >
                        <img src="assets/images/product/product-4.jpg" alt="" />
                      </a>
                    </li>
                    <li>
                      <a
                        href="assets/images/product/product-zoom-5.jpg"
                        data-standard="assets/images/product/product-big-5.jpg"
                      >
                        <img src="assets/images/product/product-5.jpg" alt="" />
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="col-lg-6 col-12 mb-40">
                  <div className="single-product-content">
                    <div className="head">
                      <div className="head-left">
                        <h3 className="title">Tmart Baby Dress</h3>

                        <div className="ratting">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-half-o"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                      </div>

                      <div className="head-right">
                        <span className="price">$25</span>
                      </div>
                    </div>

                    <div className="description">
                      <p>
                        enim ipsam voluptatem quia voluptas sit aspernatur aut
                        odit aut fugit, sed quia res eos qui ratione voluptatem
                        sequi Neque porro quisquam est, qui dolorem ipsum quia
                        dolor sit amet, consectetur, adipisci velit, sed quia
                        non numquam eius modi tempora inform
                      </p>
                    </div>

                    <span className="availability">
                      Availability: <span>In Stock</span>
                    </span>

                    <div className="quantity-colors">
                      <div className="quantity">
                        <h5>Quantity:</h5>
                        <div className="pro-qty">
                          <input type="text" value="1" />
                        </div>
                      </div>

                      <div className="colors">
                        <h5>Color:</h5>
                        <div className="color-options">
                          <button
                            style={{ backgroundColor: "#ff502e" }}
                          ></button>
                          <button
                            style={{ backgroundColor: "#fff600" }}
                          ></button>
                          <button
                            style={{ backgroundColor: "#1b2436" }}
                          ></button>
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
                      <a href="#">Electronic</a>
                      <a href="#">Smartphone</a>
                      <a href="#">Phone</a>
                      <a href="#">Charger</a>
                      <a href="#">Powerbank</a>
                    </div>

                    <div className="share">
                      <h5>Share: </h5>
                      <a href="#">
                        <i className="fa fa-facebook"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-twitter"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-instagram"></i>
                      </a>
                      <a href="#">
                        <i className="fa fa-google-plus"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-50">
                <div className="col-12">
                  <ul className="pro-info-tab-list section nav">
                    <li>
                      <a className="active" href="#more-info" data-toggle="tab">
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
                  <div className="pro-info-tab tab-pane active" id="more-info">
                    <p>
                      Fashion has been creating well-designed collections since
                      2010. The brand offers feminine designs delivering stylish
                      separates and statement dresses which have since evolved
                      into a full ready-to-wear collection in which every item
                      is a vital part of a woman's wardrobe. The result? Cool,
                      easy, chic looks with youthful elegance and unmistakable
                      signature style. All the beautiful pieces are made in
                      Italy and manufactured with the greatest attention. Now
                      Fashion extends to a range of accessories including shoes,
                      hats, belts and more!
                    </p>
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

              <div className="row">
                <div className="section-title text-left col col mb-30">
                  <h1>Related Product</h1>
                </div>

                <div className="related-product-slider related-product-slider-2 col-12 p-0">
                  <div className="col">
                    <div className="product-item">
                      <div className="product-inner">
                        <div className="image">
                          <img
                            src="/src/assets/images/product/product-1.jpg"
                            alt=""
                          />

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
                              <a href="single-product.html">Tmart Baby Dress</a>
                            </h4>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>

                            <h5 className="size">
                              Size: <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </h5>
                            <h5 className="color">
                              Color:
                              <span
                                style={{ backgroundColor: "#ffb2b0" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#0271bc" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#efc87c" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#00c183" }}
                              ></span>
                            </h5>
                          </div>

                          <div className="content-right">
                            <span className="price">$25</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="product-item">
                      <div className="product-inner">
                        <div className="image">
                          <img
                            src="/src/assets/images/product/product-2.jpg"
                            alt=""
                          />

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
                              <a href="single-product.html">Jumpsuit Outfits</a>
                            </h4>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </div>

                            <h5 className="size">
                              Size: <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </h5>
                            <h5 className="color">
                              Color:
                              <span
                                style={{ backgroundColor: "#ffb2b0" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#0271bc" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#efc87c" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#00c183" }}
                              ></span>
                            </h5>
                          </div>

                          <div className="content-right">
                            <span className="price">$09</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="product-item">
                      <div className="product-inner">
                        <div className="image">
                          <img
                            src="/src/assets/images/product/product-3.jpg"
                            alt=""
                          />

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
                              <a href="single-product.html">Smart Shirt</a>
                            </h4>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-o"></i>
                            </div>

                            <h5 className="size">
                              Size: <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </h5>
                            <h5 className="color">
                              Color:
                              <span
                                style={{ backgroundColor: "#ffb2b0" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#0271bc" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#efc87c" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#00c183" }}
                              ></span>
                            </h5>
                          </div>

                          <div className="content-right">
                            <span className="price">$18</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="product-item">
                      <div className="product-inner">
                        <div className="image">
                          <img
                            src="/src/assets/images/product/product-4.jpg"
                            alt=""
                          />

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
                              <a href="single-product.html">Kids Shoe</a>
                            </h4>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                              <i className="fa fa-star-o"></i>
                            </div>

                            <h5 className="size">
                              Size: <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </h5>
                            <h5 className="color">
                              Color:
                              <span
                                style={{ backgroundColor: "#ffb2b0" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#0271bc" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#efc87c" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#00c183" }}
                              ></span>
                            </h5>
                          </div>

                          <div className="content-right">
                            <span className="price">$15</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col">
                    <div className="product-item">
                      <div className="product-inner">
                        <div className="image">
                          <img
                            src="/src/assets/images/product/product-5.jpg"
                            alt=""
                          />

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
                              <a href="single-product.html">
                                {" "}
                                Bowknot Bodysuit
                              </a>
                            </h4>

                            <div className="ratting">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star-half-o"></i>
                            </div>

                            <h5 className="size">
                              Size: <span>S</span>
                              <span>M</span>
                              <span>L</span>
                              <span>XL</span>
                            </h5>
                            <h5 className="color">
                              Color:
                              <span
                                style={{ backgroundColor: "#ffb2b0" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#0271bc" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#efc87c" }}
                              ></span>
                              <span
                                style={{ backgroundColor: "#00c183" }}
                              ></span>
                            </h5>
                          </div>

                          <div className="content-right">
                            <span className="price">$12</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
export default Product;
