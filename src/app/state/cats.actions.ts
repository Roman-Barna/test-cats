import { Animals } from "../interfaces/animals.interface";

export class getAnimalsDataAction {
    static readonly type = "[Cats page] get all"
    constructor(public animalsData: Animals[]) {}
}

export class setSearchField {
    static readonly type = "[Cats page] filter"
    constructor(public searchFilter: string) {}
}