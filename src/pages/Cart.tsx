import Banner from "../components/Banner";
import { Brand } from "../components/Brand";
import Footer from "../components/Footer";
import Header from "../components/Header";

export const Cart = () => {
  return (
    <>
      <Header />
      <Banner pageName={"Cart"} singleName={"Cart"} pictureUrl={"./src/assets/images/hero/hero-1.jpg"} />
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
                          <tr>
                            <td className="pro-thumbnail">
                              <a href="#">
                                <img src="./src/assets/images/product/product-1.jpg" />
                              </a>
                            </td>
                            <td className="pro-title">
                              <a href="#">Tamra Baby Dress</a>
                            </td>
                            <td className="pro-price">
                              <span className="amount">$25</span>
                            </td>
                            <td className="pro-quantity">
                              <div className="pro-qty">
                                <input type="text" defaultValue={1} />
                              </div>
                            </td>
                            <td className="pro-subtotal">$25</td>
                            <td className="pro-remove">
                              <a href="#">×</a>
                            </td>
                          </tr>
                          <tr>
                            <td className="pro-thumbnail">
                              <a href="#">
                                <img src="./src/assets/images/product/product-2.jpg" />
                              </a>
                            </td>
                            <td className="pro-title">
                              <a href="#">Jumpsuit Outfits</a>
                            </td>
                            <td className="pro-price">
                              <span className="amount">$09</span>
                            </td>
                            <td className="pro-quantity">
                              <div className="pro-qty">
                                <input type="text" defaultValue={1} />
                              </div>
                            </td>
                            <td className="pro-subtotal">$09</td>
                            <td className="pro-remove">
                              <a href="#">×</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-7 col-12 mb-40">
                    <div className="cart-buttons mb-30">
                      <input type="submit" defaultValue="Update Cart" />
                      <a href="#">Continue Shopping</a>
                    </div>
                    <div className="cart-coupon">
                      <h4>Coupon</h4>
                      <p>Enter your coupon code if you have one.</p>
                      <div className="cuppon-form">
                        <input type="text" placeholder="Coupon code" />
                        <input type="submit" defaultValue="Apply Coupon" />
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
                              <span className="amount">$306.00</span>
                            </td>
                          </tr>
                          <tr className="order-total">
                            <th>Total</th>
                            <td>
                              <strong>
                                <span className="amount">$306.00</span>
                              </strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="proceed-to-checkout section mt-30">
                        <a href="#">Proceed to Checkout</a>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* Cart Section End */}
        </div>
      <Brand />
      <Footer />
    </>
  );
};
