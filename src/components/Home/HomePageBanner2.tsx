export const HomePageBanner2 = () => {
    return (
        <>
      {/* Banner Section Start */}
<div className="banner-section section section-padding pt-0 fix">
  <div className="row row-5 mbn-10">
    <div className="col-lg-4 col-md-6 col-12 mb-10">
      <div className="banner banner-5 home-2-banner">
        <a href="#" className="image"><img src="./src/assets/images/banner/banner-10.jpg" alt="Banner Image" /></a>
        <div className="content" style={{backgroundImage: 'url(./src/assets/images/banner/banner-5-2-shape.png)'}}>
          <h1>Collection for <br />Baby Girl’s</h1>
          <h2>Flat 25% off</h2>
        </div>
        <a href="#" className="shop-link" data-hover="SHOP NOW">SHOP NOW</a>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-12 mb-10">
      <div className="banner banner-4 home-2-banner">
        <a href="#" className="image"><img src="./src/assets/images/banner/banner-11.jpg" alt="Banner Image" /></a>
        <div className="content">
          <div className="content-inner">
            <h1>Online Shopping</h1>
            <h2>Flat 25% off <br />New Trend for 2018</h2>
            <a href="#" data-hover="SHOP NOW">SHOP NOW</a>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-4 col-md-6 col-12 mb-10">
      <div className="banner banner-3 home-2-banner">
        <a href="#" className="image"><img src="./src/assets/images/banner/banner-12.jpg" alt="Banner Image" /></a>
        <div className="content" style={{backgroundImage: 'url(./src/assets/images/banner/banner-3-2-shape.png)'}}>
          <h1>New Arrivals</h1>
          <h2>Up to 35% off</h2>
          <h4>2 - 5 Years</h4>
        </div>
        <a href="#" className="shop-link" data-hover="SHOP NOW">SHOP NOW</a>
      </div>
    </div>
  </div>
</div>{/* Banner Section End */}
</>
    )
}