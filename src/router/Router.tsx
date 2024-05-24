import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Shop from "../pages/Shop";
import { HomePage } from "../pages/HomePage";
import { Cart } from "../pages/Cart";
import { Checkout } from "../pages/Checkout";
import LoginRegister from "../pages/LoginRegister";
import MyAccount from "../pages/MyAccount";
import Wishlist from "../pages/Wishlist";
import { Blog } from "../pages/Blog";
import { Contact } from "../pages/Contact";
import Product from "../pages/Product";
import BlogDetail from "../pages/BlogDetail";
import { NotFound } from "../pages/404";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "shop", element: <Shop /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> },
      { path: "login-register", element: <LoginRegister /> },
      { path: "my-account", element: <MyAccount /> },
      { path: "wishlist", element: <Wishlist /> },
      { path: "blog", element: <Blog /> },
      { path: "contact", element: <Contact /> },
      { path: "single-product", element: <Product /> },
      { path: "single-blog", element: <BlogDetail /> },
      { path: "404", element: <NotFound /> },
    ],
  },
]);
