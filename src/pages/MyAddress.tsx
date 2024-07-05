
import Banner from '../components/Banner';
import { Brand } from '../components/Brand';
import { MenuAccount } from '@/components/MyAccount/MenuAccount';
import { Addresslist } from '@/components/MyAccount/Addresslist';

const MyAddress = () => {
  return (
    <>
      <Banner
        pageName={"My Account"}
        singleName={"My Account"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          <div className="row mbn-30">
            <div className="col-lg-3 col-12 mb-30">
              <MenuAccount />
            </div>
  
            <div className="col-lg-9 col-12 mb-30">
              <div className="tab-content" id="myaccountContent">
                <Addresslist />
           
              </div>
            </div>
          </div>
        </div>
      </div>
      <Brand />
    </>
  );
};

export default MyAddress;
