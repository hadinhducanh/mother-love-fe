import React from "react";
import Shop from "./Shop";
import { CategoryProvider } from "@/components/Shop/Category/CategoryContext";
import Sidebar from "@/components/Shop/Sidebar";
import Banner from "@/components/Banner";
import { BrandProvider } from "@/components/Shop/Brand/BrandContext";
const ShopWrapper: React.FC = () => {
  return (
    <CategoryProvider>
      <BrandProvider>
        <Banner
          pageName={"Shop"}
          singleName={"Shop"}
          pictureUrl="./src/assets/images/hero/hero-1.jpg"
        />
        <div className="page-section section section-padding">
          <div className="container">
            <div className="row row-30 mbn-40">
              <div className="col-xl-8 col-lg-8 col-12 order-2 order-lg-2 mb-40">
                <div className="row ml-4">
                  <Shop />
                </div>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      </BrandProvider>
    </CategoryProvider>
  );
};

export default ShopWrapper;
