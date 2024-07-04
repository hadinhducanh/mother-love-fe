import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "http://localhost:8080/api/v1/";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: axios.defaults.baseURL,
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
  (error) => Promise.reject(error)
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
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(...data.errors[key]);
            }
          }
          throw modelStateErrors;
        }
        toast.error(data.title);
        break;
      case 401:
      case 404:
      case 500:
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
  get: (url: string, params?: any) => axiosInstance.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
  delete: (url: string) => axiosInstance.delete(url).then(responseBody),
  getMemberVouchers: (userId: number) => axiosInstance.get(`vouchers/member?userId=${userId}`).then(responseBody),
  addVoucherForMember: (userId: number, voucherId: number) => axiosInstance.post(`vouchers/member?userId=${userId}&voucherId=${voucherId}`, {}).then(responseBody),
  updateDefaultAddress: (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => axiosInstance.put(`address/default?userId=${userId}&addressOldId=${addressOldId}&addressNewId=${addressNewId}`, {}).then(responseBody),
  updateAddress: (addressId: number, updatedAddress: any) => axiosInstance.put(`address/${addressId}`, updatedAddress).then(responseBody),
  createOrder: (userId: number, addressId: number, voucherId: number, orderItems: any) => axiosInstance.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}`, orderItems).then(responseBody),
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
  getMemberVouchers: (userId: number) => requests.getMemberVouchers(userId),
  addVoucherForMember: (userId: number, voucherId: number) => requests.addVoucherForMember(userId, voucherId),
};

const Address = {
  listByUserId: (userId: number, pageNo: number, pageSize: number) => requests.get(`address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`),
  updateDefaultAddress: (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => requests.updateDefaultAddress(userId, addressOldId, addressNewId),
  updateAddress: (addressId: number, updatedAddress: any) => requests.updateAddress(addressId, updatedAddress),
  addNewAddress: (newAddress: any) => requests.post(`address`, newAddress),
  deleteAddress: (addressId: number) => requests.delete(`address/${addressId}`)
};

const Orders = {
  createOrder: (userId: number, addressId: number, voucherId: number, orderItems: any) =>
    requests.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}`, orderItems),
  getOrdersByUserId: (userId: number, pageNo: number, pageSize: number) =>
    requests.get(`orders/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=orderDate&sortDir=desc`),
  getOrderById: (orderId: number) =>
    requests.get(`orders/order/${orderId}`),
  getOrdersByDateRange: (pageNo: number, pageSize: number, sortBy: string, sortDir: string, orderDateFrom: string, orderDateTo: string) =>
    requests.get(`orders/search`, {
      pageNo,
      pageSize,
      sortBy,
      sortDir,
      orderDateFrom,
      orderDateTo
    }),
};

const agent = {
  Products,
  Brand,
  Category,
  Address,
  Voucher,
  Orders,
};

export default agent;
