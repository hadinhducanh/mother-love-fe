import Banner from "../components/Banner"
import { Brand } from "../components/Brand"

const Wishlist = () => {
    return (
        <>
            <Banner
                pageName={"Wishlist"}
                singleName={"Wishlist"}
                pictureUrl="./src/assets/images/hero/hero-1.jpg"
            />
            <div className="page-section section section-padding">
                <div className="container">

                    <form action="#">
                        <div className="row">
                            <div className="col-12">
                                <div className="cart-table table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th className="pro-thumbnail">Image</th>
                                                <th className="pro-title">Product</th>
                                                <th className="pro-price">Price</th>
                                                <th className="pro-quantity">Quantity</th>
                                                <th className="pro-subtotal">Total</th>
                                                <th className="pro-remove">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="pro-thumbnail"><a href="#"><img src="assets/images/product/product-1.jpg" alt="" /></a></td>
                                                <td className="pro-title"><a href="#">Tmart Baby Dress</a></td>
                                                <td className="pro-price"><span className="amount">$25</span></td>
                                                <td className="pro-quantity"><div className="pro-qty"><input type="text" value="1" /></div></td>
                                                <td className="pro-add-cart"><a href="#">add to cart</a></td>
                                                <td className="pro-remove"><a href="#">×</a></td>
                                            </tr>
                                            <tr>
                                                <td className="pro-thumbnail"><a href="#"><img src="assets/images/product/product-2.jpg" alt="" /></a></td>
                                                <td className="pro-title"><a href="#">Jumpsuit Outfits</a></td>
                                                <td className="pro-price"><span className="amount">$09</span></td>
                                                <td className="pro-quantity"><div className="pro-qty"><input type="text" value="1" /></div></td>
                                                <td className="pro-add-cart"><a href="#">add to cart</a></td>
                                                <td className="pro-remove"><a href="#">×</a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
            <Brand />
        </>
    )
}
export default Wishlist