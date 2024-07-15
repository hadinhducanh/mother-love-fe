import { useState } from "react";
import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import CheckoutAddress from "@/components/Address/CheckoutAddress";
import CheckoutPreOrder from "./CheckoutPreOrder";

export const PreOrder = () => {
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"PreOrder"}
            singleName={"PreOrder"}
            pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
          />
          <CheckoutAddress onSelectAddress={setSelectedAddressId} />
          <CheckoutPreOrder selectedAddressId={selectedAddressId} />
        </div>
      </div>
      <Brand />
    </>
  );
};
