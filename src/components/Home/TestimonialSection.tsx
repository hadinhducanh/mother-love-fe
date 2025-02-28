import Slider from "react-slick";

// import './js/TestimonialSection';
export const TestimonialSection = () => {
  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    // prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left"></i></button>',
    // nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <>
      {/* Testimonial Section Start */}
      <div className="testimonial-section section section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="section-title text-center col mb-30">
              <h1>CLIENTS REVIEW</h1>
              <p>Clients says abot us</p>
            </div>
          </div>

          <Slider {...settings} className="testimonial-slider row">
            <div className="col">
              <div className="testimonial-item">
                <p>
                  Jadusona is one of the most exclusive Baby shop in the wold,
                  where you can find all product for your baby that your want to
                  buy for your baby. I recomanded this shop all of you
                </p>
                <div className="testimonial-author">
                  <img src="./src/assets/images/testimonial/testimonial-1.png" />
                  <div className="content">
                    <h4>Zacquline Smith</h4>
                    <p>CEO, Momens Group</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="testimonial-item">
                <p>
                  Jadusona is one of the most exclusive Baby shop in the wold,
                  where you can find all product for your baby that your want to
                  buy for your baby. I recomanded this shop all of you
                </p>
                <div className="testimonial-author">
                  <img src="./src/assets/images/testimonial/testimonial-2.png" />
                  <div className="content">
                    <h4>Nusaha Williams</h4>
                    <p>CEO, Momens Group</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="testimonial-item">
                <p>
                  Jadusona is one of the most exclusive Baby shop in the wold,
                  where you can find all product for your baby that your want to
                  buy for your baby. I recomanded this shop all of you
                </p>
                <div className="testimonial-author">
                  <img src="./src/assets/images/testimonial/testimonial-1.png" />
                  <div className="content">
                    <h4>Zacquline Smith</h4>
                    <p>CEO, Momens Group</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="testimonial-item">
                <p>
                  Jadusona is one of the most exclusive Baby shop in the wold,
                  where you can find all product for your baby that your want to
                  buy for your baby. I recomanded this shop all of you
                </p>
                <div className="testimonial-author">
                  <img src="./src/assets/images/testimonial/testimonial-2.png" />
                  <div className="content">
                    <h4>Nusaha Williams</h4>
                    <p>CEO, Momens Group</p>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* Testimonial Section End */}
    </>
  );
};
