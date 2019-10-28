import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true,
})
export class DateAgoPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);

      // less than 30 seconds ago will show as 'Just now'
      if (seconds < 5) {
        return 'a few seconds ago';
      }

      const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
      };

      let counter;

      for (const key of Object.keys(intervals)) {
        counter = Math.floor(seconds / intervals[key]);

        if (counter > 0) {
          const plural = counter > 1;
          return `${counter} ${this.getKey(key, plural)} ago`;
        }
      }
    }

    return value;
  }
  /**
   * Returns the plural or singular version
   * @param intervalKey
   * @param plural
   */
  getKey(intervalKey, plural = false) {
    switch (intervalKey) {
      case 'year':
        return !plural ? 'year' : 'years';
      case 'month':
        return !plural ? 'month' : 'months';
      case 'week':
        return !plural ? 'week' : 'weeks';
      case 'day':
        return !plural ? 'day' : 'days';
      case 'hour':
        return !plural ? 'hour' : 'hours';
      case 'minute':
        return !plural ? 'minute' : 'minutes';
      case 'second':
        return !plural ? 'second' : 'seconds';
    }
  }
}
