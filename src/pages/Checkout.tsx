import React, { useState } from "react";
import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import CheckoutAddress from "@/components/Address/CheckoutAddress";
import CheckoutTotalCart from "./CheckoutTotalCart";

export const Checkout = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"Checkout"}
            singleName={"Checkout"}
            pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
          />
          <CheckoutAddress onSelectAddress={setSelectedAddressId} />
          <CheckoutTotalCart selectedAddressId={selectedAddressId} />
        </div>
      </div>
      <Brand />
    </>
  );
};
