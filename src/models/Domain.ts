import {Page} from "./Page";

export interface Domain {
    id: number;
    name: string;
    pause: boolean
    pages?: Page[]
}