import  { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import agent from "@/api/agent";
import { VoucherObjbyID } from "@/model/Voucher";
import { useAuth } from "@/context/auth/AuthContext";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState<VoucherObjbyID[]>([]);
  const { getUserInfo } = useAuth(); // Sử dụng hook từ context để lấy thông tin người dùng

  useEffect(() => {
    const fetchMemberVouchers = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          const data = await agent.Voucher.getMemberVouchers(userInfo.userId);
          if (data && Array.isArray(data.content)) {
            setVouchers(data.content);
          } else {
            console.error("API did not return an array:", data);
          }
        } else {
          throw new Error("User info not available");
        }
      } catch (error) {
        console.error("Failed to fetch member vouchers:", error);
      }
    };

    fetchMemberVouchers();
  }, [getUserInfo]);

  return (
    <>
      <Banner
        pageName={"Voucher"}
        singleName={"Voucher"}
        pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row">
            {vouchers.map((voucher) => (
              <div className="col-lg-4 col-md-6 mb-4" key={voucher.customerVoucherId}>
                <div className="voucher-item">
                  <div className="voucher-content">
                    <div className="voucher-middle">
                      <img
                        src="./src/assets/images/voucher/voucher.png"
                        alt={voucher.voucher.voucherName}
                        className="img-fluid"
                      />
                      <p className="voucher-code">{voucher.voucher.voucherCode}</p>
                    </div>
                    <div className="voucher-details">
                      <h4>{voucher.voucher.voucherName}</h4>
                      <p>Min Order: {voucher.voucher.minOrderAmount}</p>
                      <p>Quantity Available: {voucher.quantityAvailable}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style >{`
        .voucher-item {
          border: 1px solid #ddd;
          padding: 20px;
          border-radius: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }

        .voucher-content {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .voucher-middle {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .voucher-middle img {
          max-width: 100px;
          height: auto;
          border-radius: 5px;
          margin-bottom: 10px;
        }

        .voucher-code {
          position: absolute;
          bottom: 5px; 
          left: 50%;
          transform: translateX(-50%);
          background-color: rgba(255, 255, 255, 0.9); 
          padding: 5px 10px;
          border-radius: 5px;
          font-size: 12px;
        }

        .voucher-details {
          flex: 1;
          padding-left: 20px;
        }

        .voucher-details h4 {
          margin-top: 0;
          margin-bottom: 10px;
          font-weight: bold;
        }

        .voucher-details p {
          margin: 5px 0;
        }
      `}</style>
    </>
  );
};

export default VoucherList;
