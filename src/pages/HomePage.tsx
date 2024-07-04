// import Banner from "../components/Banner";

import { Brand } from "@/components/Brand";
import { Feature } from "@/components/Home/Feature";
import HeroSection from "@/components/Home/HeroSection";
import PopularProduct from "@/components/Home/PopularProduct";
import Vouchers from "@/components/Home/Vouchers";
import Blog from "./Blog";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularProduct />
      <Vouchers />
      <Feature />
      <Blog />
      <Brand />
    </>
  );
};
