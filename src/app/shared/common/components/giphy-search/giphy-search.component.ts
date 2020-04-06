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
  /**
   * Handle the escape button. This will 'close' the search state
   */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    this.closeSearch();
  }

  /**
   * Loading the data
   */
  @Input() loading: boolean;

  /**
   * Emitter when the search is submitted
   */
  @Output() searchSubmitted: EventEmitter<string> = new EventEmitter(null);

  /**
   * Emitter when the search is in a `closed` state, meaning the input is
   * not visible
   */
  @Output() searchClosed: EventEmitter<boolean> = new EventEmitter(false);

  /**
   * The actual search form
   */
  giphySearchForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) {
    /**
     * Build up the form (reactive style)
     */
    this.giphySearchForm = this._formBuilder.group({
      searchQuery: ['', InputValidator.refuseSwearing],
    });
  }

  /**
   * Update the forms validity
   */
  ngAfterViewChecked(): void {
    this.giphySearchForm.updateValueAndValidity();
  }

  /**
   * Emit an event so the parent knows the form
   * is submitted
   */
  submitSearchQuery(): void {
    if (!this.giphySearchForm.valid) {
      return;
    }

    // When leaving the input empty, just close the search
    if (!this.giphySearchForm.get('searchQuery').value) {
      this.closeSearch();
      return;
    }

    // Emit the new searchQuery up to it's parent
    const value = this.giphySearchForm.get('searchQuery').value;
    this.searchSubmitted.emit(value);

    // Clean up the searchQuery value for future alterations
    this.giphySearchForm.get('searchQuery').setValue(null);
  }

  /**
   * Emits an event so the parent knows the element
   * should be closed
   */
  closeSearch(): void {
    this.searchClosed.emit(true);
  }
}
