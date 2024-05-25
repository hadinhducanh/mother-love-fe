import { Brand } from "../components/Brand"

const BlogDetail = () => {
    return(
        <>
        <div className="blog-section section section-padding">
        <div className="container">
            <div className="row row-30 mbn-40">

                <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
                    <div className="single-blog">
                        <div className="image-wrap">
                            <h4 className="date">May <span>25</span></h4>
                            <a className="image" href="single-blog.html"><img src="/src/assets/images/blog/single-blog.jpg" alt=""/></a>
                        </div>
                        <div className="content">
                            <ul className="meta">
                                <li><a href="#"><img src="/src/assets/images/blog/blog-author-1.jpg" alt="Blog Author"/>Muhin</a></li>
                                <li><a href="#">25 Likes</a></li>
                                <li><a href="#">05 Views</a></li>
                            </ul>
                            <div className="desc">
                                <p>Jadusona is one of the most of a exclusive Baby shop in the enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inform enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inform.</p>
                                <p>Jadusona is one of the most of a exclusive Baby shop in the enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
                                <blockquote className="blockquote">
                                    <p>Jadusona is one of the most of a exclusive Baby shop in the enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est.</p>
                                    <span>Arif Khan - Designer</span>
                                </blockquote>
                                <p>Jadusona is one of the most of a exclusive Baby shop in the enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia res eos qui ratione voluptatem sequi Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora inform enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
                            </div>

                            <div className="blog-footer row mt-45">

                                <div className="post-tags col-lg-6 col-12 mv-15">
                                    <h4>Tags:</h4>
                                    <ul className="tag">
                                        <li><a href="#">New</a></li>
                                        <li><a href="#">brand</a></li>
                                        <li><a href="#">black</a></li>
                                        <li><a href="#">white</a></li>
                                        <li><a href="#">chire</a></li>
                                        <li><a href="#">table</a></li>
                                        <li><a href="#">Lorem</a></li>
                                        <li><a href="#">ipsum</a></li>
                                        <li><a href="#">dolor</a></li>
                                        <li><a href="#">sit</a></li>
                                        <li><a href="#">amet</a></li>
                                    </ul>
                                </div>

                                <div className="post-share col-lg-6 col-12 mv-15">
                                    <h4>Share:</h4>
                                    <ul className="share">
                                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                        <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                        <li><a href="#"><i className="fa fa-pinterest"></i></a></li>
                                        <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                                        <li><a href="#"><i className="fa fa-google-plus"></i></a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="comment-wrap mt-40">

                        <h3>3 Comments</h3>
                        <ul className="comment-list">
                            <li>
                                <div className="single-comment">
                                    <div className="image"><img src="/src/assets/images/blog/author-1.jpg" alt=""/></div>
                                    <div className="content">
                                        <h4>Frank Warren</h4>
                                        <span>29/06/2018 &nbsp;&nbsp;-<a href="#">replay</a></span>
                                        <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidi ut labore et dolo magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                                <ul className="child-comment">
                                    <li>
                                        <div className="single-comment">
                                            <div className="image"><img src="/src/assets/images/blog/author-3.jpg" alt=""/></div>
                                            <div className="content">
                                                <h4>Ronald Black</h4>
                                                <span>29/06/2018  &nbsp;&nbsp;-<a href="#">replay</a></span>
                                                <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidi ut labore et dolo magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className="single-comment">
                                    <div className="image"><img src="/src/assets/images/blog/author-2.jpg" alt=""/></div>
                                    <div className="content">
                                        <h4>Beverly Cook</h4>
                                        <span>29/06/2018 &nbsp;&nbsp;-<a href="#">replay</a></span>
                                        <p>orem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incidi ut labore et dolo magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <h3>Leave a Comment</h3>
                        <div className="comment-form">
                            <form action="#">
                                <div className="row row-10">
                                    <div className="col-md-6 col-12 mb-20"><input placeholder="Name" type="text"/></div>
                                    <div className="col-md-6 col-12 mb-20"><input placeholder="Email" type="email"/></div>
                                    <div className="col-12 mb-20"><textarea placeholder="Message"></textarea></div>
                                    <div className="col-12"><input value="submit" type="submit"/></div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>

                <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">

                    <div className="sidebar">
                        <h4 className="sidebar-title">Archive</h4>
                        <ul className="sidebar-list">
                            <li><a href="#">July 2018</a></li>
                            <li><a href="#">June 2018</a></li>
                            <li><a href="#">May 2018</a></li>
                            <li><a href="#">April 2018</a></li>
                            <li><a href="#">March 2018</a></li>
                            <li><a href="#">February 2018</a></li>
                        </ul>
                    </div>

                    <div className="sidebar">
                        <h4 className="sidebar-title">Popular Blog</h4>
                        <div className="sidebar-blog-wrap">
                            <div className="sidebar-blog">
                                <a href="single-blog.html" className="image"><img src="/src/assets/images/blog/blog-1.jpg" alt=""/></a>
                                <div className="content">
                                    <a href="single-product.html" className="title">Lates and new Trens for baby fashion</a>
                                    <span className="date">25 may</span>
                                </div>
                            </div>
                            <div className="sidebar-blog">
                                <a href="single-blog.html" className="image"><img src="/src/assets/images/blog/blog-2.jpg" alt=""/></a>
                                <div className="content">
                                    <a href="single-product.html" className="title">New Collection New Trend all New Style</a>
                                    <span className="date">25 may</span>
                                </div>
                            </div>
                            <div className="sidebar-blog">
                                <a href="single-blog.html" className="image"><img src="/src/assets/images/blog/blog-3.jpg" alt=""/></a>
                                <div className="content">
                                    <a href="single-product.html" className="title">Lates and new Trens for baby fashion</a>
                                    <span className="date">25 may</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="sidebar">
                        <h3 className="sidebar-title">Tags</h3>
                        <ul className="sidebar-tag">
                            <li><a href="#">New</a></li>
                            <li><a href="#">brand</a></li>
                            <li><a href="#">black</a></li>
                            <li><a href="#">white</a></li>
                            <li><a href="#">chire</a></li>
                            <li><a href="#">table</a></li>
                            <li><a href="#">Lorem</a></li>
                            <li><a href="#">ipsum</a></li>
                            <li><a href="#">dolor</a></li>
                            <li><a href="#">sit</a></li>
                            <li><a href="#">amet</a></li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    </div>
    <Brand/>
    </>
    )
}
export default BlogDetail