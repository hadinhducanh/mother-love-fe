import { useState } from "react";
import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import CheckoutAddress from "@/components/Address/CheckoutAddress";
import CheckoutTotalCart from "./CheckoutTotalCart";

export const Checkout = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"Checkout"}
            singleName={"Checkout"}
            pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
          />
          <CheckoutAddress onSelectAddress={setSelectedAddressId} />
          <CheckoutTotalCart selectedAddressId={selectedAddressId} />
        </div>
      </div>
      <Brand />
    </>
  );
};
