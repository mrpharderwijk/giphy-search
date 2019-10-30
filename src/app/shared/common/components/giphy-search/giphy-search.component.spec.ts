import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphySearchComponent } from './giphy-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputTextComponent } from '../../../forms/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SelectOnClickDirective, DisableControlDirective } from '../../../forms/directives';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { keyframes } from '@angular/animations';

describe('GiphySearchComponent', () => {
  let component: GiphySearchComponent;
  let fixture: ComponentFixture<GiphySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule],
      declarations: [GiphySearchComponent, InputTextComponent, SelectOnClickDirective, DisableControlDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 1 control', () => {
    expect(component.giphySearchForm.contains('searchQuery')).toBeTruthy();
  });

  it('should emit the searchQuery when submitting a defined searchQuery', () => {
    let searchQuery = null;
    const control = component.giphySearchForm.get('searchQuery');
    control.setValue('bla');

    component.searchSubmitted.subscribe((sq: string) => (searchQuery = sq));
    component.submitSearchQuery();

    expect(searchQuery).toBe('bla');
    expect(control.value).toBeNull();
  });

  it('should close the searchQuery when submitting an empty value', () => {
    spyOn(component, 'closeSearch');

    const control = component.giphySearchForm.get('searchQuery');
    control.setValue('');
    component.submitSearchQuery();
    expect(component.closeSearch).toHaveBeenCalled();
  });

  it('should emit the searchClosed event', () => {
    let closed = false;
    component.searchClosed.subscribe((val: boolean) => (closed = val));
    component.closeSearch();
    expect(closed).toBeTruthy();
  });
});
