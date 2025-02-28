import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/auth/AuthContext";
import { useCart } from "../context/cart/CartContext";
import AlertModal from "./AlertModal"; // Import AlertModal
import { useWishlist } from "@/context/wishlist/WishlistContext";
import { Heart, ShoppingCartIcon, User } from "lucide-react";
const Header = () => {
  const { isLoggedIn, logout, getUserInfo } = useAuth();
  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist(); // Use wishlistItems from WishlistContext

  const [fullName, setFullName] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setFullName(userInfo.fullName);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, getUserInfo]);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setShowLogoutModal(false);
  };

  const handleCloseModal = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="header-section section">
      <div className="header-top header-top-two bg-theme-one">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col mt-10 mb-10 d-none d-md-flex">
              <div className="header-top-left header-top-left-two">
                <p>Welcome to Mother Love</p>
                <p>
                  Hotline: <a href="tel:0123456789">0123 456 789</a>
                </p>
              </div>
            </div>

            <div className="col mt-10 mb-10">
              <div className="header-top-right header-top-right-two">
                {isLoggedIn ? (
                  <>
                    <ul className="header-lan-curr header-lan-curr-two mt-1">
                      <p className="mr-0">Hello, {fullName}</p>
                      <li>
                        <a href="#">
                          <User size={23} />
                        </a>

                        <ul>
                          <li>
                            <Link to="/my-order">Account</Link>
                          </li>
                          <li>
                            <Link to="/voucher-list">Voucher</Link>
                          </li>
                          <li>
                            <a onClick={handleLogout}>Logout</a>
                          </li>
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

      <div
        className="header-bottom header-bottom-one header-sticky"
        style={{ backgroundColor: "white" }}
      >
        <div className="container-fluid">
          <div className="row menu-center align-items-center justify-content-between">
            <div className="col mt-15 mb-15">
              <div className="header-logo">
                <Link to="/">
                  <img
                    src="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718436967/vmmt1mwdsqltem1hcp7v.png"
                    alt="Logo"
                    style={{ width: "100px" }}
                  />
                </Link>
              </div>
            </div>

            <div className="col order-3 order-lg-2">
              <div className="header-shop-links h-20">
                <div className="header-wishlist">
                  <Link to="/wishlist" className="d-flex flex-col items-center">
                    {/* <img
                      src="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718435825/tu5i5dlrzuygf8vfgkgn.png"
                      alt="Wishlist"
                    />{" "} */}
                    <Heart size={22} />
                    <span>{wishlistItems.length}</span>
                  </Link>
                </div>

                <div className="header-mini-cart">
                  <Link to="/cart" className="d-flex flex-col items-center">
                    {/* <img
                      src="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718435825/exlbleuphlrgthue8lhc.png"
                      alt="Cart"
                    />{" "} */}
                    <ShoppingCartIcon size={22} />
                    <span>{cartItems.length}</span>
                  </Link>
                </div>
              </div>
              {/* Header Advance Search End */}
            </div>

            <div className="col order-2 order-lg-3">
              <div className="main-menu">
                <nav>
                  <ul>
                    <li>
                      <NavLink className="nav-link" to="/">
                        HOME
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/shop">
                        SHOP
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/blog">
                        BLOG
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="nav-link" to="/contact">
                        REPORT
                      </NavLink>
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

      <AlertModal
        show={showLogoutModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmLogout}
        title="Confirm Logout"
        body="Do you really want to logout?"
      />
    </div>
  );
};

export default Header;
