import React, { useEffect } from "react";
import "./../assets/js/vendor/jquery-3.4.1.min.js";
import $ from 'jquery';
const Header = () => {
  useEffect(() => {
    const searchToggle = $(".search-toggle");
    const searchWrap = $(".header-search-wrap");

    searchToggle.on("click", function (this: HTMLElement) {
      if (!$(this).hasClass("active")) {
        $(this).addClass("active");
        searchWrap.addClass("active");
      } else {
        $(this).removeClass("active");
        searchWrap.removeClass("active");
      }
    });

    // Cleanup function to remove event listener when the component unmounts
    return () => {
      searchToggle.off("click");
    };
  }, []);
  return (
    <div className="header-section section">
      {/* Header Top Start */}
      <div className="header-top header-top-two bg-theme-one">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col mt-10 mb-10 d-none d-md-flex">
              {/* Header Top Left Start */}
              <div className="header-top-left header-top-left-two">
                <p>Welcome to Mother Love</p>
                <p>
                  Hotline: <a href="tel:0123456789">0123 456 789</a>
                </p>
              </div>
              {/* Header Top Left End */}
            </div>

            <div className="col mt-10 mb-10">
              {/* Header Language Currency Start */}
              <ul className="header-lan-curr header-lan-curr-two">
                <li>
                  <a href="#">eng</a>
                  <ul>
                    <li>
                      <a href="#">english</a>
                    </li>
                    <li>
                      <a href="#">vietnamese</a>
                    </li>
                    
                  </ul>
                </li>

              </ul>
              {/* Header Language Currency End */}
            </div>

            <div className="col mt-10 mb-10">
              {/* Header Shop Links Start */}
              <div className="header-top-right header-top-right-two">
                <p>
                  <a href="/my-account">My Account</a>
                </p>
                <p>
                  <a href="/login-register">Register</a>
                  <a href="/login-register">Login</a>
                </p>
              </div>
              {/* Header Shop Links End */}
            </div>
          </div>
        </div>
      </div>
      {/* Header Top End */}

      {/* Header Bottom Start */}
      <div className="header-bottom header-bottom-one header-sticky">
        <div className="container-fluid">
          <div className="row menu-center align-items-center justify-content-between">
            <div className="col mt-15 mb-15">
              {/* Logo Start */}
              <div className="header-logo">
                <a href="/">
                  <img src="./src/assets/images/logo.png" />
                </a>
              </div>
              {/* Logo End */}
            </div>

            <div className="col order-2 order-lg-3">
              {/* Header Advance Search Start */}
              <div className="header-shop-links">
                <div className="header-search">
                  <button className="search-toggle">
                    <img
                      src="./src/assets/images/icons/search.png"
                      alt="Search Toggle"
                    />
                    <img
                      className="toggle-close"
                      src="./src/assets/images/icons/close.png"
                      alt="Search Toggle"
                    />
                  </button>
                  <div className="header-search-wrap">
                    <form action="#">
                      <input type="text" placeholder="Type and hit enter" />
                      <button>
                        <img
                          src="./src/assets/images/icons/search.png"
                          alt="Search"
                        />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="header-wishlist">
                  <a href="/wishlist">
                    <img
                      src="./src/assets/images/icons/wishlist.png"
                      alt="Wishlist"
                    />{" "}
                    <span>02</span>
                  </a>
                </div>

                <div className="header-mini-cart">
                  <a href="/cart">
                    <img src="./src/assets/images/icons/cart.png" alt="Cart" />{" "}
                    <span>02($250)</span>
                  </a>
                </div>
              </div>
              {/* Header Advance Search End */}
            </div>

            <div className="col order-3 order-lg-2">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li className="active">
                      <a href="/">HOME</a>
                    </li>
                    <li>
                      <a href="/shop">SHOP</a>
                    </li>
                    {/* <li>
                      <a href="#">PAGES</a>
                      <ul className="sub-menu">
                        <li>
                          <a href="/cart">Cart</a>
                        </li>
                        <li>
                          <a href="/checkout">Checkout</a>
                        </li>
                        <li>
                          <a href="/my-account">My Account</a>
                        </li>
                        <li>
                          <a href="/wishlist">Wishlist</a>
                        </li>
                        
                      </ul>
                    </li> */}
                    <li>
                      <a href="/blog">BLOG</a>
                     
                    </li>
                    <li>
                      <a href="/contact">CONTACT</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="mobile-menu order-12 d-block d-lg-none col"></div>
          </div>
        </div>
      </div>
      {/* Header Bottom End */}
    </div>
  );
};
export default Header;
