import { Blog } from "../components/Blog";
import { Brand } from "../components/Brand";
import { Feature } from "../components/Feature";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PopularProduct from "../components/PopularProduct";
import { ProductSection } from "../components/ProductSection";
import { TestimonialSection } from "../components/TestimonialSection";

export const HomePage = () => {
    return(
        <>
        <Header/>
        <HeroSection/>
        <PopularProduct/>
        <ProductSection/>
        <TestimonialSection/>
        <Feature/>
        <Blog/>
        <Brand/>
        <Footer/>
        </>
    )
};