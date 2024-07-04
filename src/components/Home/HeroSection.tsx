import Slider from "react-slick";
import "./../../assets/css/style.css";
const HeroSection = () => {
  const settings = {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
    // prevArrow: (
    //   <button
    //     type="button"
    //     style={{
    //       backgroundColor: "#fff",
    //       border: "none",
    //       color: "#000",
    //       fontSize: "18px",
    //       padding: "10px",
    //       cursor: "pointer",
    //     }}
    //     className="slick-prev"
    //   >
    //     <i className="icofont icofont-long-arrow-left"></i>
    //   </button>
    // ),
    // nextArrow: (
    //   <button
    //     type="button"
    //     style={{
    //       backgroundColor: "#fff",
    //       border: "none",
    //       color: "#000",
    //       fontSize: "18px",
    //       padding: "10px",
    //       cursor: "pointer",
    //     }}
    //     className="slick-next"
    //   >
    //     <i className="icofont icofont-long-arrow-right"></i>
    //   </button>
    // ),
  };
  return (
    <div>
      {/* Hero Section Start */}
      <div className="hero-section section">
        {/* Hero Slider Start */}
        <div
          className="hero-slider hero-slider-two fix vw-100"
          style={{
            backgroundImage:
              "url(https://jadusona.myshopify.com/cdn/shop/files/slider_01_v3_bf417f92-1b8f-4c2d-aad5-dfc606c855df.png?v=1614319633)",
            backgroundPosition: "center",
          }}
        >
          {/* Hero Item Start */}
          <Slider {...settings} className="hero-slider">
            <div
              className="hero-item-2 "
              style={{
                backgroundImage:
                  "url(https://jadusona.myshopify.com/cdn/shop/files/slider_01_v3_bf417f92-1b8f-4c2d-aad5-dfc606c855df.png?v=1614319633)",
              }}
            >
              <div className="container">
                <div className="row align-items-center ">
                  <div className="col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
                    <div className="hero-content-2 py-28">
                      <h1>
                        New Arrivals <br /> Get flat <span>50%</span> off
                      </h1>
                      <a href="#">SHOP NOW</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Hero Item End */}
            {/* Hero Item Start */}
            <div
              className="hero-item-2 "
              style={{
                backgroundImage:
                  "url(https://jadusona.myshopify.com/cdn/shop/files/slider_01_v3_bf417f92-1b8f-4c2d-aad5-dfc606c855df.png?v=1614319633)",
              }}
            >
              <div className="container">
                <div className="row align-items-center">
                  {/* Hero Image */}
                  {/* Hero Content */}
                  <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
                    <div className="hero-content-2 py-28">
                      <h1>
                        New Arrivals <br /> Get flat <span>50%</span> off
                      </h1>
                      <a href="#">SHOP NOW</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          {/* Hero Item End */}
        </div>
        {/* Hero Slider End */}
      </div>
      {/* Hero Section End */}
    </div>
  );
};
export default HeroSection;
