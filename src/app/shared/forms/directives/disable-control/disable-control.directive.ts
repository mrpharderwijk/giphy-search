import { NgControl } from '@angular/forms';
import { Directive, Input } from '@angular/core';

/**
 * Disable a from control depending on a certain condition
 * usage:
 * `<input matInput type="text" id="passwordConfirm" name="passwordConfirm" [formControl]="personalForm.get('passwordConfirm')" [disableControl]="loading" required>`
 *
 */
@Directive({
  selector: '[disableControl]',
})
export class DisableControlDirective {
  @Input() set disableControl(condition: boolean) {
    const action = condition ? 'disable' : 'enable';
    this.ngControl.control[action]();
  }

  constructor(private ngControl: NgControl) {}
}
