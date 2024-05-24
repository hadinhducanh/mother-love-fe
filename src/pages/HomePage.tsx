// import Banner from "../components/Banner";
import { Blog } from "../components/Blog";
import { Brand } from "../components/Brand";
import { Feature } from "../components/Feature";
import HeroSection from "../components/HeroSection";
import { HomePageBanner } from "../components/HomePageBanner";
import { HomePageBanner2 } from "../components/HomePageBanner2";
import PopularProduct from "../components/PopularProduct";
import { ProductSection } from "../components/ProductSection";
import { TestimonialSection } from "../components/TestimonialSection";

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <PopularProduct />
      <HomePageBanner />
      <ProductSection />
      <HomePageBanner2 />
      <TestimonialSection />
      <Feature />
      <Blog />
      <Brand />
    </>
  );
};
