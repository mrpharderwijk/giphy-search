import {
  Component,
  Output,
  EventEmitter,
  Input,
  AfterViewChecked,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InputValidator } from '../../../forms/validators/input.validator';

@Component({
  selector: 'app-giphy-search',
  templateUrl: './giphy-search.component.html',
  styleUrls: ['./giphy-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiphySearchComponent implements AfterViewChecked {
  // On escape close the search
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeSearch();
  }
  @Input() loading: boolean;
  @Output() searchSubmitted: EventEmitter<string> = new EventEmitter(null);
  @Output() searchClosed: EventEmitter<boolean> = new EventEmitter(false);

  giphySearchForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    this.giphySearchForm = this._formBuilder.group({
      searchQuery: ['', InputValidator.refuseSwearing],
    });
  }

  ngAfterViewChecked() {
    this.giphySearchForm.updateValueAndValidity();
  }

  /**
   * Emit an event so the parent knows the form
   * is submitted
   */
  submitSearchQuery() {
    if (!this.giphySearchForm.valid) {
      return;
    }

    // When leaving the input empty, just close the search
    if (!this.giphySearchForm.get('searchQuery').value) {
      this.closeSearch();
      return;
    }

    this.searchSubmitted.emit(this.giphySearchForm.get('searchQuery').value);
    this.giphySearchForm.get('searchQuery').setValue(null);
  }

  /**
   * Emits an event so the parent knows the element
   * should be closed
   */
  closeSearch() {
    this.searchClosed.emit(true);
  }
}
