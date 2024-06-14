// src/pages/Cart.tsx
import React from 'react';
import Banner from '../components/Banner';
import { useCart } from '../cart/CartContext';

const Cart = () => {
  const { cartItems, removeItem, updateQuantity } = useCart();

  const handleRemoveItem = (productId: number) => {
    removeItem(productId);
  };

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
                              <span className="amount">${item.price}</span>
                            </td>
                            <td className="pro-quantity">
                              <div className="pro-qty">
                                <input
                                  type="number"
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                                />
                              </div>
                            </td>
                            <td className="pro-subtotal">${item.price * item.quantity}</td>
                            <td className="pro-remove">
                              <a onClick={() => handleRemoveItem(item.productId)}>×</a>
                            </td>
                          </tr>
                          )
                        } 
                          
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-8 col-md-7 col-12 mb-40">
                  <div className="cart-buttons mb-30">
                    <a href="#">Continue Shopping</a>
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
                            <span className="amount">${calculateTotal()}</span>
                          </td>
                        </tr>
                        <tr className="order-total">
                          <th>Total</th>
                          <td>
                            <strong>
                              <span className="amount">${calculateTotal()}</span>
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
