import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Banner from "@/components/Banner";
import agent from '@/api/agent';
import Loading from '@/components/Loading';

export const OrderDetail = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetail, setOrderDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await agent.Orders.getOrderById(Number(orderId));
        setOrderDetail(response);
      } catch (error) {
        setError("Failed to fetch order detail. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

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
        pageName={"Order Detail"}
        singleName={"Order Detail"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />

      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-40">
            <div className="col-12 mb-40">
              <div className="cart-table table-responsive">
                <table >
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
                    {listOrderDetail.map((orderItem: any) => {
                    const image = orderItem.product.image
                    .replace(/[\[\]]/g, "")
                    .split(",");
                    
                    return (
                      <tr key={orderItem.orderDetailId}>
                        <td className="pro-thumbnail">
                          <a href="#">
                            <img src={image[0]} alt="Product" />
                          </a>
                        </td>
                        <td className="pro-title">{orderItem.product.productName}</td>
                        <td className="pro-price">{orderItem.unitPrice.toLocaleString()}</td>
                        <td className="pro-quantity">{orderItem.quantity}</td>
                        <td className="pro-subtotal">{orderItem.totalPrice.toLocaleString()}</td>
                      </tr>
                    );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-lg-8 col-md-7 col-12 mb-40" >
                    
                    </div>
            <div className="col-lg-4 col-md-5 col-12 mb-40">
              <div className="cart-total fix">
                <h3>Cart Totals</h3>
                <table >
                  <tbody>
                    <tr className="cart-subtotal">
                      <th>Subtotal</th>
                      <td><span className="amount">{orderDto.totalAmount}</span></td>
                    </tr>
                    {voucherDto && (
                      <tr className="cart-subtotal">
                        <th>Voucher ({voucherDto.voucherCode})</th>
                        <td><span className="amount">-{voucherDto.discount.toLocaleString()}</span></td>
                      </tr>
                    )}
                    <tr className="order-total">
                      <th>Total</th>
                      <td>
                        <strong><span className="amount">{orderDto.afterTotalAmount.toLocaleString()}</span></strong>
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
    </>
  );
};

export default OrderDetail;
