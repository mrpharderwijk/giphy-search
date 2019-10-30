import { TestBed } from '@angular/core/testing';

import { GiphyService } from './giphy.service';
import { HttpClientModule } from '@angular/common/http';

describe('GiphyService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    }),
  );

  it('should be created', () => {
    const service: GiphyService = TestBed.get(GiphyService);
    expect(service).toBeTruthy();
  });
});
