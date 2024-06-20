import Banner from "../components/Banner";
import { Brand } from "../components/Brand";
import { Login } from "../components/Auth/Login";
import { Register } from "@/components/Auth/Register";

const LoginRegister = () => {
  return (
    <>
      <Banner
        pageName={"Login & Register"}
        singleName={"Login & Register"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
      <div className="page-section section section-padding justify-content-center">
        <div className="container">
          <div className="row mbn-40">
            <Login />

               
                <div className="col-lg-2 col-12 mb-40 text-center">
                    <span className="login-register-separator"></span>
                </div>

                <Register/>

            </div>
        </div>
      </div>
      <Brand />
    </>
  );
};
export default LoginRegister;
