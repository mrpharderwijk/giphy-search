import { Component, OnInit, Input, SimpleChange, OnChanges } from '@angular/core';
import { GIFObject, MultiResponse } from 'giphy-api';
import { GiphyService } from '../../../services/giphy.service';
import { catchError } from 'rxjs/operators';
import { EMPTY, Subscription } from 'rxjs';
import {
  GIPHY_DEFAULT_TYPE,
  PAGINATION_LIMIT,
  PAGINATION_TOTAL,
  PAGINATION_INDEX,
  PAGINATION_OFFSET,
} from '../../../constants';
import { PageEvent } from '@angular/material/paginator';
import { StateDataService } from '../../../services/state-data.service';
import { StateData } from '../../../models/state-data.model';

@Component({
  selector: 'app-giphy-list',
  templateUrl: './giphy-list.component.html',
  styleUrls: ['./giphy-list.component.scss'],
})
export class GiphyListComponent implements OnInit, OnChanges {
  private _stateDataSubcription: Subscription;

  @Input() type: string = GIPHY_DEFAULT_TYPE;
  @Input() title: string;
  @Input() pubdate: string;
  @Input() user: GIFObject['user'];
  @Input() images: GIFObject['images'];
  @Input() searchQuery: string;

  // Some giphy API types
  giphies: GIFObject[];
  loading: boolean;

  // Pagination not added to state since it is used here only
  paginationIndex: number;
  paginationLimit: number;
  paginationOffset: number;
  paginationTotal: number;

  constructor(private _giphyService: GiphyService, private _stateDataService: StateDataService) {}

  ngOnInit() {
    // By default retrieve the trending items
    this.resetPagination();
    this.retrieveGiphies();

    // Subscribe on state changes
    this._stateDataSubcription = this._stateDataService.state.subscribe((stateData: StateData) => {
      if (!stateData) {
        return;
      }

      // While fetching set the loading variable
      this.loading = stateData.fetching;
    });
  }

  ngOnDestroy() {
    // Clean up subscriptions
    if (this._stateDataSubcription) {
      this._stateDataSubcription.unsubscribe();
    }
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (
      changes &&
      changes.searchQuery &&
      changes.searchQuery.currentValue &&
      changes.searchQuery.currentValue !== changes.searchQuery.previousValue
    ) {
      this.searchQuery = changes.searchQuery.currentValue;

      // A new query should always reset the pagination
      this.resetPagination();
      this.retrieveGiphies();
    }
  }

  /**
   * Determines what to retrieve, trending or byQuery
   */
  retrieveGiphies() {
    // App will be fetching
    this._stateDataService.addData({ fetching: true });

    // No searchQuery? Retrieve trending by default
    if (!this.searchQuery) {
      this.retrieveTrending();
    } else {
      this.retrieveByQuery();
    }
  }

  /**
   * Retrieve all trending GIF's or stickers
   */
  retrieveTrending() {
    const options = {
      type: this.type,
      limit: this.paginationLimit,
      offset: this.paginationOffset,
    };

    this._giphyService
      .fetchTrending(options)
      .pipe(
        catchError(() => {
          // TODO: Maybe add some snackbar thingies here, to show the error
          this._stateDataService.addData({ fetching: false });
          return EMPTY;
        }),
      )
      .subscribe((giphyResponse: MultiResponse) => {
        this.giphies = giphyResponse.data;

        // TODO: DRY
        this.paginationLimit = giphyResponse.pagination.count;
        this.paginationOffset = giphyResponse.pagination.offset;
        this.paginationTotal = giphyResponse.pagination.total_count;
        this._stateDataService.addData({ fetching: false });
      });
  }

  /**
   * Retrieve items by search query
   */
  retrieveByQuery() {
    const options = {
      type: this.type,
      q: this.searchQuery,
      limit: this.paginationLimit,
      offset: this.paginationOffset,
    };

    this._giphyService
      .fetchByQuery(options)
      .pipe(
        catchError(() => {
          this._stateDataService.addData({ fetching: false });
          return EMPTY;
        }),
      )
      .subscribe((giphyResponse: MultiResponse) => {
        this.giphies = giphyResponse.data;

        // TODO: DRY
        this.paginationLimit = giphyResponse.pagination.count;
        this.paginationOffset = giphyResponse.pagination.offset;
        this.paginationTotal = giphyResponse.pagination.total_count;
        this._stateDataService.addData({ fetching: false });
      });
  }

  /**
   * Resets all pagination values
   */
  resetPagination() {
    this.paginationIndex = PAGINATION_INDEX;
    this.paginationLimit = PAGINATION_LIMIT;
    this.paginationOffset = PAGINATION_OFFSET;
    this.paginationTotal = PAGINATION_TOTAL;
  }

  /**
   * Catches events emitted from the paginator
   * @param pageEvent
   */
  paginationChanged(pageEvent: PageEvent) {
    if (pageEvent) {
      this.paginationIndex = pageEvent.pageIndex;
      this.paginationLimit = pageEvent.pageSize;
      this.paginationOffset =
        pageEvent.pageIndex === 0 ? pageEvent.pageIndex : pageEvent.pageSize * pageEvent.pageIndex;
    }
    this.retrieveGiphies();
  }
}
