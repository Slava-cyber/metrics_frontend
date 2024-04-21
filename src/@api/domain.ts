import axios from "axios";
import {Response} from"../types/Response"
import {Domain} from "../models/Domain";
export const getDomains = async () => {
    return await axios.get<Response<Domain[]>>(`/domain`);
};

export const setNewDomain = async (data: { name: string }) => {
    return await axios.post<Response<any>>('/domain', data);
}

export const getDomain = async (id: number) => {
    return await axios.get<Response<Domain>>(`/domain/${id}`);
}