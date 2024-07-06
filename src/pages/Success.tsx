import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import { useNavigate } from "react-router";
export const Success = () => {
  const navigate = useNavigate(); // Khởi tạo useRouter

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
    navigate("/my-order")
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
        </div>
      </div>
      <Brand />
    </>
  );
};
