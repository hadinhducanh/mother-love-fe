import { useEffect, useState } from "react";
import { Brand } from "../components/Brand";
import { BlogObj } from "@/model/Blog";
import { useParams } from "react-router";
import agent from "@/api/agent";
import { ClipLoader } from "react-spinners";
import Slider from "react-slick";
import { CartItems } from "@/context/cart/CartContext";
import OtherBlog from "@/components/Blog/PopularBlog";

const BlogDetail: React.FC = () => {
  const [blog, setBlog] = useState<BlogObj>();
  const [product, setProduct] = useState<CartItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error] = useState<string | null>(null);
  const { id } = useParams();
  const blogId = Number(id);
  const bestDealSliderSettings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 1,
  };

  useEffect(() => {
    const getBlogDetail = async () => {
      await agent.Blog.details(blogId).then((response) => {
        setBlog(response);
        {
          blog?.product && setProduct(blog?.product);
          // setProducts(blog?.product),
        }
        setLoading(false);
      });
    };
    getBlogDetail();
  });
  const formatDate = (
    timestamp: string
  ): { day: number; month: string; year: number } => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return { day, month, year };
  };

  const formatCreatedDate = formatDate(blog?.createdDate || "");
  // const images = product.map.replace(/[\[\]]/g, "").split(",");
  if (loading) {
    return (
      <div className="text-center">
        <ClipLoader color="#00000" size={50} />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <>
      <div className="blog-section section section-padding">
        <div className="container">
          <div className="row row-30 mbn-40">
            <div className="col-xl-9 col-lg-8 col-12 order-1 order-lg-2 mb-40">
              <div className="single-blog">
                <div className="image-wrap">
                  <h4 className="date">
                    {formatCreatedDate.month}{" "}
                    <span>{formatCreatedDate.day}</span>
                  </h4>
                  <a className="image" href="">
                    <img src={blog?.image} alt="" />
                  </a>
                </div>
                <div className="content">
                  <ul className="meta">
                    <li>
                      <a href="#">
                        <img src={blog?.user.image} alt="Blog Author" />
                        {blog?.user.fullName}
                      </a>
                    </li>
                  </ul>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                  />

                  {/* <div className="blog-footer row mt-45 tex">
                    <div className="post-share col-lg-6 col-12 mv-15">
                      <h4>Share:</h4>
                      <ul className="share">
                        <li>
                          <a href="#">
                            <i className="fa fa-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-twitter"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-pinterest"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-linkedin"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fa fa-google-plus"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
              <div className="sidebar">
                <h4 className="sidebar-title">Product In Blog</h4>
                <Slider
                  {...bestDealSliderSettings}
                  className="best-deal-slider w-100"
                >
                  {product.map((product) => {
                    const images = product.image
                      .replace(/[\[\]]/g, "") // Remove square brackets
                      .split(",");
                    return (
                      <div key={product.productId} className="slide-item">
                        <div className="best-deal-product">
                          <div className="image">
                            <a href={`single-product/${product.productId}`}>
                              <img src={images[0]} />
                            </a>
                          </div>
                        </div>
                        <div className="content-top">
                          <div className="content-top-left">
                            <div className="d-flex justify-between items-center">
                              <h4 className="title font-semibold text-base">
                                <a href={`single-product/${product.productId}`}>
                                  {product.productName}
                                </a>
                              </h4>
                              <span className="price old font-semibold text-base">
                                {product.price.toLocaleString()}VND
                              </span>
                            </div>
                            <div className="ratting text-yellow-400">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star-half-o" />
                            </div>
                          </div>
                        </div>
                        <div className="content-bottom text-center font-semibold text-lg text-black hover:text-[#ff708a]">
                          <div
                            className="countdown"
                            data-countdown="2021/06/20"
                          />
                          <a
                            href={`/single-product/${product.productId}`}
                            data-hover="ADD TO CART"
                          >
                            View Detail
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
              <OtherBlog currBlogId={blog?.blogId || null} />
            </div>
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};
export default BlogDetail;
