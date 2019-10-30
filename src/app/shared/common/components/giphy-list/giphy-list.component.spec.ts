import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { GiphyListComponent } from './giphy-list.component';
import {
  GIPHY_DEFAULT_TYPE,
  PAGINATION_LIMIT,
  PAGINATION_INDEX,
  PAGINATION_OFFSET,
  PAGINATION_TOTAL,
} from '../../../constants';
import { of } from 'rxjs';
import { StateDataService } from '../../../services/state-data.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { DateAgoPipe } from '../../pipes';
import { HttpClientModule } from '@angular/common/http';
import { GiphyByQueryMock, GiphyTrendingMock } from '../../../mocks';
import { GiphyService } from '../../../services/giphy.service';

describe('GiphyListComponent', () => {
  let component: GiphyListComponent;
  let fixture: ComponentFixture<GiphyListComponent>;
  const fakeStateData = {
    state: of({ fetching: false, giphyType: GIPHY_DEFAULT_TYPE }),
    addData: () => {},
  };
  const MockGiphyService = {
    fetchByQuery: () => {
      return of(GiphyByQueryMock);
    },
    fetchTrending: () => {
      return of(GiphyTrendingMock);
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GiphyListComponent, DateAgoPipe],
      imports: [MatPaginatorModule, MatProgressSpinnerModule, MatCardModule, HttpClientModule],
      providers: [
        { provide: StateDataService, useValue: fakeStateData },
        { provide: GiphyService, useValue: MockGiphyService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'resetPagination');
    spyOn(component, 'retrieveGiphies');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve giphies on init', () => {
    component.ngOnInit();
    expect(component.resetPagination).toHaveBeenCalled();
    expect(component.retrieveGiphies).toHaveBeenCalled();
    expect(component.giphies[0].id).toEqual('gHiURKYHxaxnbdH3eo');

    expect(component.paginationIndex).toEqual(0);
    expect(component.paginationLimit).toEqual(15);
    expect(component.paginationOffset).toEqual(0);
    expect(component.paginationTotal).toEqual(69196);
  });

  xit('should reset the pagination', fakeAsync(() => {
    component.resetPagination();
    expect(component.resetPagination).toHaveBeenCalled();
    console.log(component.paginationIndex);
    console.log(component.paginationLimit);
    console.log(component.paginationOffset);
    console.log(component.paginationTotal);

    component.resetPagination();
    console.log(component.paginationIndex);
    console.log(component.paginationLimit);
    console.log(component.paginationOffset);
    console.log(component.paginationTotal);
  }));

  xit('should retrieve Giphies by a given searchQuery', () => {
    const changesObj = {
      searchQuery: {
        firstChange: false,
        isFirstChange: () => false,
        currentValue: 'test',
        previousValue: 'bla',
      },
    };
    component.ngOnChanges(changesObj);
    expect(component.retrieveGiphies).toHaveBeenCalled();
    expect(component.giphies[0].id).toEqual('gw3IWyGkC0rsazTi');

    expect(component.paginationIndex).toEqual(0);
    expect(component.paginationLimit).toEqual(15);
    expect(component.paginationOffset).toEqual(0);
    expect(component.paginationTotal).toEqual(7543);
  });
});
