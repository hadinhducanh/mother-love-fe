import React, { useState, useEffect } from "react";
import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";

interface Props {
  selectedAddressId: string | null;
}

const CheckoutPreOrder: React.FC<Props> = ({ selectedAddressId }) => {
  const { userId } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preOrderItem, setPreOrderItem] = useState<{ productId: number, productName: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const preOrder = localStorage.getItem("preOrder");
    if (preOrder) {
      setPreOrderItem(JSON.parse(preOrder));
    }
  }, []);

  const renderPreOrderItem = () => {
    if (preOrderItem) {
      return (
        <li key={preOrderItem.productId}>
          {preOrderItem.productName}
        </li>
      );
    }
    return <li>No pre-order items found</li>;
  };

 

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);

    try {
      const preOrder = localStorage.getItem("preOrder");
      if (!preOrder) {
        throw new Error("No pre-order item found");
      }

      const preOrderItem = JSON.parse(preOrder);
      const orderItems = [{
        productId: preOrderItem.productId,
        quantity: preOrderItem.quantity,
      }];

      const addressId = selectedAddressId || "";
      const voucherId = 0;

      if (!userId) {
        throw new Error("User is not logged in");
      }

     await agent.Orders.createPreOrder(userId, addressId, voucherId, orderItems);
     toast.success("Pre-order placed successfully");

      localStorage.removeItem("preOrder");
      navigate("/my-order");



    } catch (error) {
      setError("Failed to place order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <ToastContainer position="bottom-left" />
      <div>
        {/* Checkout Section Start */}
        <div className="page-section section section-padding">
          <div className="container">
            {/* Checkout Form */}
            <form action="#" className="checkout-form">
              <div className="row row-50 mbn-40">
                <div className="col-lg-5">
                  <div className="row">
                    {/* Cart Total */}
                    <div className="col-12 mb-40">
                      <h4 className="checkout-title">Pre Order</h4>
                      <div className="checkout-cart-total">
                        <h4>
                          Product 
                        </h4>
                        <ul>{renderPreOrderItem()}</ul>
                      </div>
                      <button className="place-order" onClick={handlePlaceOrder} disabled={loading}>
                        {loading ? "Placing Order..." : "Place order"}
                      </button>
                      {error && <p style={{ color: "red" }}>{error}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPreOrder;
