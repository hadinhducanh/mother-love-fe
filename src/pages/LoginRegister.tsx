import Banner from "../components/Banner";
import { Brand } from "../components/Brand";


const LoginRegister = () => {
  return (
    <>
      <Banner
        pageName={"Login & Register"}
        singleName={"Login & Register"}
        pictureUrl="./src/assets/images/hero/hero-1.jpg"
      />
       <div className="page-section section section-padding">
        <div className="container">
            <div className="row mbn-40">

                <div className="col-lg-4 col-12 mb-40">
                    <div className="login-register-form-wrap">
                        <h3>Login</h3>
                        <form className="mb-30">
                            <div className="row">
                                <div className="col-12 mb-15">
                                    <input type="text" placeholder="Username or Email" />
                                </div>
                                <div className="col-12 mb-15">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div className="col-12">
                                    <input type="submit" value="Login" />
                                </div>
                            </div>
                        </form>
                        <h4>You can also login with...</h4>
                        <div className="social-login">
                            <a href="#"><i className="fa fa-facebook"></i></a>
                            <a href="#"><i className="fa fa-twitter"></i></a>
                            <a href="#"><i className="fa fa-google-plus"></i></a>
                            <a href="#"><i className="fa fa-pinterest"></i></a>
                            <a href="#"><i className="fa fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>

                <div className="col-lg-2 col-12 mb-40 text-center">
                    <span className="login-register-separator"></span>
                </div>

                <div className="col-lg-6 col-12 mb-40 ml-auto">
                    <div className="login-register-form-wrap">
                        <h3>Register</h3>
                        <form>
                            <div className="row">
                                <div className="col-md-6 col-12 mb-15">
                                    <input type="text" placeholder="Your Name" />
                                </div>
                                <div className="col-md-6 col-12 mb-15">
                                    <input type="text" placeholder="User Name" />
                                </div>
                                <div className="col-md-6 col-12 mb-15">
                                    <input type="email" placeholder="Email" />
                                </div>
                                <div className="col-md-6 col-12 mb-15">
                                    <input type="password" placeholder="Password" />
                                </div>
                                <div className="col-md-6 col-12 mb-15">
                                    <input type="password" placeholder="Confirm Password" />
                                </div>
                                <div className="col-md-6 col-12">
                                    <input type="submit" value="Register" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <Brand/>
      
    </>
  
    
  );
};
export default LoginRegister;
