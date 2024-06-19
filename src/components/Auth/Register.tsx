export const Register = () => {
    return(
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
    )
}