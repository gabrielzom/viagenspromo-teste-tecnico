import axios from "axios";
import AxiosInstance = Axios.AxiosInstance;

export interface IPaginatedResult<T> {
    data: T[]
    meta: {
        total: number
        lastPage: number
        currentPage: number
        perPage: number
        prev: number
        next: number
    }
}

export interface IProduct {
    id: number;
    name: string;
    price: number;
}


export const getProducts = async (page = 1): Promise<IPaginatedResult<IProduct>> => {
    const api: AxiosInstance = axios.create({
        baseURL: 'http://localhost:3000',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const { data } = await api.get<IPaginatedResult<IProduct>>(`/product`, {
        params: { page }
    })
    return data
}
