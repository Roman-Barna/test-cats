import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { StateModel } from '../interfaces/state.interface';
import { getAnimalsDataAction, setSearchField } from './cats.actions';

@State<StateModel>({
  name: 'animals',
  defaults: { animalsData: [], searchFilter: "" },
})
@Injectable()
export class AnimalsState {
  @Action(getAnimalsDataAction)
  getAnimalsData(ctx: StateContext<StateModel>, action: getAnimalsDataAction) {
    const { animalsData } = action;
    if (!animalsData) return;
    const state = ctx.getState();
    ctx.setState({ ...state, animalsData });
  }

  @Action(setSearchField)
  setSearchField(ctx: StateContext<StateModel>, action: setSearchField) {
    const { searchFilter } = action;
    const state = ctx.getState();
    ctx.setState({ ...state, searchFilter });
  }
}
