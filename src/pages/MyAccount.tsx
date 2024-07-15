import Banner from "../components/Banner";
import { Brand } from "../components/Brand";
import { MenuAccount } from "@/components/MyAccount/MenuAccount";
import { AccountDetail } from "@/components/MyAccount/AccountDetail";

const MyAccount = () => {
  return (
    <>
      <Banner
        pageName={"My Account"}
        singleName={"My Account"}
        pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-30">
            <div className="col-lg-3 col-12 mb-30">
              <MenuAccount />
            </div>

            <div className="col-lg-9 col-12 mb-30">
              <div className="tab-content" id="myaccountContent">
                <AccountDetail />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default MyAccount;
