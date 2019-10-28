import { FormControl } from '@angular/forms';
import * as badwordsList from 'badwords-list';

export class InputValidator {
  static refuseSwearing(control: FormControl) {
    // Use badwordsList to retrieve english swearing
    const filterWords = badwordsList.array;

    // Set up some simple regex to test the value to
    var rgx = new RegExp('(' + filterWords.join('|') + ')', 'gi');
    const swearingDetected = rgx.test(control.value);

    if (swearingDetected) {
      return { swearing: true };
    }

    return {};
  }
}
