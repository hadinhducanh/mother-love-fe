import Slider from "react-slick";

export const Brand = () => {
  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: false,
    slidesToShow: 6,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 479,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="brand-section section section-padding pt-0">
      <div className="container-fluid">
        <div className="row">
          <Slider {...settings} className="brand-slider">
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-1.png" alt="Brand 1" />
            </div>
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-2.png" alt="Brand 2" />
            </div>
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-3.png" alt="Brand 3" />
            </div>
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-4.png" alt="Brand 4" />
            </div>
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-5.png" alt="Brand 5" />
            </div>
            <div className="brand-item col">
              <img src="./src/assets/images/brands/brand-6.png" alt="Brand 6" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
};
