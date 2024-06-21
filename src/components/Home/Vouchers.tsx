import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";
import { VoucherObj } from "@/model/Voucher";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";


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
      } catch (error) {
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
    slidesToShow: 3,
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
        console.log(`Saved voucher with ID: ${voucherId} for user ID: ${userId}`);
        // Thực hiện cập nhật lại danh sách voucher nếu cần
      } else {
        throw new Error("User ID not found");
      }
    } catch (error) {
      console.error("Failed to save voucher:", error);
      // Hiển thị thông báo lỗi cho người dùng
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
              <p>Clients says about us</p>
            </div>
          </div>

          <Slider {...settings} className="testimonial-slider row">
            {vouchers.map((voucher) => (
              <div className="col" key={voucher.voucherId}>
                <div className="testimonial-item">
                  <div className="testimonial-author">
                    <div className="content">
                      <h4>{voucher.voucherCode}</h4>
                      <p>{voucher.voucherName}</p>
                      <p>Quantity: {voucher.quantity}</p>
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

      <style jsx>{`
        .save-voucher-btn {
          background-color: #ff69b4; /* Màu hồng */
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
