import React from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer /> {/* Thêm ToastContainer */}
    </>
  );
}

export default App;
