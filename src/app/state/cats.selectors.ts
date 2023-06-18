import { Selector } from "@ngxs/store";
import { Animals } from "../interfaces/animals.interface";
import { StateModel } from "../interfaces/state.interface";
import { AnimalsState } from "./cats.state";

export class AnimalsSelectors {
    @Selector([AnimalsState])
    static animalItems(state: StateModel): Animals[] {
        return state.animalsData
    }
    @Selector([AnimalsState])
    static searchField(state: StateModel): string {
        return state.searchFilter
    }
}