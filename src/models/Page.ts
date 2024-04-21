import {Domain} from "./Domain";

export interface Page {
    id: number;
    name: string;
    pause: boolean,
    domain_id: number,
    domain: Domain
}