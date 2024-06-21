import React, { useEffect, useState } from "react";
import Banner from "@/components/Banner";
import agent from "@/api/agent";

import { VoucherObjbyID } from "@/model/Voucher";
import { useAuth } from "@/context/auth/AuthContext";

const VoucherList = () => {
  const [vouchers, setVouchers] = useState<VoucherObjbyID[]>([]);
  const { getUserInfo } = useAuth(); // Sử dụng hook từ context để lấy thông tin người dùng
  const [userId, setUserId] = useState<number | null>(null); // State để lưu userId

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
          <form action="#">
            <div className="row">
              <div className="col-12">
                <div className="cart-table table-responsive">
                  <table>
                    <thead>
                      <tr>
                        <th className="pro-thumbnail">Voucher code</th>
                        <th className="pro-title">Voucher name</th>
                        <th className="pro-price">Discount</th>
                        <th className="pro-price">Min Order Discount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vouchers.map((voucher) => (
                        <tr key={voucher.customerVoucherId}>
                          <td className="pro-title">{voucher.voucher.voucherCode}</td>
                          <td className="pro-title">{voucher.voucher.voucherName}</td>
                          <td className="pro-price">${voucher.voucher.discount}</td>
                          <td className="pro-price">${voucher.voucher.minOrderAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default VoucherList;
