import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

axios.defaults.baseURL = "https://motherlove-api.onrender.com/api/v1/";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API instance for external API
export const mockApiInstance = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/',
  withCredentials: false, // Ensure withCredentials is false for external APIs
  headers: {
    'Content-Type': 'application/json',
    'token': 'af07e871-3910-11ef-8e53-0a00184fe694',
  },
});

mockApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error fetching data from mock API:', error);
    return Promise.reject(error);
  }
);

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
          toast.error(modelStateErrors.join(', '));
        } else {
          toast.error(data.title);
        }
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
  get: async (url: string, params?: any) => axiosInstance.get(url, { params }).then(responseBody),
  post: async (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
  put: async (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
  delete: async (url: string) => axiosInstance.delete(url).then(responseBody),
  getMemberVouchers: async (userId: number) => axiosInstance.get(`vouchers/member?userId=${userId}`).then(responseBody),
  addVoucherForMember: async (userId: number, voucherId: number) => axiosInstance.post(`vouchers/member?userId=${userId}&voucherId=${voucherId}`, {}).then(responseBody),
  updateDefaultAddress: async (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => axiosInstance.put(`address/default?userId=${userId}&addressOldId=${addressOldId}&addressNewId=${addressNewId}`, {}).then(responseBody),
  updateAddress: async (addressId: number, updatedAddress: any) => axiosInstance.put(`address/${addressId}`, updatedAddress).then(responseBody),
  createOrder: async (userId: number, addressId: number, voucherId: number, orderItems: any) => axiosInstance.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}`, orderItems).then(responseBody),
};

const createListEndpoint = (endpoint: string, defaultSortBy: string, defaultSortDir: string = 'asc') => {
  return async (pageNo: number, pageSize: number) => requests.get(`${endpoint}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${defaultSortBy}&sortDir=${defaultSortDir}`);
};

const Products = {
  list: async (pageNo: number, pageSize: number, sortDir: string = 'asc') => requests.get(`product?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=price&sortDir=${sortDir}`),
  details: async (id: number) => requests.get(`product/${id}`),
  getProductByCategoryId: async (id: any) => requests.get(`product/search?category=${id}`),
};

const Blog = {
  list: createListEndpoint('blogs', 'blogId'),
};

const Brand = {
  list: createListEndpoint('brand', 'brandId'),
};

const Category = {
  list: createListEndpoint('categories', 'categoryId'),
};

const Voucher = {
  list: createListEndpoint('vouchers', 'voucherId'),
  getMemberVouchers: async (userId: number) => requests.getMemberVouchers(userId),
  addVoucherForMember: async (userId: number, voucherId: number) => requests.addVoucherForMember(userId, voucherId),
};

const Address = {
  listByUserId: async (userId: number, pageNo: number, pageSize: number) => requests.get(`address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`),
  updateDefaultAddress: async (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => requests.updateDefaultAddress(userId, addressOldId, addressNewId),
  updateAddress: async (addressId: number, updatedAddress: any) => requests.updateAddress(addressId, updatedAddress),
  addNewAddress: async (newAddress: any) => requests.post(`address`, newAddress),
  deleteAddress: async (addressId: number) => requests.delete(`address/${addressId}`),
};

const ExternalAPI = {
  getProvinces: async () => mockApiInstance.post('/province').then(responseBody),
  getDistrictByProvince: async (province_id: any) => mockApiInstance.post('/district', { province_id }).then(responseBody),
};

const Orders = {
  createOrder: async (userId: number, addressId: string, voucherId: number, orderItems: any) =>
    requests.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}&isPreOrder=0`, orderItems),
  getOrdersByUserId: async (userId: number, pageNo: number, pageSize: number) =>
    requests.get(`orders/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=orderDate&sortDir=desc`),
  getOrderById: async (orderId: number) => requests.get(`orders/order/${orderId}`),
  getOrdersByDateRange: async (pageNo: number, pageSize: number, sortBy: string, sortDir: string, orderDateFrom: string, orderDateTo: string) =>
    requests.get(`orders/search`, { pageNo, pageSize, sortBy, sortDir, orderDateFrom, orderDateTo }),
};

const agent = {
  Products,
  Brand,
  Category,
  Address,
  Voucher,
  ExternalAPI,
  Orders,
  Blog,
};

export default agent;
