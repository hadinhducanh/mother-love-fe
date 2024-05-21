export const Blog = () => {
    return(
        <>
       {/* Blog Section Start */}
<div className="blog-section section section-padding pt-0">
  <div className="container">
    <div className="row">
      <div className="section-title text-center col mb-30">
        <h1>FROM THE BLOG</h1>
        <p>Find all latest update here</p>
      </div>
    </div>
    <div className="row mbn-40">
      <div className="col-lg-6 col-12 mb-40">
        <div className="blog-item">
          <div className="image-wrap">
            <h4 className="date">May <span>25</span></h4>
            <a className="image" href="single-blog.html"><img src="./src/assets/images/blog/blog-3.jpg"  /></a>
          </div>
          <div className="content">
            <h4 className="title"><a href="single-blog.html">Lates and new Trens for baby fashion</a></h4>
            <div className="desc">
              <p>Jadusona is one of the most of a exclusive Baby shop in the</p>
            </div>
            <ul className="meta">
              <li><a href="#"><img src="./src/assets/images/blog/blog-author-1.jpg" alt="Blog Author" />Muhin</a></li>
              <li><a href="#">25 Likes</a></li>
              <li><a href="#">05 Views</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="col-lg-6 col-12 mb-40">
        <div className="blog-item">
          <div className="image-wrap">
            <h4 className="date">May <span>20</span></h4>
            <a className="image" href="single-blog.html"><img src="./src/assets/images/blog/blog-4.jpg"  /></a>
          </div>
          <div className="content">
            <h4 className="title"><a href="single-blog.html">New Collection New Trend all New Style</a></h4>
            <div className="desc">
              <p>Jadusona is one of the most of a exclusive Baby shop in the</p>
            </div>
            <ul className="meta">
              <li><a href="#"><img src="./src/assets/images/blog/blog-author-2.jpg" alt="Blog Author" />Takiya</a></li>
              <li><a href="#">25 Likes</a></li>
              <li><a href="#">05 Views</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>{/* Blog Section End */}

        </>
    )
}