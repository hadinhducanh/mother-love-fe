import React, { useState } from "react";
import { useCart } from "@/context/cart/CartContext";
import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";

interface Props {
  selectedAddressId: string | null;
}

const CheckoutTotalCart: React.FC<Props> = ({ selectedAddressId }) => {
  const { cartItems, calculateSubtotal, selectedVoucher } = useCart();
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderCartItems = () => {
    return cartItems.map((item) => (
      <li key={item.productId}>
        {item.productName} x {item.quantity} <span>{item.price.toLocaleString()}</span>
      </li>
    ));
  };

  const calculateTotal = () => {
    let total = calculateSubtotal();

    if (selectedVoucher) {
      total -= selectedVoucher.voucher.discount;
    }

    return Math.max(0, total);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const orderItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
  
      const addressId = selectedAddressId || "";
      const voucherId = selectedVoucher ? selectedVoucher.voucher.voucherId : 0;
  
      if (!userId) {
        throw new Error("User is not logged in");
      }
  

      const orderData = await agent.Orders.createOrder(userId, addressId, voucherId, orderItems);

  
  
      const vnPayResponse = await agent.Payment.vnPay(orderData.orderDto.orderId);
  

      window.location.href = vnPayResponse.paymentUrl;
  
    } catch (error) {
      console.error("Failed to create order or VNPay:", error);
      setError("Failed to place order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <div>
        {/* Checkout Section Start */}
        <div className="page-section section section-padding">
          <div className="container">
            {/* Checkout Form */}
            <form action="#" className="checkout-form">
              <div className="row row-50 mbn-40">
                <div className="col-lg-5">
                  <div className="row">
                    {/* Cart Total */}
                    <div className="col-12 mb-40">
                      <h4 className="checkout-title">Cart Total</h4>
                      <div className="checkout-cart-total">
                        <h4>
                          Product <span>Total</span>
                        </h4>
                        <ul>{renderCartItems()}</ul>
                        <p>
                          Sub Total <span>{calculateSubtotal().toLocaleString()}</span>
                        </p>
                        {selectedVoucher && (
                          <p>
                            Discount ({selectedVoucher.voucher.voucherName}){" "}
                            <span>-{selectedVoucher.voucher.discount.toLocaleString()}</span>
                          </p>
                        )}
                        <h4>
                          Grand Total <span>{calculateTotal().toLocaleString()}</span>
                        </h4>
                      </div>
                      <button className="place-order" onClick={handlePlaceOrder} disabled={loading}>
                        {loading ? "Placing Order..." : "Place order"}
                      </button>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutTotalCart;
