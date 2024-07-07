import React from "react";

import { Brand } from "../components/Brand";
import { useNavigate } from "react-router";


export const Fail = () => {
  const navigate = useNavigate();

  const errorMessageStyle: React.CSSProperties = {
    textAlign: "center",
  };

  const errorMessageHeaderStyle: React.CSSProperties = {
    color: "#FF5733", // Red color for error
    fontSize: "24px",
    marginBottom: "10px"
  };

  const errorMessageTextStyle: React.CSSProperties = {
    color: "#333",
    fontSize: "16px"
  };

  const linkStyle: React.CSSProperties = {
    color: "#FF5733", // Red color for error
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
      <img 
            src="https://e7.pngegg.com/pngimages/30/352/png-clipart-computer-icons-check-mark-x-mark-symbol-miscellaneous-cross-thumbnail.png" 
            alt="Thank you"
            style={imageStyle} 
          />
    
        <div style={errorMessageStyle}>
          <h2 style={errorMessageHeaderStyle}>Thanh toán thất bại!</h2>
          <p style={errorMessageTextStyle}>Rất tiếc, thanh toán của bạn không thành công.</p>
          <p style={errorMessageTextStyle}>
          Bạn có thể kiểm tra đơn hàng của bạn{" "}
            <span style={linkStyle} onClick={handleNavigation}>tại đây</span>
          </p>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default Fail;
