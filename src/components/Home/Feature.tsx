export const Feature = () => {
  return (
    <>
      {/* Feature Section Start */}
      <div className="feature-section section section-padding pt-0 fix">
        <div className="container-fluid">
          <div className="feature-wrap row row-10 mbn-20">
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div
                className="feature-item-2 text-center bg-theme-one"
                style={{
                  backgroundImage:
                    "url(./src/assets/images/feature/feature-1-bg.png)",
                }}
              >
                <div className="icon">
                  <img src="./src/assets/images/feature/feature-1.png" />
                </div>
                <div className="content">
                  <h3>Free Shipping</h3>
                  <p>Start from $100</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div
                className="feature-item-2 text-center bg-theme-one"
                style={{
                  backgroundImage:
                    "url(./src/assets/images/feature/feature-2-bg.png)",
                }}
              >
                <div className="icon">
                  <img src="./src/assets/images/feature/feature-2.png" />
                </div>
                <div className="content">
                  <h3>Money Back Guarantee</h3>
                  <p>Back within 25 days</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-12 mb-20">
              <div
                className="feature-item-2 text-center bg-theme-one"
                style={{
                  backgroundImage:
                    "url(./src/assets/images/feature/feature-3-bg.png)",
                }}
              >
                <div className="icon">
                  <img src="./src/assets/images/feature/feature-3.png" />
                </div>
                <div className="content">
                  <h3>Secure Payment</h3>
                  <p>Payment Security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature Section End */}
    </>
  );
};
