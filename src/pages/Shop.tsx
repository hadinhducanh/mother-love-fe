import Banner from "../components/Banner";
import { Brand } from "../components/Brand";
import Sidebar from "../components/Sidebar";

const Shop = () => {
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
                    <select className="nice-select">
                      <option>8</option>
                      <option>12</option>
                      <option>16</option>
                      <option>20</option>
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

                <div className="col-xl-4 col-md-6 col-12 mb-40">
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$25</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$09</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$18</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$15</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
                  <div className="product-item">
                    <div className="product-inner">
                      <div className="image">
                        <img src="assets/images/product/product-5.jpg" alt="" />

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
                            <a href="single-product.html"> Bowknot Bodysuit</a>
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
                  <div className="product-item">
                    <div className="product-inner">
                      <div className="image">
                        <img
                          src="/src/assets/images/product/product-6.jpg"
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
                            <a href="single-product.html">Striped T-Shirt</a>
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
                  <div className="product-item">
                    <div className="product-inner">
                      <div className="image">
                        <img
                          src="/src/assets/images/product/product-7.jpg"
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
                            <a href="single-product.html">Kislen Jak Tops</a>
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$29</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
                  <div className="product-item">
                    <div className="product-inner">
                      <div className="image">
                        <img
                          src="/src/assets/images/product/product-8.jpg"
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
                            <a href="single-product.html">Lattic Shirt</a>
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">$08</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-4 col-md-6 col-12 mb-40">
                  <div className="product-item">
                    <div className="product-inner">
                      <div className="image">
                        <img
                          src="/src/assets/images/product/product-9.jpg"
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
                            <a href="single-product.html">Skily Girld Dress</a>
                          </h4>

                          <div className="ratting">
                            <i className="fa fa-star"></i>
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
                            <span style={{ backgroundColor: "#ffb2b0" }}></span>
                            <span style={{ backgroundColor: "#0271bc" }}></span>
                            <span style={{ backgroundColor: "#efc87c" }}></span>
                            <span style={{ backgroundColor: "#00c183" }}></span>
                          </h5>
                        </div>

                        <div className="content-right">
                          <span className="price">
                            $19 <span className="old">$35</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <ul className="page-pagination">
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-left"></i>
                      </a>
                    </li>
                    <li className="active">
                      <a href="#">1</a>
                    </li>
                    <li>
                      <a href="#">2</a>
                    </li>
                    <li>
                      <a href="#">3</a>
                    </li>
                    <li>
                      <a href="#">4</a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Sidebar />
          </div>
        </div>
      </div>
      <Brand/>
    </>
  );
};
export default Shop;
