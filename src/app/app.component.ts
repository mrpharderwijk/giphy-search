import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StateDataService } from './shared/services/state-data.service';
import { StateData } from './shared/models/state-data.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * The current search query
   */
  searchQuery: string;

  /**
   * The subscription of the stateData
   */
  stateDataSubscription: Subscription;

  constructor(private stateDataService: StateDataService) {}

  ngOnInit() {
    this.stateDataSubscription = this.stateDataSubscriber();
  }

  /**
   * Unsubscribe all subscriptions
   */
  ngOnDestroy() {
    if (this.stateDataSubscription) {
      this.stateDataSubscription.unsubscribe();
    }
  }

  /**
   * Subscriber for the stateData
   */
  private stateDataSubscriber(): Subscription {
    return this.stateDataService.state.subscribe((stateData: StateData) => {
      this.searchQuery = stateData.searchQuery;
    });
  }
}
