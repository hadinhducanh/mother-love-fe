/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

// Function to introduce a delay
const sleep = () => new Promise((resolve) => setTimeout(resolve, 500));

// Base configuration for internal API
// axios.defaults.baseURL = "http://localhost:8080/api/v1/";
axios.defaults.baseURL = "https://motherlove-api.onrender.com/api/v1/";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
  baseURL: axios.defaults.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configuration for external mock API
export const mockApiInstance = axios.create({
  baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/',
  withCredentials: false, // No credentials for external API
  headers: {
    'Content-Type': 'application/json',
    'token': 'af07e871-3910-11ef-8e53-0a00184fe694',
  },
});

// Error handling for external mock API
mockApiInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error fetching data from mock API:', error);
    return Promise.reject(error);
  }
);

// Helper to extract data from response
const responseBody = (response: AxiosResponse) => response.data;

// Request interceptor to add Authorization header
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

// Response interceptor to handle errors and introduce delay
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

// Utility for making requests
const requests = {
  get: async (url: string, params?: any) => axiosInstance.get(url, { params }).then(responseBody),
  post: async (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
  put: async (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
  delete: async (url: string) => axiosInstance.delete(url).then(responseBody),
  getMemberVouchers: async (userId: number) => axiosInstance.get(`vouchers/member?userId=${userId}`).then(responseBody),
  addVoucherForMember: async (userId: number, voucherId: number) => axiosInstance.post(`vouchers/member?userId=${userId}&voucherId=${voucherId}`, {}).then(responseBody),
  updateDefaultAddress: async (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => axiosInstance.put(`address/default?userId=${userId}&addressOldId=${addressOldId}&addressNewId=${addressNewId}`, {}).then(responseBody),
  updateAddress: async (updatedAddress: any) => axiosInstance.put(`address`, updatedAddress).then(responseBody),
  createOrder: async (userId: number, addressId: number, voucherId: number, orderItems: any) => axiosInstance.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}`, orderItems).then(responseBody),
  createReport: async (reportData: {}) => axiosInstance.post('reports', reportData).then(responseBody),
};

// Helper to create list endpoints with default sort parameters
const createListEndpoint = (endpoint: string, defaultSortBy: string, defaultSortDir: string = 'asc') => {
  return async (pageNo: number, pageSize: number) => requests.get(`${endpoint}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${defaultSortBy}&sortDir=${defaultSortDir}`);
};

// Products API methods
const Products = {
  list: async (pageNo: number, pageSize: number, sortDir: string = 'asc') => requests.get(`product?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=price&sortDir=${sortDir}`),
  details: async (id: number) => requests.get(`product/${id}`),
  getProductByCategoryId: async (id: any) => requests.get(`product/search?category=${id}`),
};

// Blog API methods
const Blog = {
  list: createListEndpoint('blogs', 'blogId'),
  details: async (id: number) => requests.get(`blogs/${id}`),
  searchBlog: (pageNo: number, pageSize: number, searchTerm: string) => requests.get(`blogs/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=blogId&sortDir=asc&searchText=${searchTerm}`)
};

// Brand API methods
const Brand = {
  list: createListEndpoint('brand', 'brandId'),
};

// Category API methods
const Category = {
  list: createListEndpoint('categories', 'categoryId'),
};

// Voucher API methods
const Voucher = {
  list: createListEndpoint('vouchers', 'voucherId'),
  getMemberVouchers: async (userId: number) => requests.getMemberVouchers(userId),
  addVoucherForMember: async (userId: number, voucherId: number) => requests.addVoucherForMember(userId, voucherId),
};

// Address API methods
const Address = {
  listByUserId: async (userId: number, pageNo: number, pageSize: number) => requests.get(`address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`),
  updateDefaultAddress: async (userId: number | null, addressOldId: number | null, addressNewId: number | undefined) => requests.updateDefaultAddress(userId, addressOldId, addressNewId),
  updateAddress: async (updatedAddress: any) => requests.updateAddress(updatedAddress),
  addNewAddress: async (newAddress: any) => requests.post('address', newAddress),
  deleteAddress: async (addressId: number) => requests.delete(`address/${addressId}`),
};

// External API methods
const ExternalAPI = {
  getProvinces: async () => mockApiInstance.post('/province').then(responseBody),
  getDistrictByProvince: async (province_id: any) => mockApiInstance.post('/district', { province_id }).then(responseBody),
};

// Orders API methods
const Orders = {
  createOrder: async (userId: number, addressId: string, voucherId: number, orderItems: any) =>
    requests.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}&isPreOrder=0`, orderItems),
  createPreOrder: async (userId: number, addressId: string, voucherId: number, orderItems: any) =>
    requests.post(`orders?userId=${userId}&addressId=${addressId}&voucherId=${voucherId}&isPreOrder=1`, orderItems),
  getOrdersByUserId: async (userId: number, pageNo: number, pageSize: number) =>
    requests.get(`orders/user/${userId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=orderDate&sortDir=desc`),
  getOrderById: async (orderId: number) => requests.get(`orders/order/${orderId}`),
  getOrdersByDateRange: async (pageNo: number, pageSize: number, sortBy: string, sortDir: string, orderDateFrom: string, orderDateTo: string, userId: number) =>
    requests.get('orders/search', { pageNo, pageSize, sortBy, sortDir, orderDateFrom, orderDateTo, userId }),
  addFeedback: async (userId: number, orderId: number, feedback: { rating: number, comment: string, image: string, productId: number }[]) => 
    requests.post(`feedbacks?userId=${userId}&orderId=${orderId}`, feedback),
  getOrderFeedbacks: async (orderId: number) => requests.get(`feedbacks/order/${orderId}`), 
  cancelOrder: async (orderId: number, reason: string) => requests.post('order-cancels', { orderId, reason }), 
  getOrdersByStatus: (pageNo: number, pageSize: number, sortBy: string = "orderId", status: string, sortDir: string = "asc") => {
    return requests.get(`orders/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&status=${status}&sortDir=${sortDir}`);
  },
  getOrderByStatusAndDate: (pageNo: number, pageSize: number, sortBy: string = "orderId", sortDir: string = "asc", status: string, orderDateFrom: string, orderDateTo: string) =>
    requests.get(`orders/search?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}&status=${status}&orderDateFrom=${orderDateFrom}&orderDateTo=${orderDateTo}`),
};

// Payment API methods
const Payment = {
  vnPay: async (orderId: number) => requests.get('payment/vn-pay', { bankCode: 'NCB', orderId }),
  addPaymentHistory: async (paymentData: { amount: number, status: number, paymentMethodId: number, orderId: number }) =>
    requests.post('payment-histories', paymentData),
};

const Feedback = {
  listByProduct: (productId: number, pageNo: number, pageSize: number) => requests.get(`feedbacks/product/${productId}?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=feedbackId&sortDir=asc`),
}

// Reports API methods
const Reports = {
  createReport: async (reportData: {}) => requests.createReport(reportData),
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
  Payment,
  Feedback,
  Reports // Add Reports to the agent
};

export default agent;
