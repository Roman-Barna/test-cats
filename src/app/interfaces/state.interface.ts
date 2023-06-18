import { Animals } from "./animals.interface";

export interface StateModel {
    animalsData: Animals[]
    searchFilter: string
}