
// import './js/HeroSection';
// const HeroSection = () => {
//   return (
// <div>
// {/* Hero Section Start */}
// <div className="hero-section section">
//   {/* Hero Slider Start */}
//   <div className="hero-slider hero-slider-two fix">
//     {/* Hero Item Start */}
//     <div className="hero-item-2" style={{backgroundImage: 'url(./src/assets/images/hero/hero-2-bg.jpg)'}}>
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Hero Image */}
//           <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-1 order-md-2">
//             <div className="hero-image-2">
//               <img src="./src/assets/images/hero/hero-3.png"  />
//             </div>
//           </div>
//           {/* Hero Content */}
//           <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
//             <div className="hero-content-2">
//               <h1>New Arrivals <br /> Get flat <span>50%</span> off</h1>
//               <a href="#">SHOP NOW</a>
//             </div>
//           </div>
//         </div>
//       </div>    
//     </div>{/* Hero Item End */}
//     {/* Hero Item Start */}
//     <div className="hero-item-2" style={{backgroundImage: 'url(./src/assets/images/hero/hero-2-bg.jpg)'}}>
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Hero Image */}
//           <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-1 order-md-2">
//             <div className="hero-image-2">
//               <img src="./src/assets/images/hero/hero-4.png"  />
//             </div>
//           </div>
//           {/* Hero Content */}
//           <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
//             <div className="hero-content-2">
//               <h1>New Arrivals <br /> Get flat <span>50%</span> off</h1>
//               <a href="#">SHOP NOW</a>
//             </div>
//           </div>
//         </div>
//       </div>    
//     </div>{/* Hero Item End */}
//   </div>{/* Hero Slider End */}
// </div>{/* Hero Section End */}

// </div>


//   );
// };
// export default HeroSection;



import React from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './css/HeroSection.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation, Pagination]);

const HeroSection: React.FC = () => {
  return (
    <div>
      {/* Hero Section Start */}
      <div className="hero-section section">
        {/* Hero Slider Start */}
        <Swiper
          className="hero-slider hero-slider-two"
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          navigation={{ nextEl: '.custom-next', prevEl: '.custom-prev' }}
          pagination={{ clickable: true }}
        >
          {/* Hero Item Start */}
          <SwiperSlide>
            <div className="hero-item-2" style={{ backgroundImage: 'url(./src/assets/images/hero/hero-2-bg.jpg)' }}>
              <div className="container">
                <div className="row align-items-center">
                  {/* Hero Image */}
                  <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-1 order-md-2">
                    <div className="hero-image-2">
                      <img src="./src/assets/images/hero/hero-3.png" alt="Hero 3" />
                    </div>
                  </div>
                  {/* Hero Content */}
                  <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
                    <div className="hero-content-2">
                      <h1>New Arrivals <br /> Get flat <span>50%</span> off</h1>
                      <a href="#">SHOP NOW</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Hero Item End */}

          {/* Hero Item Start */}
          <SwiperSlide>
            <div className="hero-item-2" style={{ backgroundImage: 'url(./src/assets/images/hero/hero-2-bg.jpg)' }}>
              <div className="container">
                <div className="row align-items-center">
                  {/* Hero Image */}
                  <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-1 order-md-2">
                    <div className="hero-image-2">
                      <img src="./src/assets/images/hero/hero-4.png" alt="Hero 4" />
                    </div>
                  </div>
                  {/* Hero Content */}
                  <div className="d-flex col-md-6 col-12 mt-20 mb-20 order-2 order-md-1">
                    <div className="hero-content-2">
                      <h1>New Arrivals <br /> Get flat <span>50%</span> off</h1>
                      <a href="#">SHOP NOW</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          {/* Hero Item End */}
        </Swiper>
        <button type="button" className="custom-prev">
          <i className="icofont icofont-long-arrow-left"></i>
        </button>
        <button type="button" className="custom-next">
          <i className="icofont icofont-long-arrow-right"></i>
        </button>
      </div>
      {/* Hero Section End */}
    </div>
  );
};

export default HeroSection;
