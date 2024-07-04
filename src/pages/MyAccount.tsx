import AccountAddress from "@/components/AccountAddress/AccountAddress";
import Banner from "../components/Banner";
import { Brand } from "../components/Brand";

const MyAccount = () => {
  return (
    <>
      <Banner
        pageName={"My Account"}
        singleName={"My Account"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-30">
            {/* My Account Tab Menu Start */}
            <div className="col-lg-3 col-12 mb-30">
              <div className="myaccount-tab-menu nav" role="tablist">
                <a href="#orders" className="active" data-toggle="tab">
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </a>

                <a href="#address-edit" data-toggle="tab">
                  <i className="fa fa-map-marker"></i> Address
                </a>

                <a href="#account-info" data-toggle="tab">
                  <i className="fa fa-user"></i> Account Details
                </a>

                <a href="login-register.html">
                  <i className="fa fa-sign-out"></i> Logout
                </a>
              </div>
            </div>
            {/* My Account Tab Menu End */}

            {/* My Account Tab Content Start */}
            <div className="col-lg-9 col-12 mb-30">
              <div className="tab-content" id="myaccountContent">
                {/* Single Tab Content Start */}
                <div className="tab-pane fade" id="orders" role="tabpanel">
                  <div className="myaccount-content">
                    <h3>Orders</h3>

                    <div className="myaccount-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead className="thead-light">
                          <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Moisturizing Oil</td>
                            <td>Aug 22, 2018</td>
                            <td>Pending</td>
                            <td>$45</td>
                            <td>
                              <a
                                href="cart.html"
                                className="btn btn-dark btn-round"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Katopeno Altuni</td>
                            <td>July 22, 2018</td>
                            <td>Approved</td>
                            <td>$100</td>
                            <td>
                              <a
                                href="cart.html"
                                className="btn btn-dark btn-round"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td>3</td>
                            <td>Murikhete Paris</td>
                            <td>June 12, 2017</td>
                            <td>On Hold</td>
                            <td>$99</td>
                            <td>
                              <a
                                href="cart.html"
                                className="btn btn-dark btn-round"
                              >
                                View
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Single Tab Content End */}
                <AccountAddress />
                {/* Single Tab Content Start */}
                <div
                  className="tab-pane fade"
                  id="account-info"
                  role="tabpanel"
                >
                  <div className="myaccount-content">
                    <h3>Account Details</h3>

                    <div className="account-details-form">
                      <form action="#">
                        <div className="row">
                          <div className="col-lg-6 col-12 mb-30">
                            <input
                              id="first-name"
                              placeholder="First Name"
                              type="text"
                            />
                          </div>

                          <div className="col-lg-6 col-12 mb-30">
                            <input
                              id="last-name"
                              placeholder="Last Name"
                              type="text"
                            />
                          </div>

                          <div className="col-12 mb-30">
                            <input
                              id="display-name"
                              placeholder="Display Name"
                              type="text"
                            />
                          </div>

                          <div className="col-12 mb-30">
                            <input
                              id="email"
                              placeholder="Email Address"
                              type="email"
                            />
                          </div>

                          <div className="col-12 mb-30">
                            <h4>Password change</h4>
                          </div>

                          <div className="col-12 mb-30">
                            <input
                              id="current-pwd"
                              placeholder="Current Password"
                              type="password"
                            />
                          </div>

                          <div className="col-lg-6 col-12 mb-30">
                            <input
                              id="new-pwd"
                              placeholder="New Password"
                              type="password"
                            />
                          </div>

                          <div className="col-lg-6 col-12 mb-30">
                            <input
                              id="confirm-pwd"
                              placeholder="Confirm Password"
                              type="password"
                            />
                          </div>

                          <div className="col-12">
                            <button className="btn btn-dark btn-round btn-lg">
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                {/* Single Tab Content End */}
              </div>
            </div>
            {/* My Account Tab Content End */}
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};
export default MyAccount;
