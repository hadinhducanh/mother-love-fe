import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { isLoggedIn, logout, getUserInfo } = useAuth();
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setFullName(userInfo.fullName);
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, getUserInfo]);

  const handleLogout = () => {
    logout();
  };

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
              <div className="header-top-right header-top-right-two">
                {isLoggedIn ? (
                  <>
                    <ul className="header-lan-curr header-lan-curr-two">
                      <p>Xin chào, {fullName}</p>
                      <li>
                        <a href="#">User</a>
                        <ul>
                          <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                      </li>
                    </ul>
                  </>
                ) : (
                  <>
                    <p>
                      <Link to="/login-register">Register</Link>
                      <Link to="/login-register">Login</Link>
                    </p>
                  </>
                )}
              </div>
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
                <Link to="/">
                  <img src="./src/assets/images/logo.png" alt="Logo" />
                </Link>
              </div>
              {/* Logo End */}
            </div>

            <div className="col order-2 order-lg-3">
              {/* Header Advance Search Start */}
              <div className="header-shop-links">
                <div className="header-search">
                  <button className="search-toggle">
                    <img src="./src/assets/images/icons/search.png" alt="Search Toggle" />
                    <img className="toggle-close" src="./src/assets/images/icons/close.png" alt="Search Toggle" />
                  </button>
                  <div className="header-search-wrap">
                    <form action="#">
                      <input type="text" placeholder="Type and hit enter" />
                      <button>
                        <img src="./src/assets/images/icons/search.png" alt="Search" />
                      </button>
                    </form>
                  </div>
                </div>

                <div className="header-wishlist">
                  <Link to="/wishlist">
                    <img src="./src/assets/images/icons/wishlist.png" alt="Wishlist" /> <span>02</span>
                  </Link>
                </div>

                <div className="header-mini-cart">
                  <Link to="/cart">
                    <img src="./src/assets/images/icons/cart.png" alt="Cart" /> <span>02($250)</span>
                  </Link>
                </div>
              </div>
              {/* Header Advance Search End */}
            </div>

            <div className="col order-3 order-lg-2">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li>
                      <NavLink className='nav-link' to='/'>HOME</NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/shop'>SHOP</NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/blog'>BLOG</NavLink>
                    </li>
                    <li>
                      <NavLink className='nav-link' to='/contact'>CONTACT</NavLink>
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
