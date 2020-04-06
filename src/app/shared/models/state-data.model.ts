import * as giphyApi from 'giphy-api';

export interface StateData {
  fetching?: boolean;
  searchQuery?: string;
  giphyType?: string;
  giphies?: giphyApi.GIFObject[];
  paginationIndex?: number;
  paginationLimit?: number;
  paginationOffset?: number;
  paginationTotal?: number;
}
