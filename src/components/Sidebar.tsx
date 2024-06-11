/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import agent from "../api/agent";
import { CategoryObj } from "../model/Category";
import SidebarPopular from "./Sidebar-popular";

const Sidebar = () => {
  const [category, setCategory] = useState<CategoryObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const fetchProducts = (pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    agent.Category.list(pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response.content)) {
          setCategory(response.content);
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts(pageNo, pageSize);
  }, [pageNo, pageSize]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="col-xl-3 col-lg-4 col-12 order-2 order-lg-1 mb-40">
      <div className="sidebar">
        <h4 className="sidebar-title">Category</h4>

        <ul className="sidebar-list">
          {category.map((category) => (
            <li key={category.categoryId}>
              <a href="#">{category.categoryName}</a>
            </li>
          ))}
        </ul>
      </div>

      <SidebarPopular />

      <div className="sidebar">
        <h3 className="sidebar-title">Tags</h3>
        <ul className="sidebar-tag">
          <li>
            <a href="#">New</a>
          </li>
          <li>
            <a href="#">brand</a>
          </li>
          <li>
            <a href="#">black</a>
          </li>
          <li>
            <a href="#">white</a>
          </li>
          <li>
            <a href="#">chire</a>
          </li>
          <li>
            <a href="#">table</a>
          </li>
          <li>
            <a href="#">Lorem</a>
          </li>
          <li>
            <a href="#">ipsum</a>
          </li>
          <li>
            <a href="#">dolor</a>
          </li>
          <li>
            <a href="#">sit</a>
          </li>
          <li>
            <a href="#">amet</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Sidebar;
