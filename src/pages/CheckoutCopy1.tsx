import Banner from "../components/Banner";
import { Brand } from "../components/Brand";

export const Checkout2 = () => {
  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"Checkout"}
            singleName={"Checkout"}
            pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
          />
          {/* Checkout Section Start */}
          <div className="page-section section section-padding">
            <div className="container">
              {/* Checkout Form s*/}
              <form action="#" className="checkout-form">
                <div className="row row-50 mbn-40">
                  <div className="col-lg-7">
                    {/* Billing Address */}
                    <div id="billing-form" className="mb-20">
                      <h4 className="checkout-title">Billing Address</h4>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-5">
                          <label>First Name*</label>
                          <input type="text" placeholder="First Name" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Last Name*</label>
                          <input type="text" placeholder="Last Name" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Email Address*</label>
                          <input type="email" placeholder="Email Address" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Phone no*</label>
                          <input type="text" placeholder="Phone number" />
                        </div>
                        <div className="col-12 mb-5">
                          <label>Company Name</label>
                          <input type="text" placeholder="Company Name" />
                        </div>
                        <div className="col-12 mb-5">
                          <label>Address*</label>
                          <input type="text" placeholder="Address line 1" />
                          <input type="text" placeholder="Address line 2" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Country*</label>
                          <select className="nice-select">
                            <option>Bangladesh</option>
                            <option>China</option>
                            <option>country</option>
                            <option>India</option>
                            <option>Japan</option>
                          </select>
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Town/City*</label>
                          <input type="text" placeholder="Town/City" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>State*</label>
                          <input type="text" placeholder="State" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Zip Code*</label>
                          <input type="text" placeholder="Zip Code" />
                        </div>
                        <div className="col-12 mb-5">
                          <div className="check-box mb-15">
                            <input type="checkbox" id="create_account" />
                            <label htmlFor="create_account">
                              Create an Acount?
                            </label>
                          </div>
                          <div className="check-box mb-15">
                            <input
                              type="checkbox"
                              id="shiping_address"
                              data-shipping
                            />
                            <label htmlFor="shiping_address">
                              Ship to Different Address
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Shipping Address */}
                    <div id="shipping-form" className="mb-20">
                      <h4 className="checkout-title">Shipping Address</h4>
                      <div className="row">
                        <div className="col-md-6 col-12 mb-5">
                          <label>First Name*</label>
                          <input type="text" placeholder="First Name" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Last Name*</label>
                          <input type="text" placeholder="Last Name" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Email Address*</label>
                          <input type="email" placeholder="Email Address" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Phone no*</label>
                          <input type="text" placeholder="Phone number" />
                        </div>
                        <div className="col-12 mb-5">
                          <label>Company Name</label>
                          <input type="text" placeholder="Company Name" />
                        </div>
                        <div className="col-12 mb-5">
                          <label>Address*</label>
                          <input type="text" placeholder="Address line 1" />
                          <input type="text" placeholder="Address line 2" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Country*</label>
                          <select className="nice-select">
                            <option>Bangladesh</option>
                            <option>China</option>
                            <option>country</option>
                            <option>India</option>
                            <option>Japan</option>
                          </select>
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Town/City*</label>
                          <input type="text" placeholder="Town/City" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>State*</label>
                          <input type="text" placeholder="State" />
                        </div>
                        <div className="col-md-6 col-12 mb-5">
                          <label>Zip Code*</label>
                          <input type="text" placeholder="Zip Code" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="row">
                      {/* Cart Total */}
                      <div className="col-12 mb-40">
                        <h4 className="checkout-title">Cart Total</h4>
                        <div className="checkout-cart-total">
                          <h4>
                            Product <span>Total</span>
                          </h4>
                          <ul>
                            <li>
                              Samsome Notebook Pro 5 X 01 <span>$295.00</span>
                            </li>
                            <li>
                              Aquet Drone D 420 X 02 <span>$550.00</span>
                            </li>
                            <li>
                              Play Station X 22 X 01 <span>$295.00</span>
                            </li>
                            <li>
                              Roxxe Headphone Z 75 X 01 <span>$110.00</span>
                            </li>
                          </ul>
                          <p>
                            Sub Total <span>$1250.00</span>
                          </p>
                          <p>
                            Shipping Fee <span>$00.00</span>
                          </p>
                          <h4>
                            Grand Total <span>$1250.00</span>
                          </h4>
                        </div>
                      </div>
                      {/* Payment Method */}
                      <div className="col-12 mb-40">
                        <h4 className="checkout-title">Payment Method</h4>
                        <div className="checkout-payment-method">
                          <div className="single-method">
                            <input
                              type="radio"
                              id="payment_check"
                              name="payment-method"
                              defaultValue="check"
                            />
                            <label htmlFor="payment_check">Check Payment</label>
                            <p data-method="check">
                              Please send a Check to Store name with Store
                              Street, Store Town, Store State, Store Postcode,
                              Store Country.
                            </p>
                          </div>
                          <div className="single-method">
                            <input
                              type="radio"
                              id="payment_bank"
                              name="payment-method"
                              defaultValue="bank"
                            />
                            <label htmlFor="payment_bank">
                              Direct Bank Transfer
                            </label>
                            <p data-method="bank">
                              Please send a Check to Store name with Store
                              Street, Store Town, Store State, Store Postcode,
                              Store Country.
                            </p>
                          </div>
                          <div className="single-method">
                            <input
                              type="radio"
                              id="payment_cash"
                              name="payment-method"
                              defaultValue="cash"
                            />
                            <label htmlFor="payment_cash">
                              Cash on Delivery
                            </label>
                            <p data-method="cash">
                              Please send a Check to Store name with Store
                              Street, Store Town, Store State, Store Postcode,
                              Store Country.
                            </p>
                          </div>
                          <div className="single-method">
                            <input
                              type="radio"
                              id="payment_paypal"
                              name="payment-method"
                              defaultValue="paypal"
                            />
                            <label htmlFor="payment_paypal">Paypal</label>
                            <p data-method="paypal">
                              Please send a Check to Store name with Store
                              Street, Store Town, Store State, Store Postcode,
                              Store Country.
                            </p>
                          </div>
                          <div className="single-method">
                            <input
                              type="radio"
                              id="payment_payoneer"
                              name="payment-method"
                              defaultValue="payoneer"
                            />
                            <label htmlFor="payment_payoneer">Payoneer</label>
                            <p data-method="payoneer">
                              Please send a Check to Store name with Store
                              Street, Store Town, Store State, Store Postcode,
                              Store Country.
                            </p>
                          </div>
                          <div className="single-method">
                            <input type="checkbox" id="accept_terms" />
                            <label htmlFor="accept_terms">
                              I’ve read and accept the terms &amp; conditions
                            </label>
                          </div>
                        </div>
                        <button className="place-order">Place order</button>
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
      <Brand />
    </>
  );
};
