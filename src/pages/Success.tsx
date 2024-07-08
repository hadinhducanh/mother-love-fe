import React from "react";
import { Brand } from "../components/Brand";
import { useNavigate } from "react-router";


export const Success = () => {
  const navigate = useNavigate();

  const successMessageStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const successMessageHeaderStyle: React.CSSProperties = {
    color: "#4CAF50",
    fontSize: "24px",
    marginBottom: "10px"
  };

  const successMessageTextStyle: React.CSSProperties = {
    color: "#333",
    fontSize: "16px"
  };

  const linkStyle: React.CSSProperties = {
    color: "#4CAF50",
    textDecoration: "underline",
    cursor: "pointer"
  };

  const imageStyle: React.CSSProperties = {
    display: "block",
    margin: "20px auto 20px",  // 20px top margin, auto horizontal margin, 0 bottom margin
    width: "200px",
  };
  
  const handleNavigation = () => {
    navigate("/my-order");
  };

  return (
    <>
      <div>
      
        <div style={successMessageStyle}>
          <img 
            src="https://baohaauto.vn/wp-content/uploads/cam-on-ban-da-dang-ky-form-4.png" 
            alt="Thank you"
            style={imageStyle} 
          />
          <h2 style={successMessageHeaderStyle}>Thanh toán thành công!</h2>
          <p style={successMessageTextStyle}>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
          <p style={successMessageTextStyle}>
            Bạn có thể kiểm tra đơn hàng của bạn{" "}
            <span style={linkStyle} onClick={handleNavigation}>tại đây</span>
          </p>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default Success;
