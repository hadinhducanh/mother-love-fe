/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// components/CheckoutAddress.tsx
import { useState, useEffect } from "react";
import agent from "@/api/agent";
import { AddressObj } from "@/model/Address";
import { useAuth } from "@/context/auth/AuthContext";
import AddressDetail from "./AddressDetail";
import AddressDialog from "./AddressDialog";
import NewAddressDialog from "./AddNewAddress/ NewAddressDialog";

const CheckoutAddress = () => {
  const [address, setAddress] = useState<AddressObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userId, setUserId] = useState<number | null>(null);
  const { isLoggedIn, getUserInfo } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [selectedAddress, setSelectedAddress] = useState<AddressObj | null>(
    null
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId);
        }
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    }
  }, [isLoggedIn, getUserInfo]);

  useEffect(() => {
    if (userId !== null) {
      fetchAddressByUser(userId, pageNo, pageSize);
    }
  }, [userId, pageNo, pageSize]);

  const fetchAddressByUser = (
    userId: number,
    pageNo: number,
    pageSize: number
  ) => {
    setLoading(true);
    setError(null);

    agent.Address.listByUserId(userId, pageNo, pageSize)
      .then((response) => {
        if (response && Array.isArray(response)) {
          setAddress(response);

          setSelectedAddress(
            response.find((address) => address.default == true)
          );
        } else {
          setError("Fetched data is not in expected format");
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const handleRadioChange = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const handleFormSubmit = (data: { selectedAddress: string }) => {
    const selected = address.find(
      (addr) => addr.addressId.toString() === selectedAddressId
    );
    setSelectedAddress(selected || null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-section section section-padding">
      <div className="container">
        <h3>Your Address</h3>
        <div className="address d-flex justify-between items-end">
          <AddressDetail selectedAddress={selectedAddress} />
          <div className="address-changing">
            <AddressDialog
              address={address}
              selectedAddressId={selectedAddressId}
              onRadioChange={handleRadioChange}
              onSubmit={handleFormSubmit}
            />
            <NewAddressDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutAddress;
