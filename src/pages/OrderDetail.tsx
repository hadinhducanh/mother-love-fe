import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Banner from "@/components/Banner";
import agent from "@/api/agent";
import Loading from "@/components/Loading";
import FeedbackModal from "@/components/Feedback/FeedbackModal";

import { useAuth } from "@/context/auth/AuthContext";

import { OrderResponse, OrderDetail as OrderDetailType } from "@/model/Order";
import ViewFeedbackModal from "@/components/Feedback/ViewFeedbackModal";

export const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetail, setOrderDetail] = useState<OrderResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showViewFeedbackModal, setShowViewFeedbackModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // State để theo dõi feedback đã submit thành công
  const { userId } = useAuth();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await agent.Orders.getOrderById(Number(orderId));
        setOrderDetail(response);
      } catch (error: any) {
        setError("Failed to fetch order detail. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  useEffect(() => {
    if (feedbackSubmitted) {
      // Reload the page after feedback is successfully submitted
      window.location.reload();
    }
  }, [feedbackSubmitted]);

  const fetchFeedbacks = async () => {
    try {
      const response = await agent.Orders.getOrderFeedbacks(Number(orderId));
      setFeedbacks(response);
    } catch (error) {
      console.error("Failed to fetch feedbacks", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const vnPayResponse = await agent.Payment.vnPay(Number(orderId));
      window.location.href = vnPayResponse.paymentUrl;
    } catch (error: any) {
      setCheckoutError("Failed to initiate payment. Please try again later.");
    }
  };

  const handleFeedbackClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowFeedbackModal(true);
  };

  const handleViewFeedbackClick = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    await fetchFeedbacks();
    setShowViewFeedbackModal(true);
  };

  const handleFeedbackSubmit = async (
    feedbacks: {
      rating: number;
      comment: string;
      image: string;
      productId: number;
    }[]
  ) => {
    try {
      const transformedFeedbacks = feedbacks.map((feedback) => ({
        rating: feedback.rating,
        comment: feedback.comment,
        image: feedback.image,
        productId: feedback.productId,
      }));
      console.log("transformedFeedbacks", transformedFeedbacks);
      if (!userId) {
        throw new Error("User is not logged in");
      }

      await agent.Orders.addFeedback(
        userId,
        Number(orderId),
        transformedFeedbacks
      );

      setShowFeedbackModal(false);

      // Set feedback submitted state to true
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error("Failed to submit feedback", error);
    }
  };

  const handleCancelOrder = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    try {
      await agent.Orders.cancelOrder(Number(orderId), "string");
      alert('Order cancelled successfully');
      window.location.reload();
    } catch (error) {
      console.error("Failed to cancel order", error);
      alert('Failed to cancel order');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orderDetail) {
    return <div>No order detail found</div>;
  }

  const { orderDto, listOrderDetail, voucherDto } = orderDetail;

  return (
    <>
      <Banner
        pageName="Order Detail"
        singleName="Order Detail"
        pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
      />

      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-40">
            <div className="col-12 mb-40">
              <div className="cart-table table-responsive">
                <table>
                  <thead>
                    <tr>
                      <th className="pro-thumbnail">Image</th>
                      <th className="pro-title">Product</th>
                      <th className="pro-price">Price</th>
                      <th className="pro-quantity">Quantity</th>
                      <th className="pro-subtotal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listOrderDetail.map((orderItem: OrderDetailType) => {
                      const images = orderItem.product.image
                        .replace(/[\[\]]/g, "")
                        .split(",");
                      return (
                        <tr key={orderItem.orderDetailId}>
                          <td className="pro-thumbnail">
                            <a href="#">
                              <img src={images[0]} alt="Product" />
                            </a>
                          </td>
                          <td className="pro-title">
                            {orderItem.product.productName}
                          </td>
                          <td className="pro-price">
                            {orderItem.unitPrice.toLocaleString()}
                          </td>
                          <td className="pro-quantity">{orderItem.quantity}</td>
                          <td className="pro-subtotal">
                            {orderItem.totalPrice.toLocaleString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mb-40">
              {orderDto.status === "COMPLETED" && (
                <div className="cart-buttons mb-30">
                  {!orderDto.feedBack ? (
                    <a href="#" onClick={handleFeedbackClick}>
                      Feed Back
                    </a>
                  ) : (
                    <a href="#" onClick={handleViewFeedbackClick}>
                      View Feedback
                    </a>
                  )}
                </div>
              )}
              {orderDto.status === "PENDING" && (
                <div className="cart-buttons mb-30">
                  <a href="#" onClick={handleCheckout}>
                    Checkout
                  </a>
                  <a href="#" onClick={handleCancelOrder}>
                    Cancel
                  </a>
                  {checkoutError && <div>Error: {checkoutError}</div>}
                </div>
              )}
               {orderDto.status === "PRE_ORDER" && (
                <div className="cart-buttons mb-30">
                  <a href="#" onClick={handleCancelOrder}>
                    Cancel
                  </a>
                  {checkoutError && <div>Error: {checkoutError}</div>}
                </div>
              )}
            </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table>
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td>
                        <span className="amount">
                          {orderDto.totalAmount.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                    {voucherDto && (
                      <tr className="cart-subtotal">
                        <th>Voucher ({voucherDto.voucherCode})</th>
                        <td>
                          <span className="amount">
                            -{voucherDto.discount.toLocaleString()}
                          </span>
                        </td>
                      </tr>
                    )}
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong>
                          <span className="amount">
                            {orderDto.afterTotalAmount.toLocaleString()}
                          </span>
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="proceed-to-checkout section mt-30">
                  <Link to="/my-order">Back to Order</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFeedbackModal && (
        <FeedbackModal
          show={showFeedbackModal}
          onHide={() => setShowFeedbackModal(false)}
          orderItems={listOrderDetail}
          onSubmitFeedback={handleFeedbackSubmit}
        />
      )}

      {showViewFeedbackModal && (
        <ViewFeedbackModal
          show={showViewFeedbackModal}
          onHide={() => setShowViewFeedbackModal(false)}
          feedbacks={feedbacks}
        />
      )}

      {feedbackSubmitted && (
        <p style={{ color: "green" }}>Feedback successfully!</p>
      )}
    </>
  );
};

export default OrderDetail;
