import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { DefaultErrorStateMatcher } from '../../error-state-matchers/default-error-state.matcher';
import { BooleanFieldValue } from '../../../common/decorators/boolean-field-value.decorator';
import { FormControl, FormGroup } from '@angular/forms';
import { MathHelper } from '../../../common/helpers/math.helper';
import { INPUT_NAME_TEXT } from '../../../constants';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent implements OnInit {
  private _errorStateMatcherRef: ErrorStateMatcher;

  @Input() appearance: string;
  @Input() autoComplete: string;
  @Input() @BooleanFieldValue() cdkFocusInitial: boolean;
  @Input() disableControlRef: boolean;
  @Input() enableClose = true;
  @Input() set errorStateMatcherRef(value: ErrorStateMatcher) {
    this._errorStateMatcherRef = value || new DefaultErrorStateMatcher();
  }
  get errorStateMatcherRef(): ErrorStateMatcher {
    return this._errorStateMatcherRef;
  }
  @Input() formControlRef: FormControl;
  @Input() formGroupRef: FormGroup;
  @Input() inputName = INPUT_NAME_TEXT;
  @Input() label: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() pattern: RegExp;
  @Input() placeholderRef: string;
  @Input() @BooleanFieldValue() readOnly: boolean;
  @Input() @BooleanFieldValue() required: boolean;
  @Input() @BooleanFieldValue() selectOnClick: boolean;
  @Input() @BooleanFieldValue() uppercase: boolean;

  @Output() focus: EventEmitter<boolean> = new EventEmitter(false);
  @Output() focusout: EventEmitter<boolean> = new EventEmitter(false);

  inputGuid: string;
  placeholder: string;

  constructor() {}

  ngOnInit() {
    this.placeholder = this.placeholderRef || '';
    this.label = this.label || '';
    this.inputGuid = `${this.inputName}_${MathHelper.randomNumber()}`;
  }
}
