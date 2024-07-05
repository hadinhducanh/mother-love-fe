import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";
import { AddressObj } from "@/model/Address";
import React, { useEffect, useState } from "react";

import { User } from "@/model/User";
import { Separator } from "../ui/separator";


const AccountAddress: React.FC = () => {
  const [address, setAddress] = useState<AddressObj[]>([]);
 
  const [, setLoading] = useState<boolean>(true);
  const [, setError] = useState<string | null>(null);
  const [pageNo, ] = useState<number>(0);
  const [pageSize, ] = useState<number>(10);
  const { isLoggedIn, getUserInfo } = useAuth();
  const [userId, setUserId] = useState<number | null>(null);
  const [userInfo, setUserInfo] = useState<User>();
 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId);
          setUserInfo(userInfo);
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

  const fetchAddressByUser = async (
    userId: number,
    pageNo: number,
    pageSize: number
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await agent.Address.listByUserId(
        userId,
        pageNo,
        pageSize
      );
      if (response && Array.isArray(response)) {
        console.log(response);
        setAddress(sortAddresses(response));
      } else {
        setError("Fetched data is not in expected format");
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const sortAddresses = (addresses: AddressObj[]) => {
    return addresses.sort((a, b) => (a.default ? -1 : b.default ? 1 : 0));
  };

  return (
    <div className="tab-pane fade" id="address-edit" role="tabpanel">
      <div className="myaccount-content">
        <div className="d-flex items-center justify-between">
          <h3
            style={{
              border: "none",
              marginBottom: "none",
              paddingBottom: "none",
            }}
          >
            {userInfo?.fullName}'s Address
          </h3>

          {/* <Button className="bg-black text-white text-sm hover:bg-[#ff708a] border-0 p-2.5">
            Add New Address
          </Button> */}
        </div>

        <Separator className="mt-2" />
        {address.map((addr, index) => (
          <div key={addr.addressId} className="mt-3">
            <address>
              <p>
                <strong>{addr.user?.fullName}</strong>
              </p>
              <p>
                {addr.addressLine}, {addr.district} <br />
                {addr.city}, Việt Nam
              </p>
              <p>Mobile: {addr.user?.phone}</p>
            </address>
            {index < address.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountAddress;
