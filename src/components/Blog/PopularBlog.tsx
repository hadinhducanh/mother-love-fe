import agent from "@/api/agent";
import { BlogObj } from "@/model/Blog";
import { FC, useEffect, useState } from "react";

interface OtherBlog {
  currBlogId: number | null;
}

const OtherBlog: FC<OtherBlog> = ({ currBlogId }) => {
  const [blogs, setBlogs] = useState<BlogObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo] = useState<number>(0);
  const [pageSize] = useState<number>(9);
  const [, setTotalPages] = useState<number>(1);
  useEffect(() => {
    try {
      agent.Blog.list(pageNo, pageSize).then((response) => {
        setBlogs(response.content);
        setTotalPages(response.totalPages);
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load blog.");
      setLoading(false);
    }
  }, [pageNo, pageSize]);

  const formatDate = (
    timestamp: string
  ): { day: number; month: string; year: number } => {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();

    return { day, month, year };
  };

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="sidebar">
      <h4 className="sidebar-title">Other Blog</h4>
      <div className="sidebar-blog-wrap">
        {blogs
          ?.filter((blogData) => blogData.blogId !== currBlogId)
          .slice(0, 3)
          .map((blog) => {
            console.log(
              "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
            );

            console.log(blog);

            const { day, month } = formatDate(blog.createdDate);
            return (
              <div key={blog.blogId} className="sidebar-blog">
                <a href={`single-blog/${blog.blogId}`} className="image">
                  <img src={blog.image} alt="" />
                </a>
                <div className="content">
                  <a href={`single-blog/${blog.blogId}`} className="title">
                    {blog.title}
                  </a>
                  <span className="date">
                    {day} {month}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OtherBlog;
