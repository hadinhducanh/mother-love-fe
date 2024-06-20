import axios, { AxiosError, AxiosResponse } from "axios";
import { router } from "../router/Router";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
      console.log("Access Token:", accessToken);
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
                router.navigate("/server-error", { state: { error: data } });
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
    // eslint-disable-next-line @typescript-eslint/ban-types
    post: (url: string, body: {}) => axiosInstance.post(url, body).then(responseBody),
    // eslint-disable-next-line @typescript-eslint/ban-types
    put: (url: string, body: {}) => axiosInstance.put(url, body).then(responseBody),
    delete: (url: string) => axiosInstance.delete(url).then(responseBody),
};

const Products = {
    list: (pageNo: number, pageSize: number) => requests.get(`product?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=productId&sortDir=asc`),
    details: (id: number) => requests.get(`http://localhost:8080/api/v1/product/${id}`),
};
const Brand = {
    list: (pageNo: number, pageSize: number) => requests.get(`brand?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=brandId&sortDir=asc`),
    // details: (id: number) => requests.get(`News/get-news?id=${id}`),
};
const Category = {
    list: (pageNo: number, pageSize: number) => requests.get(`categories?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=categoryId&sortDir=asc`),
    // details: (id: number) => requests.get(`News/get-news?id=${id}`),
};
const Address = {
    listByUserId:  (userId: number, pageNo: number, pageSize: number) => {
        return requests.get(
            `address/user?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=addressId&sortDir=asc&userId=${userId}`,
            
        );
    }
};

const agent = {
    Products, Brand, Category, Address
};

export default agent;
