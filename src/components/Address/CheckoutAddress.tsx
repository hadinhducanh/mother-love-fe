import React, { useState, useEffect } from "react";
import agent from "@/api/agent";
import { AddressObj } from "@/model/Address";
import { useAuth } from "@/context/auth/AuthContext";
import { useToast } from "../ui/use-toast";
import NewAddressDialog from "./AddNewAddress/ NewAddressDialog";
import AddressDetail from "./AddressDialog/AddressDetail";
import AddressDialog from "./AddressDialog/AddressDialog";

interface Props {
  onSelectAddress: (addressId: string | null) => void;
}

const CheckoutAddress: React.FC<Props> = ({ onSelectAddress }) => {
  const [address, setAddress] = useState<AddressObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [userId, setUserId] = useState<number | null>(null);
  const { isLoggedIn, getUserInfo } = useAuth();
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<AddressObj | null>(null);
  const { toast } = useToast();

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

  const fetchAddressByUser = async (userId: number, pageNo: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await agent.Address.listByUserId(userId, pageNo, pageSize);
      if (response && Array.isArray(response)) {
        setAddress(response);
        const defaultAddress = response.find((addr) => addr.default);
        setSelectedAddress(defaultAddress || null);
        setSelectedAddressId(defaultAddress ? defaultAddress.addressId.toString() : null);
        onSelectAddress(defaultAddress ? defaultAddress.addressId.toString() : null); // Pass the selected address ID to the parent component
      } else {
        setError("Fetched data is not in expected format");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRadioChange = (addressId: string) => {
    setSelectedAddressId(addressId);
    onSelectAddress(addressId); // Pass the selected address ID to the parent component
  };

  const handleFormSubmit = () => {
    const selected = address.find((addr) => addr.addressId.toString() === selectedAddressId);
    setSelectedAddress(selected || null);
  };

  const handleAddressAdded = (newAddress: AddressObj) => {
    setAddress((prevAddress) => [...prevAddress, newAddress]);
  };

  const handleDeleteAddress = async (addressId: string) => {
    try {
      await agent.Address.deleteAddress(parseInt(addressId));
      toast({ title: "Delete Address successfully!" });
      setAddress((prevAddress) =>
        prevAddress.filter((addr) => addr.addressId.toString() !== addressId)
      );
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleUpdateAddress = async (updatedAddress: AddressObj) => {
    try {
      const prevDefaultAddressID = address.find((addr) => addr.default)?.addressId || 0;

      if (updatedAddress.default) {
        await agent.Address.updateDefaultAddress(userId, prevDefaultAddressID, updatedAddress.addressId);
      }

      if (userId !== null) {
        const updatedAddresses = await agent.Address.listByUserId(userId, pageNo, pageSize);
        setAddress(updatedAddresses);
      }

      if (updatedAddress.default) {
        setSelectedAddress(updatedAddress);
        setSelectedAddressId(updatedAddress.addressId.toString());
        onSelectAddress(updatedAddress.addressId.toString()); // Pass the updated address ID to the parent component
      }
      // window.location.reload();
    } catch (error) {
      console.error("Failed to update address:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="page-section section section-padding">
      <div className="container">
        {address.length === 0 ? (
          <>
            <div className="text-center">
              <h3 className="mb-2">YOU HAVE NOT HAD ANY ADDRESS YET!!</h3>
              <NewAddressDialog onAddressAdded={handleAddressAdded} />
            </div>
          </>
        ) : (
          <>
            <h3>Your Address</h3>
            <div className="address d-flex justify-between items-end">
              <AddressDetail selectedAddress={selectedAddress} />
              <div className="address-changing">
                <AddressDialog
                  address={address}
                  selectedAddressId={selectedAddressId}
                  onRadioChange={handleRadioChange}
                  onSubmit={handleFormSubmit}
                  onDelete={handleDeleteAddress}
                  onUpdate={handleUpdateAddress}
                />
                <NewAddressDialog onAddressAdded={handleAddressAdded} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutAddress;
