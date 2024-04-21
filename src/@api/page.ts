import axios from "axios";
import {Response} from "../types/Response";
import {Page} from "../models/Page";

export const getPage = async (pageId: number) => {
    return await axios.get<Response<Page>>(`/page/${pageId}`);
};
