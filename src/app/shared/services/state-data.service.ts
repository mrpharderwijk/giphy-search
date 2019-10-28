import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StateData } from '../models/state-data.model';
import { GIPHY_DEFAULT_TYPE } from '../constants';

/**
 * Just a simple state service to share state between components
 */
@Injectable({
  providedIn: 'root',
})
export class StateDataService {
  defaultState = {
    fetching: false,
    giphyType: GIPHY_DEFAULT_TYPE,
  };

  private _state = new BehaviorSubject<StateData>(this.defaultState);

  state: Observable<StateData> = this._state.asObservable();

  constructor() {}

  /**
   * Adds/Overwrites/Extends (new) data
   * @param stateData
   *
   */
  addData(stateData: StateData) {
    const stateDataCopy: any = this._state.getValue() || {};
    const mergedStateData = { ...stateDataCopy, ...stateData };

    this._state.next(mergedStateData);
  }

  /**
   * Resets the state to it's original
   */
  resetData() {
    this._state.next(this.defaultState);
  }
}
