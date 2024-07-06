import React, { useEffect } from "react";
import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import { useNavigate } from "react-router";
import agent from "@/api/agent";

export const Success = () => {
  const navigate = useNavigate();

  const orderId = localStorage.getItem("orderId");
  const totalAmount = localStorage.getItem("totalAmount");

  useEffect(() => {
    localStorage.removeItem("orderId");
    localStorage.removeItem("totalAmount");

    agent.Payment.postPaymentHistory({
      orderId: orderId,
      amount: totalAmount,
      createdDate: "2024-07-06T15:34:48.076Z",
      paymentMethodId: 0,
      status: 0,
    }).then(response => {
      console.log("Payment history successfully recorded", response);
    }).catch(error => {
      console.error("Failed to record payment history", error);
    });

  }, [orderId, totalAmount]);

  const successMessageStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const successMessageHeaderStyle = {
    color: "#4CAF50",
    fontSize: "24px",
    marginBottom: "10px"
  };

  const successMessageTextStyle = {
    color: "#333",
    fontSize: "16px"
  };

  const linkStyle = {
    color: "#4CAF50",
    textDecoration: "underline",
    cursor: "pointer"
  };

  const handleNavigation = () => {
    navigate("/my-order");
  };

  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"Checkout"}
            singleName={"Checkout"}
            pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
          />
        </div>
        <div style={successMessageStyle}>
          <h2 style={successMessageHeaderStyle}>Thanh toán thành công!</h2>
          <p style={successMessageTextStyle}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
          <p style={successMessageTextStyle}>
            Bạn có thể kiểm tra đơn hàng của bạn {" "}
            <span style={linkStyle} onClick={handleNavigation}>tại đây</span>
          </p>
          
          {/* Display orderId and totalAmount if available */}
          {orderId && (
            <p style={successMessageTextStyle}>
              Mã đơn hàng của bạn là: <strong>{orderId}</strong>
            </p>
          )}
          {totalAmount && (
            <p style={successMessageTextStyle}>
              Tổng số tiền thanh toán: <strong>{totalAmount}</strong>
            </p>
          )}
        </div>
      </div>
      <Brand />
    </>
  );
};

export default Success;
