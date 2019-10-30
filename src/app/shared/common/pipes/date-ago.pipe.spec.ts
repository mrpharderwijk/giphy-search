import { DateAgoPipe } from './date-ago.pipe';

describe('DateAgoPipe', () => {
  let pipe: DateAgoPipe;
  beforeEach(() => {
    pipe = new DateAgoPipe();
  });

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert a date to a string in seconds ago', () => {
    const actual = pipe.transform(new Date());
    expect(actual).toContain('seconds');
  });

  it('should convert a date to a string in weeks ago', () => {
    const currentDate = new Date();
    const actual = pipe.transform(currentDate.setDate(currentDate.getDate() - 14));
    expect(actual).toContain('weeks');
  });
});
