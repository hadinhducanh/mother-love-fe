// import './js/Brand';
// export const Brand = () => {
//   return (
//     <>
//       {/* Brand Section Start */}
//       <div className="brand-section section section-padding pt-0">
//         <div className="container-fluid">
//           <div className="row">
//             <div className="brand-slider">
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-1.png" />
//               </div>
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-2.png" />
//               </div>
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-3.png" />
//               </div>
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-4.png" />
//               </div>
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-5.png" />
//               </div>
//               <div className="brand-item col">
//                 <img src="./src/assets/images/brands/brand-6.png" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Brand Section End */}
//     </>
//   );
// };

import React from 'react';
import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
// import './css/Brand.css';
import { Autoplay, Navigation } from 'swiper/modules';



// Initialize Swiper modules
SwiperCore.use([Autoplay, Navigation]);

export const Brand: React.FC = () => {
  return (
    <>
      {/* Brand Section Start */}
      <div className="brand-section section section-padding pt-0">
        <div className="container-fluid">
          <div className="row">
            <Swiper
              className="brand-slider"
              spaceBetween={30}
              slidesPerView={6}
              // autoplay={{ delay: 3000, disableOnInteraction: false }}
              // loop={true}
              navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
              breakpoints={{
                1199: { slidesPerView: 5 },
                991: { slidesPerView: 4 },
                767: { slidesPerView: 3 },
                479: { slidesPerView: 2 }
              }}
            >
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-1.png" alt="Brand 1" />
              </SwiperSlide>
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-2.png" alt="Brand 2" />
              </SwiperSlide>
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-3.png" alt="Brand 3" />
              </SwiperSlide>
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-4.png" alt="Brand 4" />
              </SwiperSlide>
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-5.png" alt="Brand 5" />
              </SwiperSlide>
              <SwiperSlide className="brand-item col">
                <img src="./src/assets/images/brands/brand-6.png" alt="Brand 6" />
              </SwiperSlide>
            </Swiper>
           
          </div>
        </div>
      </div>
      {/* Brand Section End */}
    </>
  );
};

export default Brand;
