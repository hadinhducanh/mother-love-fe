import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 479,
        settings: {
          autoplay: true,
          slidesToShow: 1,
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

  return (
    <>
      {/* Product Section Start */}
      <div className="product-section section section-padding pt-0">
        <div className="container">
          <div className="row mbn-40">
            <div className="col-lg-4 col-md-6 col-12 order-1 order-md-2 mb-40">
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
                <div className="slide-item">
                  <div className="best-deal-product">
                    <div className="image">
                      <img src="./src/assets/images/product/best-deal-1.jpg" />
                    </div>
                    <div className="content-top">
                      <div className="content-top-left">
                        <h4 className="title">
                          <a href="#">2 Piece Shirt Set</a>
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
                          $13 <span className="old">$28</span>
                        </span>
                      </div>
                    </div>
                    <div className="content-bottom">
                      <div className="countdown" data-countdown="2021/06/20" />
                      <a href="#" data-hover="SHOP NOW">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
                <div className="slide-item">
                  <div className="best-deal-product">
                    <div className="image">
                      <img src="./src/assets/images/product/best-deal-2.jpg" />
                    </div>
                    <div className="content-top">
                      <div className="content-top-left">
                        <h4 className="title">
                          <a href="#">Kelly Shirt Set</a>
                        </h4>
                        <div className="ratting">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star-o" />
                        </div>
                      </div>
                      <div className="content-top-right">
                        <span className="price">
                          $09 <span className="old">$25</span>
                        </span>
                      </div>
                    </div>
                    <div className="content-bottom">
                      <div className="countdown" data-countdown="2021/06/20" />
                      <a href="#" data-hover="SHOP NOW">
                        SHOP NOW
                      </a>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
            <div className="col-lg-8 col-md-6 col-12 pr-3 pr-lg-4 pr-xl-5 order-2 order-md-1 mb-40">
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
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-1.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Skily Girld Dress</a>
                      </h4>
                      <span className="price">
                        $19 <span className="old">$35</span>
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
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-2.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Kelly Shirt Set</a>
                      </h4>
                      <span className="price">
                        $08 <span className="old">$25</span>
                      </span>
                      <div className="ratting">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-o" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-3.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Sleeveless Tops</a>
                      </h4>
                      <span className="price">
                        $05 <span className="old">$12</span>
                      </span>
                      <div className="ratting">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-4.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Babysuit Bundle</a>
                      </h4>
                      <span className="price">
                        $25 <span className="old">$45</span>
                      </span>
                      <div className="ratting">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-5.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Xshuai Baby Frock</a>
                      </h4>
                      <span className="price">
                        $13 <span className="old">$28</span>
                      </span>
                      <div className="ratting">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-6.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Stylish Hat</a>
                      </h4>
                      <span className="price">
                        $03 <span className="old">$10</span>
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
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-7.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Aolvo Kids Munch</a>
                      </h4>
                      <span className="price">
                        $25 <span className="old">$35</span>
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
                <div className="col mb-40">
                  <div className="on-sale-product">
                    <a href="single-product.html" className="image">
                      <img src="./src/assets/images/product/on-sale-8.jpg" />
                    </a>
                    <div className="content text-center">
                      <h4 className="title">
                        <a href="single-product.html">Tmart Baby Dress</a>
                      </h4>
                      <span className="price">
                        $48 <span className="old">$65</span>
                      </span>
                      <div className="ratting">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                      </div>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
      {/* Product Section End */}
    </>
  );
};
