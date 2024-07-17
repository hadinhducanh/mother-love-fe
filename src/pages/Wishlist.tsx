import Banner from "../components/Banner";

import { CartItems, useCart } from "../context/cart/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WishlistItem, useWishlist } from "@/context/wishlist/WishlistContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleRemoveItem = (productId: number) => {
    removeFromWishlist(productId);
  };

  const handleAddToCart = (item: WishlistItem) => {
    const cartItem = { ...item, quantity: 1 };
    addToCart(cartItem as CartItems);
    removeFromWishlist(item.productId);
    toast.success("Product added to cart!");
  };

  return (
    <>
      <Banner
        pageName={"Wishlist"}
        singleName={"Wishlist"}
        pictureUrl="https://res.cloudinary.com/dhgg72vfy/image/upload/v1718358912/vrajlukd4rlhqd4rij09.jpg"
      />
      <div className="page-section section section-padding">
        <div className="container">
          {wishlistItems.length === 0 ? (
            <div className="empty-wishlist-message">
              <h2>Your wishlist is empty</h2>
            </div>
          ) : (
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
                          <th className="pro-add-cart">Add to Cart</th>
                          <th className="pro-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlistItems.map((item: WishlistItem) => {
                          const image = item.image
                            .replace(/[\[\]]/g, "")
                            .split(",");
                          return (
                            <tr key={item.productId}>
                              <td className="pro-thumbnail">
                                <a href="#">
                                  <img src={image[0]} alt={item.productName} />
                                </a>
                              </td>
                              <td className="pro-title">
                              <a href={`single-product/${item.productId}`}>{item.productName}</a>
                              </td>
                              <td className="pro-price">
                                <span className="amount">
                                  {item.price.toLocaleString()}
                                </span>
                              </td>
                              <td className="pro-add-cart">
                                <a onClick={() => handleAddToCart(item)}>
                                  Add to Cart
                                </a>
                              </td>
                              <td className="pro-remove">
                                <a
                                  onClick={() =>
                                    handleRemoveItem(item.productId)
                                  }
                                >
                                  ×
                                </a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
