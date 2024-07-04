import { Link } from "react-router-dom"


export const MenuAccount = () => {
    return (
        <>
        <div className="myaccount-tab-menu nav" role="tablist">
                < Link to= "/my-account">
                  <i className="fa fa-cart-arrow-down"></i> Orders
                </Link>

                <Link to ="/my-address" >
                  <i className="fa fa-map-marker"></i> Address
                </Link>
                <Link to ="/my-account" >
                  <i className="fa fa-user"></i> Account Details
                </Link>

              </div>
        </>
    )
}