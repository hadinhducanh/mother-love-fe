import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { OrderResponse } from "@/model/Order";
import { useAuth } from "@/context/auth/AuthContext";

import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";

export const OrdersList = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSettings, setPageSettings] = useState({
    pageNo: 0,
    pageSize: 5,
  });
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const renderDateAndTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    return { formattedDate, formattedTime };
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      if (userId != null) {
        if (filterApplied && startDate && endDate && selectedStatus) {
          const sortDirection = "asc";
          const response = await agent.Orders.getOrderByStatusAndDate(
            pageSettings.pageNo,
            pageSettings.pageSize,
            "orderId",
            sortDirection,
            selectedStatus,
            `${startDate}T00:00:00`,
            `${endDate}T23:59:59`
          );

          if (response && Array.isArray(response.content)) {
            setOrders(response.content);
            setTotalPages(response.totalPages);
          } else {
            throw new Error("Fetched data is not in expected format");
          }
        } else if (selectedStatus) {
          const response = await agent.Orders.getOrdersByStatus(
            pageSettings.pageNo,
            pageSettings.pageSize,
            "orderId",
            selectedStatus
          );

          if (response && Array.isArray(response.content)) {
            setOrders(response.content);
            setTotalPages(response.totalPages);
          } else {
            throw new Error("Fetched data is not in expected format");
          }
        } else {
          const response = await agent.Orders.getOrdersByUserId(
            userId,
            pageSettings.pageNo,
            pageSettings.pageSize
          );

          if (response && Array.isArray(response.content)) {
            setOrders(response.content);
            setTotalPages(response.totalPages);
          } else {
            throw new Error("Fetched data is not in expected format");
          }
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId != null) {
      fetchOrders();
    }
  }, [userId, pageSettings.pageNo, filterApplied, selectedStatus, startDate, endDate]);

  const handlePageClick = (pageNumber: number) => {
    setPageSettings((prev) => ({
      ...prev,
      pageNo: pageNumber,
    }));
  };

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`);
  };

  const handleFilterSubmit = () => {
    setFilterApplied(true);
    setPageSettings({
      ...pageSettings,
      pageNo: 0,
    });
  };

  const handleResetFilter = () => {
    setStartDate("");
    setEndDate("");
    setSelectedStatus(null);
    setFilterApplied(false);
    setPageSettings({
      ...pageSettings,
      pageNo: 0,
    });
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render pagination
  const renderPagination = () => {
    if (totalPages <= 1) {
      return null; // Hide pagination if there is only one page
    }

    const visiblePages = 3; // Number of pages to show near the current page

    let startPage = Math.max(0, pageSettings.pageNo - Math.floor(visiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    if (endPage - startPage < visiblePages - 1) {
      startPage = Math.max(0, endPage - visiblePages + 1);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <ul className="pagination">
        <li className={`page-item ${pageSettings.pageNo === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => handlePageClick(pageSettings.pageNo - 1)}
            disabled={pageSettings.pageNo === 0}
          >
            Previous
          </button>
        </li>
        {startPage > 0 && (
          <li className="page-item">
            <button className="page-link" onClick={() => handlePageClick(0)}>
              1
            </button>
          </li>
        )}
        {startPage > 1 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {pages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={`page-item ${pageNumber === pageSettings.pageNo ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => handlePageClick(pageNumber)}>
              {pageNumber + 1}
            </button>
          </li>
        ))}
        {endPage < totalPages - 2 && (
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        )}
        {endPage < totalPages - 1 && (
          <li className="page-item">
            <button
              className="page-link"
              onClick={() => handlePageClick(totalPages - 1)}
            >
              {totalPages}
            </button>
          </li>
        )}
        <li
          className={`page-item ${
            pageSettings.pageNo === totalPages - 1 ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() => handlePageClick(pageSettings.pageNo + 1)}
            disabled={pageSettings.pageNo === totalPages - 1}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  return (
    <div className="myaccount-content">
      <h3>Orders</h3>

      {/* Date Range Filter */}
      <div className="mb-4">
        <h5>Filter by Date Range</h5>
        <div className="form-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div>
          <button className="btn btn-primary mr-2" onClick={handleFilterSubmit}>
            Apply Filter
          </button>
          <button className="btn btn-secondary" onClick={handleResetFilter}>
            Reset
          </button>
        </div>
      </div>

      {/* Status Filter */}
      <div className="mb-4">
        <h5>Filter by Status</h5>
        <select
          className="form-control"
          value={selectedStatus || ""}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="PENDING">PENDING</option>
          <option value="CANCELLED">CANCELLED</option>
          <option value="PRE_ORDER">PRE_ORDER</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CONFIRMED">CONFIRMED</option>
          
        </select>
      </div>

      <div className="myaccount-table table-responsive text-center">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderDto.orderId}>
                  <td>{renderDateAndTime(order.orderDto.orderDate).formattedDate}</td>
                  <td>{renderDateAndTime(order.orderDto.orderDate).formattedTime}</td>
                  <td>{order.orderDto.status}</td>
                  <td>{order.orderDto.afterTotalAmount.toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-dark btn-round"
                      onClick={() => handleViewOrder(order.orderDto.orderId)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center">
        {renderPagination()}
      </div>
    </div>
  );
};

export default OrdersList;
