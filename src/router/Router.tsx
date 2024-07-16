import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { HomePage } from "../pages/HomePage";
import Cart from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import LoginRegister from "../pages/LoginRegister";
import Wishlist from "../pages/Wishlist";
import { Contact } from "../pages/Contact";
import Product from "../pages/Product";
import BlogDetail from "../pages/BlogDetail";
import { NotFound } from "../pages/404";
import { AuthProvider } from "../context/auth/AuthContext";
import { CartProvider } from "../context/cart/CartContext";
import VoucherList from "@/pages/VoucherList";
import { WishlistProvider } from "@/context/wishlist/WishlistContext";
import ShopWrapper from "@/pages/ShopWrapper";
import Blog from "@/pages/Blog";
import MyAddress from "@/pages/MyAddress";
import OrderDetail from "@/pages/OrderDetail"; // Import OrderDetail component
import MyOrder from "@/pages/MyOrder";
import MyAccount from "@/pages/MyAccount";
import { Success } from "@/pages/Success";
import Fail from "@/pages/Fail";
import { PreOrder } from "@/pages/PreOrder";
import PrivateRoute from './PrivateRoute'; // Đảm bảo import PrivateRoute từ đúng đường dẫn

const AppWithProvider = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <App />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWithProvider />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shop", element: <ShopWrapper /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "pre-order", element: <PreOrder /> },
      { path: "voucher-list", element: <PrivateRoute element={<VoucherList />} /> },
      { path: "login-register", element: <LoginRegister /> },
      { path: "my-order", element: <PrivateRoute element={<MyOrder />} /> },
      { path: "my-address", element: <PrivateRoute element={<MyAddress />} /> },
      { path: "my-account", element: <PrivateRoute element={<MyAccount />} /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "single-product/:id", element: <Product /> },
      { path: "single-blog/:id", element: <BlogDetail /> },
      { path: "orders/:orderId", element: <PrivateRoute element={<OrderDetail />} /> },
      { path: "*", element: <NotFound /> },
      { path: "success", element: <Success /> },
      { path: "fail", element: <Fail /> },
    ],
  },
]);
