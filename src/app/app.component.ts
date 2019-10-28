import { Component, ChangeDetectorRef, AfterViewChecked, OnInit, OnDestroy } from '@angular/core';
import { GIPHY_DEFAULT_TYPE } from './shared/constants';
import { StateDataService } from './shared/services/state-data.service';
import { StateData } from './shared/models/state-data.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private _stateDataSubscription: Subscription;

  /**
   * Loading is used to disable certain elements and set async. To prevent
   * ExpressionChangedAfterItHasBeenCheckedError changeDetectorRef is used here
   */
  private _loading: boolean;
  set loading(value: boolean) {
    this._loading = value;
    this._changeDetectorRef.detectChanges();
  }
  get loading() {
    return this._loading;
  }
  giphyType: string;
  searchQuery: string;

  constructor(private _changeDetectorRef: ChangeDetectorRef, private _stateDataService: StateDataService) {}

  ngOnInit() {
    this._stateDataSubscription = this._stateDataService.state.subscribe((stateData: StateData) => {
      if (!stateData) {
        return;
      }

      this.giphyType = stateData.giphyType || GIPHY_DEFAULT_TYPE;
      this.searchQuery = stateData.searchQuery;
      this.loading = stateData.fetching;
    });
  }

  ngOnDestroy() {
    // Clear subscriptions
    if (this._stateDataSubscription) {
      this._stateDataSubscription.unsubscribe();
    }
  }

  /**
   * Catches the emitted event of the search form and
   * sets the searchQuery
   * @param searchQuery
   */
  setSearchQuery(searchQuery: string) {
    this.searchQuery = searchQuery;
  }
}
