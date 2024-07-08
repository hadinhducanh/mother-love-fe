import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import { BlogObj } from "@/model/Blog";
import agent from "@/api/agent";
import Loading from "@/components/Loading";
import { Autocomplete, TextField } from "@mui/material";
import Pagination from "@/components/Pagination";

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>("");
  useEffect(() => {
    try {
      agent.Blog.list(pageNo, pageSize).then((response) => {
        setBlogs(response.content);
        setTotalPages(response.totalPages);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load product details.");
      setLoading(false);
    }
  }, [pageNo, pageSize]);
  useEffect(() => {
    try {
      agent.Blog.searchBlog(pageNo, pageSize, searchTerm).then((response) => {
        setBlogs(response.content);
        setTotalPages(response.totalPages);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load product details.");
      setLoading(false);
    }
  }, [pageNo, pageSize, searchTerm]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div>{error}</div>;
  }

  const formatCreatedDate = blogs.map((blog) => blog.createdDate);

  const formatDate = (
    timestamp: string
  ): { day: number; month: string; year: number } => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return { day, month, year };
  };

  // Usage example

  // Usage example
  const formattedDate = formatDate(formatCreatedDate[0]);
  const handlePageClick = (pageNumber: number) => {
    setPageNo(pageNumber - 1);
  };
  return (
    <>
      <Banner
        pageName={"Blog"}
        singleName={"Blog"}
        pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
      />
      <div>
        {/* Blog Section Start */}
        <div className="blog-section section section-padding">
          <div className="search-blog w-full mb-50  d-flex justify-center items-center">
            <Autocomplete
              className="w-[40%]"
              options={blogs}
              getOptionLabel={(option) => option.title}
              value={blogs.find((blog) => blog.title === searchTerm) || null} // Ensure value matches one of the options exactly
              onChange={(_, value) => {
                if (value) {
                  setSearchTerm(value.title);
                } else {
                  setSearchTerm("");
                }
              }}
              isOptionEqualToValue={(option, value) =>
                option.title === value.title
              } // Customize equality test
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Search Blogs"
                  variant="outlined"
                />
              )}
            />
          </div>
          <div className="container">
            <div className="row">
              {blogs.map((blog) => (
                <div key={blog.blogId} className="col-lg-6 col-12 mb-50">
                  <div className="blog-item">
                    <div className="image-wrap d-flex justify-center mr-3">
                      <h4 className="date">
                        {formattedDate.month} <span>{formattedDate.day}</span>
                      </h4>
                      <a className="image" href={`single-blog/${blog.blogId}`}>
                        <img src={blog.image} className="" />
                      </a>
                    </div>
                    <div className="content w-[80%]">
                      <h4 className="title">
                        <a href={`single-blog/${blog.blogId}`}>{blog.title}</a>
                      </h4>
                      {/* <div className="desc">
                          <p>
                            Jadusona is one of the most of a exclusive Baby shop
                            in the
                          </p>
                        </div> */}
                      <ul className="meta">
                        <li>
                          <a href={`single-blog/${blog.blogId}`}>
                            <img src={blog.user.image} alt="Blog Author" />
                            {blog.user.fullName}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
              <div className="col-12">
                <Pagination
                  pageNo={pageNo}
                  totalPages={totalPages}
                  onPageClick={handlePageClick}
                />
              </div>
            </div>
          </div>
        </div>
        {/* Blog Section End */}
      </div>
    </>
  );
};

export default Blog;
