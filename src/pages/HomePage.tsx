// import Banner from "../components/Banner";

import { Brand } from "@/components/Brand";
import { Feature } from "@/components/Home/Feature";
import HeroSection from "@/components/Home/HeroSection";
import { HomePageBanner } from "@/components/Home/HomePageBanner";
import { HomePageBanner2 } from "@/components/Home/HomePageBanner2";
import PopularProduct from "@/components/Home/PopularProduct";
import { TestimonialSection } from "@/components/Home/TestimonialSection";
import { ProductSection } from "@/components/Home/ProductSection";
import { Blog } from "./Blog";
import Vouchers from "@/components/Home/Vouchers";


export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularProduct />
      <ProductSection />
      <Vouchers />
      <TestimonialSection />
      <Feature />
      <Blog />
      <Brand />
    </>
  );
};
