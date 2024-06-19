export const HomePageBanner = () => {
    return(
        <>
        <div className="banner-section section section-padding pt-0">
        <div className="container-fluid">
          <div className="row row-10 mbn-20">
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div className="banner banner-1 home-2-banner content-left content-middle">
                <a href="#" className="image">
                  <img
                    src="./src/assets/images/banner/banner-7.jpg"
                    alt="Banner Image"
                  />
                </a>
                <div className="content">
                  <h1>
                    New Arrival <br />
                    Baby’s Shoe <br />
                    GET 30% OFF
                  </h1>
                  <a href="#" data-hover="SHOP NOW">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <a
                href="#"
                className="banner banner-2 home-2-banner content-right"
              >
                <img
                  src="./src/assets/images/banner/banner-8.jpg"
                  alt="Banner Image"
                />
                <div className="content bg-theme-two">
                  <h1>New Toy’s for your Baby</h1>
                </div>
                <span className="banner-offer">35% off</span>
              </a>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div className="banner banner-1 home-2-banner content-left content-middle">
                <a href="#" className="image">
                  <img
                    src="./src/assets/images/banner/banner-9.jpg"
                    alt="Banner Image"
                  />
                </a>
                <div className="content">
                  <h1>
                    Trendy <br />
                    Collections
                  </h1>
                  <a href="#" data-hover="SHOP NOW">
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Banner Section End */}
      </>
    );
};