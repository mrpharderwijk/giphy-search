import { Component, OnInit } from '@angular/core';
import { GIFObject, MultiResponse } from 'giphy-api';
import { GiphyService } from '../../../services/giphy.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
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
export class GiphyListComponent implements OnInit {
  /**
   * Determines if there is data fetching
   */
  fetching: boolean;

  /**
   * The giphies retrieved, used in the template
   */
  giphies: GIFObject[];

  /**
   * Pagination state
   */
  paginationIndex: number;
  paginationLimit: number;
  paginationOffset: number;
  paginationTotal: number;

  /**
   * The current searchQuery
   */
  searchQuery: string = null;

  /**
   * Type of giphy to retrieve
   */
  type: string = GIPHY_DEFAULT_TYPE;

  constructor(private giphyService: GiphyService, private stateDataService: StateDataService) {}

  ngOnInit(): void {
    /**
     * Subscribe on state for query purposes
     */
    this.stateDataService.state.subscribe((stateData: StateData) => {
      this.fetching = stateData.fetching;
      /**
       * While fetching new giphies reset the pagination
       */
      if (this.fetching) {
        this.resetPagination();
      }

      /**
       * When the current searchQuery (from stateData) is different
       * from the previous searchQuery:
       *
       * set the new searchQuery as the current
       */
      if (this.searchQuery !== stateData.searchQuery) {
        this.searchQuery = stateData.searchQuery;
        this.retrieveGiphies();
      }

      /**
       * Define all other template driven variables
       */
      this.giphies = stateData.giphies;
      this.paginationIndex = PAGINATION_INDEX;
      this.paginationLimit = stateData.paginationLimit;
      this.paginationOffset = stateData.paginationOffset;
      this.paginationTotal = stateData.paginationTotal;
    });
  }

  /**
   * Determines what to retrieve, trending or byQuery
   */
  retrieveGiphies() {
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
  retrieveTrending(): void {
    // Define all options for the search
    const options = {
      type: this.type,
      limit: this.paginationLimit,
      offset: this.paginationOffset,
    };

    // Enable loading
    this.stateDataService.addData({ fetching: true });

    this.giphyService
      .fetchTrending(options)
      .pipe(
        catchError(() => {
          // Disable loading
          this.stateDataService.addData({ fetching: false });
          return EMPTY;
        }),
      )
      .subscribe((giphyResponse: MultiResponse) => {
        this.stateDataService.addData({
          fetching: false,
          giphies: giphyResponse.data,
          paginationLimit: giphyResponse.pagination.count,
          paginationOffset: giphyResponse.pagination.offset,
          paginationTotal: giphyResponse.pagination.total_count,
        });
      });
  }

  /**
   * Retrieve items by search query
   */
  retrieveByQuery(): void {
    const options = {
      type: this.type,
      q: this.searchQuery,
      limit: this.paginationLimit,
      offset: this.paginationOffset,
    };

    // Enable loading
    this.stateDataService.addData({ fetching: true });

    this.giphyService
      .fetchByQuery(options)
      .pipe(
        catchError(() => {
          // Disable loading
          this.stateDataService.addData({ fetching: false });

          return EMPTY;
        }),
      )
      .subscribe((giphyResponse: MultiResponse) => {
        /**
         * Define the state
         */
        this.stateDataService.addData({
          fetching: false,
          giphies: giphyResponse.data,
          paginationLimit: giphyResponse.pagination.count,
          paginationOffset: giphyResponse.pagination.offset,
          paginationTotal: giphyResponse.pagination.total_count,
        });
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
