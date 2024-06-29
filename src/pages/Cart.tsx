import React, { useState, useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import agent from "../api/agent"; // Đảm bảo import agent từ module API của bạn
import { VoucherObjbyID } from "@/model/Voucher";
import { useAuth } from "@/context/auth/AuthContext";

const Cart = () => {
  const { cartItems, removeItem, updateQuantity, selectedVoucher, setSelectedVoucher, discountApplied, setDiscountApplied, calculateSubtotal, calculateTotal } = useCart();
  const { getUserInfo } = useAuth(); // Sử dụng hook từ context để lấy thông tin người dùng
  const [vouchers, setVouchers] = useState<VoucherObjbyID[]>([]); // State để lưu danh sách các voucher từ server
  const [userId, setUserId] = useState<number | null>(null); // State để lưu userId

  useEffect(() => {
    const fetchMemberVouchers = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId); // Lưu userId vào state
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

  const handleApplyCoupon = (e) => {
    // Xử lý khi người dùng áp dụng voucher
    if (selectedVoucher) {
      e.preventDefault();
      const subtotal = calculateSubtotal();
      if (subtotal >= selectedVoucher.voucher.minOrderAmount) {
        console.log("Applied voucher:", selectedVoucher);
        setDiscountApplied(true); // Đánh dấu là đã áp dụng voucher
      } else {
        console.log("Order subtotal is less than minimum order amount for this voucher.");
        // Hiển thị thông báo cho người dùng rằng không thể áp dụng voucher do không đạt điều kiện
      }
    }
  };

  const handleVoucherChange = (e) => {
    // Tìm voucher được chọn từ danh sách vouchers
    const selected = vouchers.find(
      (voucher) => voucher.voucher.voucherCode === e.target.value
    );
    setSelectedVoucher(selected || null);
    setDiscountApplied(false); // Reset lại trạng thái khi thay đổi voucher
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  return (
    <>
      <Banner
        pageName={"Cart"}
        singleName={"Cart"}
        pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
      />
      <div>
        {/* Cart Section Start */}
        <div className="page-section section section-padding">
          <div className="container">
            <form action="#">
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
                          <th className="pro-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => {
                          const image = item.image
                            .replace(/[\[\]]/g, "")
                            .split(",");
                          return (
                            <tr key={item.productId}>
                              <td className="pro-thumbnail">
                                <a href="#">
                                  <img src={image[0]} alt={item.productName} />
                                </a>
                              </td>
                              <td className="pro-title">
                                <a href="#">{item.productName}</a>
                              </td>
                              <td className="pro-price">
                                <span className="amount">{item.price.toLocaleString()}</span>
                              </td>
                              <td className="pro-quantity">
                                <div className="pro-qty">
                                  <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        item.productId,
                                        parseInt(e.target.value)
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td className="pro-subtotal">
                                {(item.price * item.quantity).toLocaleString()}
                              </td>
                              <td className="pro-remove">
                                <a
                                  onClick={() =>
                                    handleRemoveItem(item.productId)
                                  }
                                >
                                  ×
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-8 col-md-7 col-12 mb-40">
                  <div className="cart-buttons mb-30">
                    <Link to="/shop">Continue Shopping</Link>
                  </div>
                  <div>
                    <div className="cart-coupon">
                      <select onChange={handleVoucherChange}>
                        <option value="">Select a voucher</option>
                        {vouchers.map((voucher) => (
                          <option
                            key={voucher.customerVoucherId}
                            value={voucher.voucher.voucherCode}
                          >
                            {voucher.voucher.voucherName}
                          </option>
                        ))}
                      </select>
                      <div className="cart-buttons mb-30">
                        <a href="#" onClick={handleApplyCoupon}>
                          Apply Coupon
                        </a>
                      </div>
                    </div>
                  </div>
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
                              {calculateSubtotal().toLocaleString()}
                            </span>
                          </td>
                        </tr>
                        {discountApplied && selectedVoucher && (
                          <tr className="voucher-discount">
                            <th>Discount</th>
                            <td>
                              <span className="amount">
                                -{selectedVoucher.voucher.discount.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        )}
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="amount">
                                {calculateTotal().toLocaleString()}
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="proceed-to-checkout section mt-30">
                      <Link to="/checkout">Proceed to checkout</Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Cart Section End */}
      </div>
    </>
  );
};

export default Cart;
