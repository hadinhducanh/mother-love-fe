

export const Login = () => {
    return(
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
    )
}