import Banner from "@/components/Banner";
import { Brand } from "../components/Brand";
import CheckoutAddress from "@/components/Address/CheckoutAddress";

export const Checkout = () => {
  return (
    <>
      <div>
        <div>
          <Banner
            pageName={"Checkout"}
            singleName={"Checkout"}
            pictureUrl={"./src/assets/images/hero/hero-1.jpg"}
          />
          <CheckoutAddress />
        </div>
      </div>
      <Brand />
    </>
  );
};
