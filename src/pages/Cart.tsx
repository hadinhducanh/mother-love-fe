import React, { useState, useEffect, useMemo } from "react";
import { useCart } from "@/context/cart/CartContext";
import { Link } from "react-router-dom";
import agent from "../api/agent"; // Ensure to import agent from your API module
import { VoucherObjbyID } from "@/model/Voucher";
import { useAuth } from "@/context/auth/AuthContext";
import Modal, { Styles } from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Cart = () => {
  const {
    cartItems,
    removeItem,
    updateQuantity,
    selectedVoucher,
    setSelectedVoucher,
    discountApplied,
    setDiscountApplied,
    calculateSubtotal,
    calculateTotal,
  } = useCart();
  const { getUserInfo, isLoggedIn } = useAuth();
  const [vouchers, setVouchers] = useState<VoucherObjbyID[]>([]);
  const [, setUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetchMemberVouchers = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId);
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

  const handleApplyCoupon = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (selectedVoucher) {
      e.preventDefault();
      const subtotal = calculateSubtotal();
      if (subtotal >= (selectedVoucher.voucher.minOrderAmount ?? 0)) {
        setDiscountApplied(true);
        toast.success("Voucher applied successfully!");
      } else {
       
        toast.error("Order subtotal is less than the minimum order amount for this voucher.");
      }
    }
  };;

  const handleVoucherChange = (voucherCode: string) => {
    const selected = vouchers.find(
      (voucher) => voucher.voucher.voucherCode === voucherCode
    );
    setSelectedVoucher(selected || null);
    setDiscountApplied(false);
    setIsModalOpen(false);
  };

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
    // Reset voucher when quantity changes
    setDiscountApplied(false);
    setSelectedVoucher(null);
  };

  const customStyles: Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "600px",
      padding: "20px",
      borderRadius: "8px",
      overflowY: "auto", // Add scroll bar when content exceeds modal height
      maxHeight: "60vh", // Limit maximum height of modal to avoid it being too tall on screen
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  useEffect(() => {
    // Reset voucher selection when cartItems change
    setDiscountApplied(false);
    setSelectedVoucher(null);
  }, [cartItems]);

  const subtotal = useMemo(() => calculateSubtotal(), [cartItems]);
  const total = useMemo(() => calculateTotal(), [subtotal, discountApplied]);

  return (
    <>
      {/* <Banner
        pageName={"Cart"}
        singleName={"Cart"}
        pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
      /> */}
      <div>
        {/* Cart Section Start */}
        <ToastContainer position="bottom-left" />
        <div
          className="page-section section section-padding pt-30"
          style={{ backgroundColor: "#f5f7fd" }}
        >
          <div className="container">
            <h1 className="mb-3 font-semibold text-center">YOUR CART</h1>

            <form action="#">
              <div className="row mbn-40 bg-white pt-4 rounded-xl">
                <div className="col-12 mb-40">
                  <div className="cart-table table-responsive rounded">
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
                                <a href={`single-product/${item.productId}`}>{item.productName}</a>
                            
                              </td>
                              <td className="pro-price">
                                <span className="amount">
                                  {item.price.toLocaleString()}
                                </span>
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
                  <div className="cart-coupon">
                    <button type="button" onClick={() => setIsModalOpen(true)}>
                      Select a voucher
                    </button>
                    {selectedVoucher && (
                      <div className="selected-voucher-details">
                        {selectedVoucher.voucher.voucherName} - Discount:{" "}
                        {selectedVoucher.voucher.discount.toLocaleString()}
                      </div>
                    )}
                    <div className="cart-buttons mb-30">
                      <a href="#" onClick={handleApplyCoupon}>
                        Apply Coupon
                      </a>
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
                              {subtotal.toLocaleString()}
                            </span>
                          </td>
                        </tr>
                        {discountApplied && selectedVoucher && (
                          <tr className="voucher-discount">
                            <th>Discount</th>
                            <td>
                              <span className="amount">
                                -
                                {selectedVoucher.voucher.discount.toLocaleString()}
                              </span>
                            </td>
                          </tr>
                        )}
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="amount">
                                {total.toLocaleString()}
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="proceed-to-checkout section mt-30">
                      {isLoggedIn ? (
                        <Link to="/checkout">Proceed to checkout</Link>
                      ) : (
                        <Link to="/login-register">
                          Log In or Register to Checkout
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Cart Section End */}

        {/* Modal for selecting voucher */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Select Voucher"
          style={customStyles}
        >
          <h2 style={{ marginBottom: "10px", textAlign: "center" }}>
            Select a Voucher
          </h2>
          {vouchers.map((voucher) => (
            <div className="row mb-4" key={voucher.customerVoucherId}>
              <div className="col-md-4">
                <div
                  className="voucher-item"
                  style={{ textAlign: "center", marginBottom: "10px" }}
                >
                  <div className="voucher-middle">
                    <img
                      src="./src/assets/images/voucher/voucher.png"
                      alt={voucher.voucher.voucherName}
                      className="img-fluid"
                    />
                    <p
                      style={{
                        position: "absolute",
                        bottom: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        color: "#000",
                        padding: "3px 10px",
                        borderRadius: "5px 5px 0 0",
                        fontSize: "12px",
                      }}
                    >
                      {voucher.voucher.voucherCode}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="voucher-item">
                  <div className="voucher-details">
                    <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {voucher.voucher.voucherName}
                    </p>
                    <p>Min Order: {voucher.voucher.minOrderAmount}</p>
                    <p>Quantity Available: {voucher.quantityAvailable}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    handleVoucherChange(voucher.voucher.voucherCode)
                  }
                >
                  Select
                </button>
              </div>
            </div>
          ))}
        </Modal>
      </div>
    </>
  );
};

export default Cart;
