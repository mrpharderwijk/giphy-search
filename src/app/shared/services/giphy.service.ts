import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GiphySearchOptions } from '../models/giphy-search-options.model';
import { GiphyTrendingOptions } from '../models/giphy-trending-options.model';
import * as giphyApi from 'giphy-api';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private _httpClient: HttpClient) {}

  /**
   * Retrieves GIF's or Stickers for a certain query
   * @param searchOptions
   */
  fetchByQuery(searchOptions: GiphySearchOptions): Observable<Object> {
    // add url with api key
    let url =
      `${environment.serviceUrls.giphy[searchOptions.type.toLowerCase()].search}` +
      `?api_key=${environment.serviceUrls.giphy.apiKey}` +
      // add search query
      `${searchOptions.q ? `&q=${searchOptions.q}` : ''}` +
      // add limit
      `${searchOptions.limit ? `&limit=${searchOptions.limit}` : ''}` +
      // add offset
      `${searchOptions.offset ? `&offset=${searchOptions.offset}` : ''}` +
      // add rating
      `&rating=${searchOptions.rating || 'g'}` +
      // add locale
      `&lang=${searchOptions.lang || 'en'}`;

    return this._httpClient.get(url);
  }

  /**
   * Retrieves trending GIF's or stickers
   * @param searchOptions
   */
  fetchTrending(searchOptions: GiphyTrendingOptions): Observable<Object> {
    let url =
      `${environment.serviceUrls.giphy[searchOptions.type.toLowerCase()].trending}` +
      `?api_key=${environment.serviceUrls.giphy.apiKey}` +
      // add limit
      `${searchOptions.limit ? `&limit=${searchOptions.limit}` : ''}` +
      // add offset
      `${searchOptions.offset ? `&offset=${searchOptions.offset}` : ''}` +
      // add rating
      `&rating=${searchOptions.rating || 'g'}`;

    return this._httpClient.get(url);
  }
}
