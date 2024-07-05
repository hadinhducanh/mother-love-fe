import  { useEffect, useState } from 'react';
import agent from '../../api/agent';
import { OrderResponse } from '@/model/Order';
import { useAuth } from '@/context/auth/AuthContext';
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';

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
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [filterApplied, setFilterApplied] = useState<boolean>(false);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);

    try {
      if (userId != null) {
        if (filterApplied) {
          const sortDirection = 'asc'; 
          const response = await agent.Orders.getOrdersByDateRange(
            pageSettings.pageNo,
            pageSettings.pageSize,
            'orderId', 
            sortDirection,
            startDate ? `${startDate}T00:00:00` : '',
            endDate ? `${endDate}T23:59:59` : ''
          );

          if (response && Array.isArray(response.content)) {
            setOrders(response.content);
            setTotalPages(response.totalPages);
          } else {
            throw new Error("Fetched data is not in expected format");
          }
        } else {
          const response = await agent.Orders.getOrdersByUserId(userId, pageSettings.pageNo, pageSettings.pageSize);

          if (response && Array.isArray(response.content)) {
            setOrders(response.content);
            setTotalPages(response.totalPages);
          } else {
            throw new Error("Fetched data is not in expected format");
          }
        }
      }
    } catch (error : any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId != null) {
      fetchOrders();
    }
  }, [userId, pageSettings.pageNo, filterApplied, startDate, endDate]);

  const handlePageClick = (pageNumber: number) => {
    setPageSettings(prev => ({
      ...prev,
      pageNo: pageNumber - 1,
    }));
  };

  const handleViewOrder = (orderId: number) => {
    navigate(`/orders/${orderId}`); 
  };

  const handleFilterSubmit = () => {
    setFilterApplied(true);
    setPageSettings(prev => ({
      ...prev,
      pageNo: 0, 
    }));
  };

  const handleResetFilter = () => {
    setStartDate('');
    setEndDate('');
    setFilterApplied(false);
    setPageSettings(prev => ({
      ...prev,
      pageNo: 0, 
    }));
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <button
            className="btn btn-primary mr-2"
            onClick={handleFilterSubmit}
          >
            Apply Filter
          </button>
          <button
            className="btn btn-secondary"
            onClick={handleResetFilter}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="myaccount-table table-responsive text-center">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.orderDto.orderId}>
                  <td>{new Date(order.orderDto.orderDate).toLocaleDateString()}</td>
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
                <td colSpan={4}>No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${pageSettings.pageNo === 0 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(pageSettings.pageNo)}
              disabled={pageSettings.pageNo === 0}
            >
              Previous
            </button>
          </li>
          {Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <li
              key={pageNumber}
              className={`page-item ${pageNumber === pageSettings.pageNo ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageClick(pageNumber + 1)}
              >
                {pageNumber + 1}
              </button>
            </li>
          ))}
          <li className={`page-item ${pageSettings.pageNo === totalPages - 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageClick(pageSettings.pageNo + 1)}
              disabled={pageSettings.pageNo === totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
