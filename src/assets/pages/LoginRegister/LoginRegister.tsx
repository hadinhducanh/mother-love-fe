import Banner from "../../../components/Banner";

import LoginRegisterForm from "./LoginRegisterForm";

const LoginRegister = () => {
  return (
    <>
      <Banner
        pageName={"Login & Register"}
        singleName={"Login & Register"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <LoginRegisterForm />

      
    </>
  
    
  );
};
export default LoginRegister;
