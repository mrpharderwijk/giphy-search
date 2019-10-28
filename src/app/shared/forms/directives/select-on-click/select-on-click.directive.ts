import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { BooleanFieldValue } from '../../../common/decorators/boolean-field-value.decorator';

/**
 * Directive that can be used on an Input element to select all input value when clicked
 * usage:
 * `<input type="text" selectOnClick>`
 * or
 * `<input type="text" [selectOnClick]="true">`
 *
 */
@Directive({
  selector: '[selectOnClick]',
})
export class SelectOnClickDirective {
  @Input() @BooleanFieldValue() selectOnClick: boolean;

  constructor(private element: ElementRef) {}

  @HostListener('click', ['$event']) onClick($event) {
    if (this.selectOnClick) {
      // check if there is already a selection active
      if (
        !$event ||
        !$event.target ||
        (typeof $event.target.selectionStart === 'number' &&
          $event.target.selectionStart !== $event.target.selectionEnd) ||
        !$event.target.select
      ) {
        return;
      }

      $event.target.select();
    }
  }
}
