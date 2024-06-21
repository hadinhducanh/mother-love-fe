

export const CheckoutTotalCart = () => {
  return (
    <>
      <div>
        <div>
          {/* Checkout Section Start */}
          <div className="page-section section section-padding">
            <div className="container">
              {/* Checkout Form s*/}
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
