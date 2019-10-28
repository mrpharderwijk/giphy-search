import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { GIPHY_DEFAULT_TYPE } from './shared/constants';
import { StateDataService } from './shared/services/state-data.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  const fakeStateData = {
    state: of({ fetching: false, giphyType: GIPHY_DEFAULT_TYPE }),
    addData: () => {},
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [SharedModule, HttpClientModule],
      providers: [
        {
          provide: StateDataService,
          useValue: fakeStateData,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should set the correct state', () => {
    expect(app.giphyType).toEqual(GIPHY_DEFAULT_TYPE);
    expect(app.searchQuery).toBeUndefined();
    expect(app.loading).toBeFalsy();
  });

  it('should set the searchQuery', () => {
    expect(app.searchQuery).toBeUndefined();
    app.setSearchQuery('Tony Stark');
    expect(app.searchQuery).toEqual('Tony Stark');
  });
});
