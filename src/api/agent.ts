/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosError, AxiosResponse } from "axios";
// import { router } from "../router/Router";
import { toast } from "react-toastify";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:8080/api/v1/";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/', // Replace with your actual API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

const responseBody = (response: AxiosResponse) => response.data;

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  async (response) => {
    await sleep();
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response as AxiosResponse;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateError: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateError.push(data.errors[key]);
            }
          }
          throw modelStateError.flat();
        }
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        // router.navigate("/server-error", { state: { error: data } });
        toast.error(data.title);
        break;
      default:
        toast.error("Something unexpected went wrong");
        break;
    }
    return Promise.reject(error.response);
  }
);

const requests = {
  get: (url: string) => axiosInstance.get(url).then(responseBody),
  post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => axiosInstance.delete(url).then(responseBody),
  // Thêm method GET mới cho vouchers/member endpoint
  getMemberVouchers: (userId: number) => requests.get(`vouchers/member?userId=${userId}`),
  // Thêm method POST mới cho vouchers/member endpoint
  addVoucherForMember: (userId: number, voucherId: number) => requests.post(`vouchers/member?userId=${userId}&voucherId=${voucherId}`, {}),
  updateDefaultAddress: (userId: number, addressOldId: number, addressNewId: number) => requests.put(`address/default?userId=${userId}&addressOldId=${addressOldId}&addressNewId=${addressNewId}`, {}),
  updateAddress: (addressId: number, updatedAddress: any) => requests.put(`address`, updatedAddress),
  
};


const createListEndpoint = (endpoint: string, defaultSortBy: string, defaultSortDir: string = 'asc') => {
  return (pageNo: number, pageSize: number) => requests.get(`${endpoint}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${defaultSortBy}&sortDir=${defaultSortDir}`);
};

const Products = {
  list: createListEndpoint('product', 'productId'),
  details: (id: number) => requests.get(`product/${id}`),
};

const Brand = {
  list: createListEndpoint('brand', 'brandId'),
};

const Category = {
  list: createListEndpoint('categories', 'categoryId'),
};

const Voucher = {
  list: createListEndpoint('vouchers', 'voucherId'),
  getMemberVouchers: (userId: number) => requests.getMemberVouchers(userId), // Thêm hàm này vào Voucher object
  addVoucherForMember: (userId: number, voucherId: number) => requests.addVoucherForMember(userId, voucherId), // Thêm hàm này vào Voucher object
};

const Address = {
  listByUserId: (userId: number, pageNo: number, pageSize: number) => {
    return requests.get(
      `address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`,
    );
  },
  updateDefaultAddress: (userId: number, addressOldId: number, addressNewId: number) => {
    return requests.updateDefaultAddress(userId, addressOldId, addressNewId);
  },
  updateAddress: (addressId: number, updatedAddress: any) => {
    return requests.updateAddress(addressId, updatedAddress);
  },
  addNewAddress: (newAddress: any) => requests.post(`http://localhost:8080/api/v1/address`, newAddress),
};

const agent = {
  Products,
  Brand,
  Category,
  Address,
  Voucher,
};

export default agent;
