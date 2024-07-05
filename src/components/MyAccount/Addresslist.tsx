import agent from "@/api/agent";
import { useAuth } from "@/context/auth/AuthContext";
import { AddressObj } from "@/model/Address";
import { User } from "@/model/User";
import { useState, useEffect } from "react";
import Loading from "../Loading";

export const Addresslist: React.FC = () => {
  const [address, setAddress] = useState<AddressObj[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pageNo, setPageNo] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
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
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="myaccount-content">
          <h3>{userInfo?.fullName}'s Address</h3>
          {address.map((addr) => (
            <>
              <address key={addr.addressId}>
                <p>
                  <strong>{addr.user?.fullName}</strong>
                </p>
                <p>
                  {addr.addressLine}, {addr.district} <br />
                  {addr.city}, VietNam
                </p>
                <p>Mobile: {addr.user?.phone}</p>
              </address>
              <a href="#" className="btn btn-dark btn-round d-inline-block">
                <i className="fa fa-edit"></i> Edit Address
              </a>
            </>
          ))}
        </div>
      )}
    </>
  );
};
