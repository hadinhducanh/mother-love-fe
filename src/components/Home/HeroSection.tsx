import Slider from "react-slick";
import "./../../assets/css/style.css";
const HeroSection = () => {
  const settings = {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    // dots: true,
    pauseOnFocus: false,
    pauseOnHover: false,
    fade: true,
    infinite: true,
    slidesToShow: 1,
  };
  return (
    <div
      className="hero-section section"
      style={{
        width: "100%",
        backgroundPosition: "center",
        backgroundImage: `url('https://res.cloudinary.com/dhgg72vfy/image/upload/v1720430096/slider_01_v3_bf417f92-1b8f-4c2d-aad5-dfc606c855df_o3u3hj.webp')`,
      }}
    >
      <Slider {...settings} className="hero-slider hero-slider-three fix">
        <div
          className="hero-item w-full"
          style={{
            width: "100%",
            backgroundPosition: "center",
            backgroundImage: `url('https://res.cloudinary.com/dhgg72vfy/image/upload/v1720430096/slider_01_v3_bf417f92-1b8f-4c2d-aad5-dfc606c855df_o3u3hj.webp')`,
          }}
        >
          <div className="container">
            {/* Hero Content */}
            <div className="hero-content-2">
              <h1>
                Trendy &amp; Hot <br /> Baby collection 2019
              </h1>
              <a href="#">SHOP NOW</a>
            </div>
          </div>
        </div>
        {/* Hero Item End */}
        {/* Hero Item Start */}
        <div
          className="hero-item"
          style={{
            width: "100%",
            backgroundImage: `url('https://res.cloudinary.com/dhgg72vfy/image/upload/v1720430619/happy-baby-on-white-bed-600nw-1924379708_toldig.webp')`,
          }}
        >
          <div className="container">
            {/* Hero Content */}
            <div className="hero-content-2">
              <h1>
                Get 35% off <br />
                Latest Baby Product
              </h1>
              <a href="#">SHOP NOW</a>
            </div>
          </div>
        </div>
        {/* Hero Item End */}
      </Slider>
    </div>
  );
};
export default HeroSection;
