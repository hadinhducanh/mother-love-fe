import React, { useState, useEffect } from "react";
import { useCart } from "@/context/cart/CartContext";
import { Link } from "react-router-dom";
import agent from "../api/agent"; // Ensure to import agent from your API module
import { VoucherObjbyID } from "@/model/Voucher";
import { useAuth } from "@/context/auth/AuthContext";
import Modal from "react-modal";

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
    calculateTotal
  } = useCart();
  const { getUserInfo } = useAuth();
  const [vouchers, setVouchers] = useState<VoucherObjbyID[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
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

  const handleApplyCoupon = (e: any) => {
    if (selectedVoucher) {
      e.preventDefault();
      const subtotal = calculateSubtotal();
      if (subtotal >= selectedVoucher.voucher.minOrderAmount) {
        console.log("Applied voucher:", selectedVoucher);
        setDiscountApplied(true);
      } else {
        console.log("Order subtotal is less than minimum order amount for this voucher.");
      }
    }
  };

  const handleVoucherChange = (voucherCode: any) => {
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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      padding: '20px',
      borderRadius: '8px',
      overflowY: 'auto', // Add scroll bar when content exceeds modal height
      maxHeight: '60vh', // Limit maximum height of modal to avoid it being too tall on screen
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    voucherImage: {
      position: 'relative',
      textAlign: 'center',
      marginBottom: '10px'
    },
    voucherCode: {
      position: 'absolute',
      bottom: '0px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      color: '#000',
      padding: '3px 10px',
      borderRadius: '5px 5px 0 0',
      fontSize: '12px'
    }
  };

  useEffect(() => {
    // Reset voucher selection when cartItems change
    setDiscountApplied(false);
    setSelectedVoucher(null);
  }, [cartItems]);

  return (
    <>
      {/* <Banner
        pageName={"Cart"}
        singleName={"Cart"}
        pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
      /> */}
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
                  <div className="cart-coupon">
                    <button type="button" onClick={() => setIsModalOpen(true)}>
                      Select a voucher
                    </button>
                    {selectedVoucher && (
                      <div className="selected-voucher-details">
                        {selectedVoucher.voucher.voucherName} - Discount: {selectedVoucher.voucher.discount.toLocaleString()}
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

        {/* Modal for selecting voucher */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Select Voucher"
          style={customStyles}
        >
          <h2 style={{ marginBottom: '10px', textAlign: 'center' }}>Select a Voucher</h2>
          {vouchers.map((voucher) => (
            <div className="row mb-4" key={voucher.customerVoucherId}>
              <div className="col-md-4">
                <div className="voucher-item" style={customStyles.voucherImage}>
                  <div className="voucher-middle">
                    <img
                      src="./src/assets/images/voucher/voucher.png"
                      alt={voucher.voucher.voucherName}
                      className="img-fluid"
                     
                    />
                    <p className="voucher-code" style={customStyles.voucherCode}>{voucher.voucher.voucherCode}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="voucher-item">
                  <div className="voucher-details">
                    <p style={{fontWeight:'bold',fontSize:'18px'}}>{voucher.voucher.voucherName}</p>
                    <p>Min Order: {voucher.voucher.minOrderAmount}</p>
                    <p>Quantity Available: {voucher.quantityAvailable}</p>
              
                  </div>
                </div>
              </div>
              <div className="col-md-">
              <button
                      className="btn btn-primary"
                      onClick={() => handleVoucherChange(voucher.voucher.voucherCode)}
                     
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
