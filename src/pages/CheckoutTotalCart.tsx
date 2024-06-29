import React from "react";
import { useCart } from "@/context/cart/CartContext";

const CheckoutTotalCart = () => {
  const { cartItems, calculateSubtotal, selectedVoucher } = useCart();

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

  return (
    <>
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
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Checkout Section End */}
        </div>
      </div>
    </>
  );
};

export default CheckoutTotalCart;
