import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { StateDataService } from '../../../services/state-data.service';
import { Subscription } from 'rxjs';
import { StateData } from '../../../models/state-data.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  /**
   * Application title
   */
  @Input() title: string;

  /**
   * Determines wether the appliction is
   * fetching data
   */
  fetching: boolean;

  /**
   * Indicates the state of the header
   * - when in `searchMode` an extended header is shown
   * - when not in `searchMode` a simplified version is shown
   */
  searchMode = false;

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
  ngOnDestroy(): void {
    if (this.stateDataSubscription) {
      this.stateDataSubscription.unsubscribe();
    }
  }

  /**
   * Subscriber for the stateData
   */
  private stateDataSubscriber(): Subscription {
    return this.stateDataService.state.subscribe((stateData: StateData) => {
      this.fetching = stateData.fetching;
    });
  }

  /**
   * Handle events emitted from the giphy-search component
   * and sets them on the state
   * @param searchQuery
   */
  giphySearchSubmitted(searchQuery: string): void {
    this.searchMode = false;

    // Add the new searchQuery to the state
    this.stateDataService.addData({ searchQuery: searchQuery });
  }
}
