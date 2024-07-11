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
            pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
          />
          <CheckoutAddress onSelectAddress={setSelectedAddressId} />
          <CheckoutPreOrder selectedAddressId={selectedAddressId} />
        </div>
      </div>
      <Brand />
    </>
  );
};
