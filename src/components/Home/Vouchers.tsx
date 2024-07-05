import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { toast } from "react-toastify"; // Import thư viện toast
import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";
import { VoucherObj } from "@/model/Voucher";

const Vouchers: React.FC = () => {
  const [vouchers, setVouchers] = useState<VoucherObj[]>([]);
  const { getUserInfo } = useAuth(); // Sử dụng hook từ context để lấy thông tin người dùng
  const [userId, setUserId] = useState<number | null>(null); // State để lưu userId

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const data = await agent.Voucher.list(0, 10); // Điều chỉnh tham số pageNo và pageSize theo nhu cầu của bạn
        if (data && Array.isArray(data.content)) {
          setVouchers(data.content);
        } else {
          console.error("API did not return an array:", data);
        }
      } catch (error: any) {
        console.error("Failed to fetch vouchers:", error);
      }
    };

    fetchVouchers();

    // Lấy thông tin người dùng khi component mount
    const getUser = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserId(userInfo.userId); // Lưu userId vào state
      }
    };

    getUser();
  }, [getUserInfo]);

  const settings = {
    arrows: false,
    dots: false,
    autoplay: true,
    infinite: true,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleSaveVoucher = async (voucherId: number) => {
    try {
      if (userId) {
        await agent.Voucher.addVoucherForMember(userId, voucherId);
        toast.success("Voucher saved successfully!");
      } else {
        throw new Error("User ID not found");
      }
    } catch (error: any) {
      console.error("Failed to save voucher:", error);
      toast.error("You already saved this voucher!");
    }
  };

  return (
    <>
      {/* Testimonial Section Start */}
      <div className="testimonial-section section section-padding pt-0">
        <div className="container">
          <div className="row">
            <div className="section-title text-center col mb-30">
              <h1>CLIENTS REVIEW</h1>
              <p>Clients say about us</p>
            </div>
          </div>

          <Slider {...settings} className="testimonial-slider row">
            {vouchers.map((voucher) => (
              <div className="col" key={voucher.voucherId}>
                <div className="voucher-item">
                  <div className="voucher-content">
                    <div className="voucher-middle">
                      <img src="./src/assets/images/voucher/voucher.png" alt={voucher.voucherName} />
                      <p className="voucher-code">{voucher.voucherCode}</p>
                    </div>
                    <div className="voucher-left">
                      <h4>{voucher.voucherName}</h4>
                      <p>Min Order: {voucher.minOrderAmount}</p>
                      <p>Quantity: {voucher.quantity}</p>
                    </div>
                    <div className="voucher-right">
                      <button
                        className="save-voucher-btn"
                        onClick={() => handleSaveVoucher(voucher.voucherId)}
                      >
                        Save Voucher
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      {/* Testimonial Section End */}

      <style>{`
        .voucher-item {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin: 10px;
        }

        .voucher-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: center;
        }

        .voucher-middle {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0 20px;
        }

        .voucher-middle img {
          max-width: 100px;
          height: auto;
          border-radius: 5px;
        }

        .voucher-middle .voucher-code {
          margin-top: 10px;
        }

        .voucher-left {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start; /* Đổi từ center thành flex-start */
        }

        .voucher-left h4 {
          margin-top: 0;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .voucher-left p {
          margin: 5px 0;
        }

        .voucher-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .save-voucher-btn {
          background-color: #ff69b4; 
          color: white;
          border: none;
          padding: 10px 20px;
          cursor: pointer;
          border-radius: 5px;
          font-size: 14px;
          transition: background-color 0.3s ease;
        }
          

        .save-voucher-btn:hover {
          background-color: #ff1493; /* Màu hồng đậm hơn khi hover */
        }
      `}</style>
    </>
  );
};

export default Vouchers;
