import axiosClient from "@/app/interceptors/axiosInterceptor";

export const customFetcher = (url: string) => axiosClient.get(url).then((res) => res.data);

export const baseURL = 'https://jsonplaceholder.typicode.com'