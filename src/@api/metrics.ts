import axios from "axios";
import {Response} from "../types/Response";
import {histogramData} from "../models/HistogramData";
import {CanvasData} from "../models/CanvasData";

const urlPrefix = 'metrics';
export const getHistogram = async (domainId: number, params: any) => {
    return await axios.get<Response<histogramData[]>>(`${urlPrefix}/domain/${domainId}/histogram`, {params: params});
}

export const getCanvas = async (pageId: number, params: any) => {
    return await axios.get<Response<CanvasData[]>>(`${urlPrefix}/page/${pageId}/heatMap`, {params: params})
}